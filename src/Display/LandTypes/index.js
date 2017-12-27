import React from 'react';
import PropTypes from 'prop-types';

import {Types} from '../utils';
import styles from './LandTypes.css';

const LandTypes = ({land, onFilter}) => (
  <div>
    <h4>Types</h4>
    <ul>
      {Types.map(type => 
        <li key={type} className={type === land ? styles.checked : ''}>
          <button onClick={() => onFilter(type)}>
            {type}
          </button>
        </li>
      )}
    </ul>
  </div>
);

LandTypes.propTypes = {
  land: PropTypes.oneOf(Types.toArray()),
  onFilter: PropTypes.func.isRequired
};

export default LandTypes;
