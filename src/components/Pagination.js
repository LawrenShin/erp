import React,{Component} from 'react';

import {Icon} from 'semantic-ui-react';

import styles from '../css/pagination.module.css';

class Pagination extends Component{

  handleClick = (arrow) => {
    const pagiData = this.props.paginationData;
    let offset = 0;
    if(arrow === 'right') offset = pagiData.offset + pagiData.limit <= pagiData.productsAmount ? pagiData.offset + pagiData.limit : pagiData.offset;
    if(arrow === 'left' && pagiData.offset) offset = pagiData.offset - pagiData.limit;
    this.props.updateOptions('offset', offset);
  }
  
  render(){
    const pagiData = this.props.paginationData;
    const amount = pagiData.productsAmount || pagiData.customersAmount || pagiData.amount;
    //define limit to display
    let limit = pagiData.offset ? pagiData.offset + pagiData.limit : pagiData.limit;
    if(limit > amount) limit = amount;
    return(
      <div className={styles.container}>
        <div>
          <span>{`${pagiData.offset ? pagiData.offset : 1} - ${limit} of ${amount}`}</span>
        </div>
        <div className={[styles.back, pagiData.offset ? styles.active : styles.inactive].join(' ')} 
            onClick={() => this.handleClick('left')}>
          <Icon name='angle left' size='small' />
        </div>
        <div className={[styles.forward, (limit === amount) ? styles.inactive : styles.active].join(' ')} 
            onClick={() => this.handleClick('right')}>
          <Icon name='angle right' size='small' />
        </div>
      </div>
    );
  }
}

export default Pagination;