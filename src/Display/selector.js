import {createSelector} from 'reselect';
import {fromJS, Set} from 'immutable';

export const Types = fromJS([
  'plains',
  'island',
  'swamp',
  'mountain',
  'forest',
  'wastes'
]);

export const getFilter = ({display: {filter}}) => filter;
export const getExpanded = ({display: {expanded}}) => expanded;

const getCards = ({display: {cards}}) => cards;
const getSelectedLand = ({display: {filter: {land}}}) => land;
const getSelectedArtists = ({display: {filter: {artists}}}) => artists;

const getSortedCards = createSelector(
  [getCards],
  cards => cards
    .sort((a, b) => Types.keyOf(a.getIn(['subtypes', 0])) - Types.keyOf(b.getIn(['subtypes', 0])))
    .map(card => card.update('editions', editions =>
      editions.sort((a, b) => b.get('multiverse_id') - a.get('multiverse_id'))
    ))
);

const getFilteredCards = createSelector(
  [getSelectedLand, getSortedCards],
  (land, cards) => land ?
    cards.filter(({id}) => id.includes(land)) :
    cards
);

export const getFilteredArtists = createSelector(
  [getFilteredCards, getExpanded],
  (cards, expanded) => cards
    .reduce(
      (artists, {editions}) => artists.union(editions.map(({artist}) => artist.replace(/&amp;/g, '&'))),
      Set()
    )
    .sort()
    .takeWhile(function() {
      return expanded || this.count++ < 10;
    }, {count: 0})
);

export const getCardsFilteredByArtists = createSelector(
  [getFilteredCards, getSelectedArtists],
  (cards, artists) => cards.map(card => card.update('editions', editions =>
    editions.filter(({artist}) => artists.isEmpty() || artists.has(artist))
  ))
);
