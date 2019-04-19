import React, { Component } from 'react';
import Chart from 'chart.js';

class LineChart extends Component {
  state = { chart: null };

  randomNum = () => Math.round(Math.random() * (255 - 0 + 1)) + 0;

  randomGradient = (ctx) => {
    var gradientFill = ctx.createLinearGradient(0, 0, 0, this.props.height);
    gradientFill.addColorStop(0, `rgba(${this.randomNum()}, ${this.randomNum()}, ${this.randomNum()}, 0.6)`);
    gradientFill.addColorStop(1, `rgba(${this.randomNum()}, ${this.randomNum()}, ${this.randomNum()}, 0.6)`);
    return gradientFill;
  }

  datasetComposer = (datapack, ctx) => datapack.categories.map(p => ({
      label: p.name,
      fill: true,
      backgroundColor: this.randomGradient(ctx),
      data: p.data,
    }));

  chartComposer = (props) => {
    let ctx = document.getElementById("line-chart").getContext('2d');
    let canvas = document.getElementById("line-chart");
    const composed = this.datasetComposer(props.dataPack, ctx);

    let data = {
      labels: this.props.dataPack.timeline || ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: composed
    };

    let options = {
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          stacked: false,
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: this.props.dataPack.max || 500
          },
          stacked: false,
        }]
      },
      legend: {
        display: true,
        position: 'bottom',
      }
    }
      
    let newLineChart = new Chart(canvas, {
      type: 'line',
      data: data,
      options: options
    });
    
    this.setState({ chart: newLineChart });
  }

  componentDidMount(){
    this.chartComposer(this.props); 
  }
  componentDidUpdate(prevProps){
    if(this.props.dataPack.categories.length !== prevProps.dataPack.categories.length) {
      const fromStateChart = this.state.chart;
      if(fromStateChart)
        fromStateChart.destroy();

      this.chartComposer(this.props);
    }
  }

  render() {
    return <div style={{ width: this.props.width, height: this.props.height }}><canvas id='line-chart'></canvas></div>
  }
}

export default LineChart;