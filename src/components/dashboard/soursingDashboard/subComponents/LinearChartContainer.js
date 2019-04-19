import React, { Component } from 'react';
import LineChart from '../../../charts/LineChart';

class LinearChartContainer extends Component {
  state = { 
    chartFilters: Object.keys(this.props.fromServer) || [ 'Accsessories', 'Jewellery', 'PU', 'Textile', 'Denim', 'Heavy knit', 'Jersey', 'Outwear', 'Shoes', 'Socks', 'Sport', 'Swimwear', 'Wovem' ],
    activeChartFilter: []
   }

  renderFilters = (filters) => filters.map(f => <div 
    key={f}
    onClick={ () => this.handleClick(f) }
    class={ `graph-filter ${this.state.activeChartFilter.includes(f) ? 'active' : ''}` }>{f}</div>);

  handleClick = (f) => {
    !this.state.activeChartFilter.includes(f) ? 
      this.setState({ activeChartFilter: [...this.state.activeChartFilter, f] })
      :
      this.setState({ activeChartFilter: this.state.activeChartFilter.filter(item => item !== f ) })
  }
  randomNum = () => Math.round(Math.random() * (500 - 0 + 1)) + 0;
  dataGen = () => {
    const categories = this.state.activeChartFilter.map(f => ({ name: f, data: this.props.fromServer[f].axis_y })),
    
    timeline = (()=>{
      for(let c in this.props.fromServer){
        if(this.props.fromServer[c].axis_x !== undefined) return this.props.fromServer[c].axis_x.map(d => `${d[1]} ${d[0]}`)
      }
    })(),
    
    max = (()=>{
      let inEachCat = [];
      if(categories.length){
        for(let c in categories){
          inEachCat.push(Math.max(...categories[c].data))
        }
        const rawMax = Math.max(...inEachCat);
        if(rawMax >= 1000)
          return Math.ceil(rawMax / 1000) * 1000;
        if(rawMax <= 100 || (rawMax >= 100 && rawMax <= 1000))
          return Math.ceil(rawMax / 100) * 100;
      }
      return 0;
    })();

    return { categories, timeline, max };
    let arr = Array(12).fill(0);
    return this.state.activeChartFilter.map(f => ( { name: f, data: arr.map(a => this.randomNum())} ));
  }

  render() {
    return (
      <div class="window">
        <div class="window-head">
            <div class="window-title">
                <i class="window-title__icon icon-analytics"></i>
                NLG capacity.
            </div>
            <div class="window-btns">
                <span class="window-btn window-btn_refresh"><i class="icon-refresh"></i></span>
                <span class="window-btn window-btn_hide"><i class="icon-angle-down"></i></span>
                <span class="window-btn window-btn_close"><i class="icon-close"></i></span>
            </div>
        </div>
        <div class="window-content">
            <div class="graph sourcing__graph">
                <div class="graph__filters">
                  {this.renderFilters(this.state.chartFilters)}
                </div>
                <LineChart 
                  width='100%' 
                  height={350} 
                  activeChartFilter={this.props.activeChartFilter}
                  dataPack={this.dataGen()}
                />
            </div>
        </div>
    </div>
    );
  }
}

export default LinearChartContainer;