import React from 'react';

import '../App.css';

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
            <button className={'DeleteCardButton'} onClick={() => props.deleteCard(props.cardData)}>X</button>
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
          <button className={'SaveButton'} onClick={() => props.saveCard(props.cardData)}>
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

export default Card;