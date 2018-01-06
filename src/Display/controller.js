import {compose} from 'redux';
import {lifecycle} from 'recompose';
import {connect} from 'react-redux';
import {fromJS, Set} from 'immutable';

import {getFilter, getFilteredArtists, getCardsFilteredByArtists} from './selector';

const Actions = Object.freeze({
  LOAD: 'CARDS_LOAD',
  LAND_TYPE: 'CARDS_LAND_TYPE',
  ARTIST: 'CARDS_ARTIST',
  EXPAND: 'CARDS_EXPAND',
  CLEAR: 'CARDS_CLEAR'
});

const initialState = fromJS({
  cards: [],
  filter: {
    artists: Set(),
    land: 'plains'
  },
  expanded: false
});

export const displayReducer = (state = initialState, action) => {
  switch (action.type) {
  case Actions.LOAD:
    return state.set('cards', action.cards);
  case Actions.LAND_TYPE:
    return state
      .updateIn(['filter', 'land'], curr => curr === action.value ? '' : action.value)
      .set('expanded', false);
  case Actions.ARTIST:
    return state.updateIn(['filter', 'artists'], artists =>
      artists.has(action.value) ?
        artists.delete(action.value) :
        artists.add(action.value)
    );
  case Actions.EXPAND:
    return state.update('expanded', curr => !curr);
  case Actions.CLEAR:
    return state.setIn(['filter', 'artists'], Set());
  default:
    return state;
  }
};

const mapStateToProps = state => ({
  filter: getFilter(state),
  remaining: getFilteredArtists(state),
  cards: getCardsFilteredByArtists(state),
  expanded: state.display.get('expanded')
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => fetch('https://api.deckbrew.com/mtg/cards?supertype=basic')
    .then(res => res.json())
    .then(cards => dispatch({type: Actions.LOAD, cards: fromJS(cards)})),
  onFilter: filter => value => dispatch({type: Actions[filter], value}),
  onExpand: () => dispatch({type: Actions.EXPAND}),
  onClear: () => dispatch({type: Actions.CLEAR})
});

export const connector = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.onLoad();
    }
  })
);
