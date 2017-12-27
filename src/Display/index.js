import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import LandTypes from './LandTypes';

import {connector} from './controller';
import styles from './Display.css';

import 'whatwg-fetch';

const Artist = ({artist, selected, onSelect}) => (
  <li className={selected ? styles.checked : ''}>
    <input type="checkbox" onChange={onSelect} checked={selected} />
    <label>{artist}</label>
  </li>
);

Artist.propTypes = {
  artist: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};

const Artists = ({all, selected, expanded, onFilter, onExpand}) => (
  <div>
    <h4>Artists</h4>
    <ul className={styles.artists}>
      {all.map((curr, i) =>
        <Artist
          key={i}
          artist={curr}
          selected={selected.has(curr)}
          onSelect={() => onFilter(curr)} />
      )}
      {expanded ?
        <a onClick={onExpand}>Show fewer</a> :
        <a onClick={onExpand}>Show more</a>
      }
    </ul>
  </div>
);

Artists.propTypes = {
  all: ImmutablePropTypes.set.isRequired,
  selected: ImmutablePropTypes.set.isRequired,
  expanded: PropTypes.bool.isRequired,
  onFilter: PropTypes.func.isRequired,
  onExpand: PropTypes.func.isRequired
};

const Cards = ({cards}) => (
  <div className={styles.cards}>
    {cards.map(({editions}) => 
      editions.filter(({multiverse_id}) => multiverse_id)
              .map(({image_url, multiverse_id}) =>
                <img src={image_url} key={multiverse_id} title={multiverse_id} />
              )
    )}
  </div>
);

Cards.propTypes = {
  cards: ImmutablePropTypes.list.isRequired
};

const Display = ({cards, artists, filter, expanded, onFilter, onExpand}) => (
  <div className={styles.display}>
    <div className={styles.side}>
      <h3>Full Art</h3>
      <LandTypes land={filter.get('land')} onFilter={onFilter('LAND_TYPE')} />
      <Artists
        all={artists}
        selected={filter.get('artists')}
        expanded={expanded}
        onFilter={onFilter('ARTIST')}
        onExpand={onExpand} />
    </div>
    <Cards cards={cards} />
  </div>
);

Display.propTypes = {
  cards: ImmutablePropTypes.list.isRequired,
  artists: ImmutablePropTypes.set.isRequired,
  filter: ImmutablePropTypes.contains({
    artists: ImmutablePropTypes.set,
    land: PropTypes.string
  }).isRequired,
  expanded: PropTypes.bool.isRequired,
  onFilter: PropTypes.func.isRequired,
  onExpand: PropTypes.func.isRequired
};

export default connector(Display);
