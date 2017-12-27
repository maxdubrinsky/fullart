import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import {AppBar, Drawer, Checkbox, Button} from 'material-ui';
import List, {ListItem, ListItemText, ListSubheader} from 'material-ui/List';
import ExpandMore from 'material-ui-icons/ExpandMore';
import ExpandLess from 'material-ui-icons/ExpandLess';

import {connector} from './controller';
import {Types} from './selector';
import styles from './Display.css';

import 'whatwg-fetch';

const LandTypes = ({land, onFilter}) => (
  <List dense className={styles.controls}>
    <ListSubheader>Land Types</ListSubheader>
    {Types.map(type => 
      <ListItem key={type}>
        <Checkbox
          checked={type === land}
          onChange={() => onFilter(type)} />
        <ListItemText className={styles.landItem} primary={type} />
      </ListItem>
    )}
  </List>
);

LandTypes.propTypes = {
  land: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired
};

const Artist = ({artist, selected, onSelect}) => (
  <ListItem>
    <Checkbox onChange={onSelect} checked={selected} />
    <ListItemText primary={artist} />
  </ListItem>
);

Artist.propTypes = {
  artist: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};

const Artists = ({all, selected, expanded, onFilter, onExpand}) => (
  <List dense>
    <ListSubheader>Artists</ListSubheader>
    {all.map((curr, i) =>
      <Artist
        key={i}
        artist={curr}
        selected={selected.has(curr)}
        onSelect={() => onFilter(curr)} />
    )}
    {expanded ?
      <Button
        icon={<ExpandLess />}
        onClick={onExpand}>
        Show Fewer
      </Button> :
      <Button
        icon={<ExpandMore />}
        onClick={onExpand}>
        Show More
      </Button>
    }
  </List>
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
    {cards.map(({editions}) => editions
      .filter(({multiverse_id}) => multiverse_id)
      .map(({image_url, multiverse_id}) => <img src={image_url} key={multiverse_id} title={multiverse_id} />))}
  </div>
);

Cards.propTypes = {
  cards: ImmutablePropTypes.list.isRequired
};

const Display = ({cards, artists, filter, expanded, onFilter, onExpand}) => (
  <div className={styles.display}>
    <Drawer docked={true} open={true}>
      <AppBar title="Full Art" />
      <LandTypes land={filter.get('land')} onFilter={onFilter('LAND_TYPE')} />
      <Artists
        all={artists}
        selected={filter.get('artists')}
        expanded={expanded}
        onFilter={onFilter('ARTIST')}
        onExpand={onExpand} />
    </Drawer>
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
