import {createSelector} from 'reselect';
import {Set} from 'immutable';

import {Types} from './utils';

export const getFilter = ({display: {filter}}) => filter;

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
  [getFilteredCards],
  cards => cards
    .reduce(
      (artists, {editions}) => artists.union(editions.map(({artist}) => artist.replace(/&amp;/g, '&'))),
      Set()
    )
    .sort()
    .toList()
);

export const getCardsFilteredByArtists = createSelector(
  [getFilteredCards, getSelectedArtists],
  (cards, artists) => cards.map(card => card.update('editions', editions =>
    editions.filter(({artist}) => artists.isEmpty() || artists.has(artist))
  ))
);
