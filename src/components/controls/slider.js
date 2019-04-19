import React from 'react';
import Slider, {createSliderWithTooltip} from 'rc-slider';

export default (props) => {
    const MySlider = createSliderWithTooltip(Slider);

    return <MySlider {...props} min={props.min || 0} max={props.max || 100}
       defaultValue={+props.value}
       tipFormatter={value => `${(+value / ((props.max || 100) - (props.min || 0)) * 100)}%`} 
       handleStyle={{border: 'none', boxShadow: '0 0 5px black'}}
       onChange={(value) => props.onChange && props.onChange({value, name: props.name, target: {name: props.name, value}})} 
       />
}