import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: 'Sep', pv: 2400,
  },
  {
    name: 'Oct', pv: 1398,
  },
  {
    name: 'Nov', pv: 9800
  },
  {
    name: 'Dec', pv: 3908
  },
  {
    name: 'Jan', pv: 4800
  },
  {
    name: 'Feb', pv: 3800
  },
  {
    name: 'Mar', pv: 300
  }
];

const getIntroOfPage = (label) => {
  if (label === 'Sep') {
    return "Page A is about men's clothing";
  } if (label === 'Oct') {
    return "Page B is about women's dress";
  } if (label === 'Nov') {
    return "Page C is about women's bag";
  } if (label === 'Dec') {
    return 'Page D is about household goods';
  } if (label === 'Jan') {
    return 'Page E is about food';
  } if (label === 'Feb') {
    return 'Page F is about baby food';
  } if (label === 'Mar') {
    return 'Page F is about baby food';
  } 
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        {/* <p className="intro">{getIntroOfPage(label)}</p>
        <p className="desc">Anything you want can be displayed here.</p> */}
      </div>
    );
  }

  return null;
};

export default class SimpleBarChart extends PureComponent {
  state = { color: '#BBDFF4' };

  bakeData = (raw) => {
    const axisX = raw.axis_x.map( (d, i) => {
      if(i === 0 || i === raw.axis_x.length - 1) return `${d[1]} ${d[0]}`;
      return d[1];
    });
    return axisX.map((n, i) => Object.assign({}, { name: n }, {pv: raw.axis_y[i]}));
  }

  render() {
    const baked = this.bakeData(this.props.data);
    return (
      <BarChart
        width={this.props.width || 500}
        height={this.props.height || 300}
        data={baked}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="name" />
        {/* <YAxis dataKey="pv" /> */}
        <Tooltip content={<CustomTooltip />} />
        {/* <Legend /> */}
        <Bar 
          dataKey="pv" 
          fill={this.state.color} 
          barSize={20} 
          isAnimationActive 
          animationBegin={100} 
          animationDuration={1000}>
          </Bar>
      </BarChart>
    );
  }
}

// 1D96DB
// BBDFF4