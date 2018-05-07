import React from 'react';

import SearchContainer from './Search/SearchContainer';
import DetailContainer from './Detail/DetailContainer';

import './MainView.css';

export default class MainView extends React.Component {
  state = { cardForDetailedShow: '' }

  showDetails = (code) => {
    this.setState({ cardForDetailedShow: code });
  }

  render() {
    const { cardForDetailedShow } = this.state;
    return (
      <div className={'row MainView'}>
        <SearchContainer showDetails={this.showDetails}/>
        <DetailContainer code={cardForDetailedShow.toLowerCase()}/>
      </div>
    );
  }
}