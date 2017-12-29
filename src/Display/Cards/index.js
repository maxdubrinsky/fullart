import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Grid from 'material-ui/Grid';

import styles from './Cards.scss';

const Cards = ({cards}) => (
  <div className={styles.cards}>
    <Grid container alignItems="center">
      {cards.map(({editions}) => 
        editions.filter(({multiverse_id}) => multiverse_id)
                .map(({image_url, multiverse_id}) => (
                  <Grid item key={multiverse_id}>
                    <img src={image_url} title={multiverse_id} />
                  </Grid>
                ))
      )}
    </Grid>
  </div>
);

Cards.propTypes = {
  cards: ImmutablePropTypes.list.isRequired
};

export default Cards;
