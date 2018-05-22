import React from 'react';
import PropTypes from 'prop-types';

import './Card.css';

const Card = ({ cardData, isTemporary, deleteCard, userSignedIn, signedIn, addCard, showDetails, cards }) => {
  return (
    <div className={'Card'}>
      <div className={'row CardMainContainer'}>
        <div className={'col-4 CardMainCell Left'}>
          <p className={'CardMainCellText'}>
            {cardData.code}
          </p>
        </div>
        <div className={'col-4 CardMainCell Mid'}>
          <p className={'CardMainCellText'}>
            {cardData.rates[0].ask}  
          </p>  
        </div>
        <div className={'col-4 CardMainCell Right'}>
          <p className={'CardMainCellText'}>
            {cardData.rates[0].bid}
          </p>
          {isTemporary ? 
            '' :
            <button className={'DeleteCardButton'} onClick={() => deleteCard(cardData.id, userSignedIn, signedIn)}>X</button>
          }
        </div>
      </div>
      <div className={'CardNameCell'}>
        <p>
          {cardData.currency}
        </p>
      </div>
      { (isTemporary) ?
        <div className={'DoubleButton'}>
          <button className={'SaveButton'} onClick={() => addCard(cardData, userSignedIn, signedIn, cards)}>
            Przypnij
          </button> 
          <button className={'HalfCardButton'} onClick={() => showDetails(cardData.code)}>
            Dodaj do wykresu
          </button>
        </div> :
        <button className={'CardButton'} onClick={() => showDetails(cardData.code)}>
          Dodaj do wykresu
        </button>
      }
    </div>
  );
};

Card.propTypes = {
  userSignedIn: PropTypes.string,
  signedIn: PropTypes.bool,
  cardData: PropTypes.object,
  addCard: PropTypes.func,
  showDetails: PropTypes.func,
  isTemporary: PropTypes.bool,
  deleteCard: PropTypes.func,
  cards: PropTypes.array,
};

export default Card;