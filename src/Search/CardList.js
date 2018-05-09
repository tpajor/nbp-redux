import React from 'react';
import Card from './Card';
import PropTypes from 'prop-types';

const CardList = (props) => {
  return (
    <div>
      {props.cards.map(card => 
        <Card key={card.id}
          deleteCard={props.deleteCard}
          cardData={card}
          isTemporary={false}
          showDetails={props.showDetails}
        />
      ).reverse()}
    </div>
  );
};

CardList.propTypes = {
  cards: PropTypes.array,
  deleteCard: PropTypes.func,
  showDetails: PropTypes.func,
};

export default CardList;