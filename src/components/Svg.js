import React,{Component} from 'react';

import styles from '../css/svg.module.css';

class Svg extends Component{

  handleClick = () => this.props.clickIcon(this.props.name);

  render(){
    let svg = undefined;
    if(this.props.name === 'settings') {
      svg = (
        <div className={[styles.settings, this.props.className].join(' ')} onClick={this.handleClick} >
          <img src={this.props.path} />
        </div>
      );
    }else if(this.props.name === 'exchange') {
      svg = (
        <div>
          <img src={this.props.path} className={styles.exchange} />
        </div>
      );
    }else{
      svg = (
        <div className={styles.container} onClick={this.handleClick} >
          <img src={this.props.path} className={styles.svg} />
        </div>
    );
  }
    return svg;
  }
}

export default Svg;