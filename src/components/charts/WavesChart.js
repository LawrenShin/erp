import React, { PureComponent } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

const data = [
  {
    "name": "Mar",
    "uv": 4000,
    "pv": 2400,
    "amt": 2400
  },
  {
    "name": "Apr",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
  },
  {
    "name": "May",
    "uv": 2000,
    "pv": 9800,
    "amt": 2290
  },
  {
    "name": "Jun",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000
  },
  {
    "name": "Jul",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
  },
  {
    "name": "Aug",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
  },
  {
    "name": "Sep",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100
  },
  {
    "name": "Oct",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100
  },
  {
    "name": "Nov",
    "uv": 7490,
    "pv": 5300,
    "amt": 2100
  },
  {
    "name": "Dec",
    "uv": 3490,
    "pv": 6300,
    "amt": 2100
  },
  {
    "name": "Jan",
    "uv": 3490,
    "pv": 6100,
    "amt": 2100
  },
  {
    "name": "Feb",
    "uv": 3000,
    "pv": 7000,
    "amt": 2210
  },
  {
    "name": "May",
    "uv": 3000,
    "pv": 6250,
    "amt": 2210
  },
]

const payload = [
  { value: 'X - TIME', type: 'line', id: 'ID01' }, 
  { value: 'China', type: 'line', id: '1' },
  { value: 'Y - AVERAGE', type: 'line', id: 'ID01' },
  { value: 'Bangladesh', type: 'line', id: '2' }
];

export default class WavesChart extends PureComponent {

  renderArea = (areaName, strokeColor, fillColor) => {
    return (
      <Area id={`${areaName}`} name={areaName} type="monotone" dataKey="uv" stroke={strokeColor} 
        fillOpacity={.2} fill={fillColor} 
        isAnimationActive 
        animationBegin={0} 
        animationEasing='ease' />
    );
  }

  render() {
    return (
      <div className='waves-wrapper'>
        <AreaChart 
          width={this.props.width || 630} height={this.props.height || 250} 
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(105, 197, 216)" stopOpacity={1}/>
              <stop offset="95%" stopColor="rgb(105, 197, 216)" stopOpacity={.3}/>
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(28, 94, 151)" stopOpacity={1}/>
              <stop offset="95%" stopColor="rgb(28, 94, 151)" stopOpacity={.3}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="2 2" />
          <Tooltip />
          <Area id='1' name="China" type="monotone" dataKey="uv" stroke="rgb(105, 197, 216)" 
            fillOpacity={1} fill="url(#colorUv)" 
            isAnimationActive 
            animationBegin={0} 
            animationEasing='ease' />
          <Area id='2' name="Bangladesh" type="monotone" dataKey="pv" stroke="rgb(28, 94, 151)" 
            fillOpacity={1} fill="url(#colorPv)" 
            isAnimationActive 
            animationBegin={1500} 
            animationEasing='ease-in-out'/>
            {/* {this.props.areas && this.props.areas.map(area => this.renderArea(area))} */}
        </AreaChart>
        <div className='waves-legend'>
          <div className='legend-1'>
            <div><span>X - TIME</span></div>
            <div><span>Y - AVERAGE</span></div>
          </div>
          <div className='legend-2'>
            <div>
              <div className='colored-1'></div>
              <span>China</span>
            </div>
            <div>
              <div className='colored-2'></div>
              <span>Bangladesh</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}