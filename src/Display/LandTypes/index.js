import React from 'react';
import PropTypes from 'prop-types';
import List, {ListItem, ListItemText, ListSubheader} from 'material-ui/List';
import Radio from 'material-ui/Radio';

import {Types} from '../utils';

import styles from './LandTypes.scss';

const LandTypes = ({land, onFilter}) => (
  <div>
    <List subheader={<ListSubheader>Types</ListSubheader>}>
      {Types.map(type => (
        <ListItem key={type} dense button
                  onClick={() => onFilter(type)}>
          <Radio checked={land === type} />
          <ListItemText className={styles.type} primary={type} />
        </ListItem>
      ))}
    </List>
  </div>
);

LandTypes.propTypes = {
  land: PropTypes.oneOf(Types.toArray()),
  onFilter: PropTypes.func.isRequired
};

export default LandTypes;
