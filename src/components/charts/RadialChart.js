import React, { PureComponent } from 'react';
import { RadialBarChart, RadialBar, Legend, PolarAngleAxis } from 'recharts';

const style = {
  position: 'relative',
  width: '140px',
  height: 'auto',
  left: '50%',
  marginLeft: '-60px',
  bottom: '20px',
  lineHeight: '24px'
};


export default class RadialChart extends PureComponent {

  bakeData = (raw) => {
    const baked = [
      { name: 'Finance', uv: raw.finance, fill: 'rgb(252, 68, 159)' },
      { name: 'Reliability', uv: raw.reliability, fill: 'rgb(84, 205, 230)' },
      { name: 'Rating', uv: raw.rating, fill: 'rgb(246, 121, 51)' },
      { name: '', uv: 100, fill: 'rgba(255, 255, 255, 0)' }
    ]
    return baked;
  }

  render() {
    const baked = this.bakeData(this.props.data);
    return (
      <div className='radial-chart-wrapper'>
        <RadialBarChart 
          width={this.props.width || 200} height={this.props.height || 200}
          innerRadius={55} outerRadius={80} 
          barSize={5}
          minPointSize={0} maxBarSize={100} 
          data={baked}>
          
          <RadialBar clockWise={true} clockWise dataKey="uv" />
          <Legend 
            iconSize={10} 
            width={this.props.legendWidth || 120} 
            height={this.props.legendHeight || 140} 
            wrapperStyle={style} />
        </RadialBarChart>
      </div>
    );
  }
}
