import React from 'react';
import PropTypes from 'prop-types';

import './Card.css';

const Card = (props) => {
  return (
    <div className={'Card'}>
      <div className={'row CardMainContainer'}>
        <div className={'col-4 CardMainCell Left'}>
          <p className={'CardMainCellText'}>
            {props.cardData.code}
          </p>
        </div>
        <div className={'col-4 CardMainCell Mid'}>
          <p className={'CardMainCellText'}>
            {props.cardData.rates[0].ask}  
          </p>  
        </div>
        <div className={'col-4 CardMainCell Right'}>
          <p className={'CardMainCellText'}>
          {props.cardData.rates[0].bid}
          </p>
          {props.isTemporary ? 
            '' :
            <button className={'DeleteCardButton'} onClick={() => props.deleteCard(props.cardData.id)}>X</button>
          }
        </div>
      </div>
      <div className={'CardNameCell'}>
        <p>
          {props.cardData.currency}
        </p>
      </div>
      { (props.isTemporary) ?
        <div className={'DoubleButton'}>
          <button className={'SaveButton'} onClick={() => props.addCard(props.cardData)}>
            Zapisz
          </button> 
          <button className={'HalfCardButton'} onClick={() => props.showDetails(props.cardData.code)}>
            Szczegóły
          </button>
        </div> :
        <button className={'CardButton'} onClick={() => props.showDetails(props.cardData.code)}>
          Szczegóły
        </button>
      }
    </div>
  );
};

Card.propTypes = {
  cardData: PropTypes.object,
  addCard: PropTypes.func,
  showDetails: PropTypes.func,
  isTemporary: PropTypes.bool,
  deleteCard: PropTypes.func,
};

export default Card;