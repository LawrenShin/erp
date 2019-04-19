import React,{Component} from 'react';

import FilesTable from './FilesTable.js';

class Files extends Component{
  state = {layout: 'list', payload: {type: 'file', documentName: 'Smith archive', supplier: 'China LTD', date: '21.01.2018'}};

  switchLayout = (val) => this.setState({ layout: val });

  render(){
    const fakeArr = new Array(5);
    fakeArr.fill(this.state.payload);
    return (
      <>
        <div className="attaches-body">
          <div className="attaches-filters">
            <div className="attaches-filters__navs">
              <div className="select-elem">
                <div className="ui fluid selection dropdown">
                  <input type="hidden" />
                  <div className="default text">Supplier</div>
                  <i className="dropdown icon"></i>
                  <div className="menu">
                    <div className="item" data-value="af">online</div>
                    <div className="item active" data-value="ax">offline</div>
                  </div>
                </div>
              </div>
              <div className="attaches-filters__view">
                <span className={['attaches-filters__link', this.state.layout === 'list' ? 'selected' : ''].join(' ')} onClick={() => this.switchLayout('list')}>
                  <i className="icon-list"></i>
                </span>
                <span className={['attaches-filters__link', this.state.layout === 'cells' ? 'selected' : ''].join(' ')} onClick={() => this.switchLayout('cells')}>
                  <i className="icon-grid"></i>
                </span>
              </div>
            </div>
            <div className="attaches-filters-menu">
              <a href="#" className="attaches-filters-menu__link selected">All</a>
              <a href="#" className="attaches-filters-menu__link">Inbox</a>
              <a href="#" className="attaches-filters-menu__link">Sent</a>
            </div>
          </div>
          <FilesTable
            fakeArr={fakeArr}
            layout={this.state.layout}
            height={500}
            width={'100%'} />
        </div>
      </>
    )
  }
}

export default Files;