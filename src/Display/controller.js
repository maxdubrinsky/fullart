import {compose} from 'redux';
import {lifecycle, pure} from 'recompose';
import {createSelector} from 'reselect';
import {connect} from 'react-redux';
import {fromJS, Set} from 'immutable';

export const Types = fromJS([
  'plains',
  'island',
  'swamp',
  'mountain',
  'forest',
  'wastes'
]);

const Actions = Object.freeze({
  LOAD: 'CARDS_LOAD',
  FILTER: 'CARDS_FILTER',
  ARTIST: 'CARDS_ARTIST'
});

const initialState = fromJS({
  cards: [],
  filter: 'plains',
  artist: Set()
});

export const displayReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.LOAD:
      return state.set('cards', action.cards);
    case Actions.FILTER:
      return state.update('filter', filter => filter === action.filter ? '' : action.filter);
    case Actions.ARTIST:
      return state.update('artist', artist => artist.has(action.artist) ?
        artist.delete(action.artist) :
        artist.add(action.artist)
      );
    default:
      return state;
  }
};

const makeMapStateToProps = () => {
  const getFilter = ({display: {filter}}) => filter;
  const getCards = ({display: {cards}}) => cards;
  const getArtist = ({display: {artist}}) => artist;

  const getSortedCards = createSelector(
    [getCards],
    cards => cards
      .sort((a, b) => Types.keyOf(a.getIn(['subtypes', 0])) - Types.keyOf(b.getIn(['subtypes', 0])))
      .map(card => card.update('editions', editions =>
        editions.sort((a, b) => b.get('multiverse_id') - a.get('multiverse_id'))
      ))
  );

  const getFilteredCards = createSelector(
    [getFilter, getSortedCards],
    (filter, cards) => filter ?
      cards.filter(({id}) => id.includes(filter)) :
      cards
  );

  const getFilteredArtists = createSelector(
    [getFilteredCards],
    cards => cards.reduce(
      (artists, {editions}) => artists.union(editions.map(({artist}) => artist.replace(/&amp;/g, '&'))),
      Set()
    ).sort()
  );

  const getCardsFilteredByArtists = createSelector(
    [getFilteredCards, getArtist],
    (cards, selected) => cards.map(card => card.update('editions', editions =>
      editions.filter(({artist}) => selected.isEmpty() || selected.has(artist))
    ))
  );

  return state => ({
    filter: getFilter(state),
    artist: getArtist(state),
    artists: getFilteredArtists(state),
    cards: getCardsFilteredByArtists(state)
  });
};

const mapDispatchToProps = dispatch => ({
  onLoad: () => fetch('https://api.deckbrew.com/mtg/cards?supertype=basic')
    .then(res => res.json())
    .then(cards => dispatch({type: Actions.LOAD, cards: fromJS(cards)})),
  onFilter: filter => () => dispatch({type: Actions.FILTER, filter}),
  onSelect: artist => () => dispatch({type: Actions.ARTIST, artist})
});

export const connector = compose(
  connect(makeMapStateToProps(), mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.onLoad();
    }
  })
);
