import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import List, {ListItem, ListItemText, ListItemIcon, ListSubheader} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import {ExpandMore, ExpandLess} from 'material-ui-icons';

import {MAX_ARTISTS} from '../utils';

import styles from './Artists.scss';

const Artist = ({artist, selected, onSelect}) => (
  <ListItem dense button onClick={onSelect}>
    <Checkbox checked={selected} />
    <ListItemText primary={artist} />
  </ListItem>
);

Artist.propTypes = {
  artist: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};

const Artists = ({remaining, selected, expanded, onFilter, onExpand, onClear}) => (
  <div>
    <List subheader={
            <ListSubheader>
              Artists
              {selected.size ?
                <a className={styles.clear} onClick={onClear}>Clear</a> :
                null
              }
            </ListSubheader>
          }>
      {selected.sort().map(artist =>
        <Artist key={artist} artist={artist}
                selected={true}
                onSelect={() => onFilter(artist)} />
      )}
      {selected.size ? <Divider /> : null}
      {remaining.map(artist =>
        <Artist key={artist} artist={artist}
                selected={false}
                onSelect={() => onFilter(artist)} />
      )}
      {selected.size + remaining.size >= MAX_ARTISTS ? 
        <ListItem dense button onClick={onExpand}>
          <ListItemIcon>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
          <ListItemText primary={expanded ? 'Show fewer' : 'Show more'} />
        </ListItem> :
        null
      }
    </List>
  </div>
);

Artists.propTypes = {
  remaining: ImmutablePropTypes.map.isRequired,
  selected: ImmutablePropTypes.set.isRequired,
  expanded: PropTypes.bool.isRequired,
  onFilter: PropTypes.func.isRequired,
  onExpand: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired
};

export default Artists;
