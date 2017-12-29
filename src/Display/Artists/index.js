import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import List, {ListItem, ListItemText, ListItemIcon, ListSubheader} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import {ExpandMore, ExpandLess} from 'material-ui-icons';

const MAX_ARTISTS = 10;

const Artist = ({artist, selected, onSelect}) => (
  <ListItem dense button onChange={onSelect}>
    <Checkbox checked={selected} />
    <ListItemText primary={artist} />
  </ListItem>
);

Artist.propTypes = {
  artist: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};

const Artists = ({all, selected, expanded, onFilter, onExpand}) => (
  <div>
    <List subheader={<ListSubheader>Artists</ListSubheader>}>
      {all
        .takeWhile((_, i) => i < MAX_ARTISTS || expanded)
        .map((curr, i) =>
          <Artist key={i} artist={curr}
                  selected={selected.has(curr)}
                  onSelect={() => onFilter(curr)} />
        )
      }
      {all.size >= MAX_ARTISTS ? 
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
  all: ImmutablePropTypes.list.isRequired,
  selected: ImmutablePropTypes.set.isRequired,
  expanded: PropTypes.bool.isRequired,
  onFilter: PropTypes.func.isRequired,
  onExpand: PropTypes.func.isRequired
};

export default Artists;
