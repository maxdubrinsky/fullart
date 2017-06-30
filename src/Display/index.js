import React from 'react';

import {connector, Types} from './controller';
import styles from './Display.css';

import 'whatwg-fetch';

const Filters = ({filter, onFilter}) => (
  <div>
    <h4>Types</h4>
    <ul className={styles.filters}>
      {Types.map(type => 
        <li key={type} className={type === filter ? styles.checked : ''}>
          <button onClick={onFilter(type)}>
            {type}
          </button>
        </li>
      )}
    </ul>
  </div>
);

const Artists = ({artist, artists, onSelect}) => (
  <div>
    <h4>Artists</h4>
    <ul className={styles.artists}>
      {artists.map(curr =>
        <li key={curr} className={artist.has(curr) ? styles.checked : ''}>
          <input type="checkbox" onChange={onSelect(curr)} />
          <label>{curr}</label>
        </li>
      )}
    </ul>
  </div>
);

const Cards = ({cards}) => (
  <div className={styles.cards}>
    {cards.map(({editions}) => editions
      .filter(({multiverse_id}) => multiverse_id)
      .map(({image_url, multiverse_id}) => <img src={image_url} key={multiverse_id} title={multiverse_id} />))}
  </div>
);

const Display = ({cards, artists, filter, artist, onFilter, onSelect}) => (
  <div className={styles.display}>
    <div className={styles.side}>
      <h3>Full Art</h3>
      <Filters filter={filter} onFilter={onFilter} />
      <Artists {...{artist, artists, onSelect}} />
    </div>
    <Cards cards={cards} />
  </div>
);

export default connector(Display);
