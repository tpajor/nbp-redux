import React from 'react';
import Card from './Card';

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

export default CardList;