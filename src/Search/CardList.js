import React from 'react';
import uuidv4 from 'uuid/v4';
import Card from './Card';

const CardList = (props) => {
  return (
    <div>
      {props.cards.map(card => 
        <Card key={uuidv4()}
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