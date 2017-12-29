import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Drawer from 'material-ui/Drawer';

import LandTypes from './LandTypes';
import Artists from './Artists';
import Cards from './Cards';

import {connector} from './controller';

import styles from './Display.scss';

import 'whatwg-fetch';

const Display = ({cards, artists, filter, expanded, onFilter, onExpand}) => (
  <div>
    <Drawer type="permanent" classes={{paper: styles.drawerPaper}}>
      <Toolbar>
        <Typography type="title">Full Art</Typography>
      </Toolbar>
      <LandTypes land={filter.get('land')} onFilter={onFilter('LAND_TYPE')} />
      <Artists
        all={artists}
        selected={filter.get('artists')}
        expanded={expanded}
        onFilter={onFilter('ARTIST')}
        onExpand={onExpand} />
    </Drawer>
    <main className={styles.content}>
      <Cards cards={cards} />
    </main>
  </div>
);

Display.propTypes = {
  cards: ImmutablePropTypes.list.isRequired,
  artists: ImmutablePropTypes.list.isRequired,
  filter: ImmutablePropTypes.contains({
    artists: ImmutablePropTypes.set,
    land: PropTypes.string
  }).isRequired,
  expanded: PropTypes.bool.isRequired,
  onFilter: PropTypes.func.isRequired,
  onExpand: PropTypes.func.isRequired
};

export default connector(Display);
