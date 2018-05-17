import React from 'react';
import Card from './Card';
import PropTypes from 'prop-types';

const CardList = ({ cards, signedIn, userSignedIn, deleteCard, showDetails }) => {
  return (
    <div>
      {cards.map(card => 
        <Card key={card.id}
          signedIn={signedIn}
          userSignedIn={userSignedIn}
          deleteCard={deleteCard}
          cardData={card}
          isTemporary={false}
          showDetails={showDetails}
          cards={cards}
        />
      ).reverse()}
    </div>
  );
};

CardList.propTypes = {
  cards: PropTypes.array,
  deleteCard: PropTypes.func,
  showDetails: PropTypes.func,
  signedIn: PropTypes.bool,
  userSignedIn: PropTypes.string,
};

export default CardList;