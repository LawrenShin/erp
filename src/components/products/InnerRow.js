import React, {Component} from 'react';
import _ from 'lodash';
import SimpleBarChart from '../charts/SimpleBarChart';
import RadialChart from '../charts/RadialChart';
import styled, {keyframes} from 'styled-components';
import Loading from '../helpers/loading';
import LoadingTransparent from '../helpers/loadingTransparent';
import img from "../../assets/img/examples/noimg.jpg";
import uuid from 'uuid'

class InnerRow extends Component {
    finder = (heap, needle) => {
        const match = heap.filter(h => h.value === needle)[0];
        if (match && 'text' in match) return match.text;
        return null
    };
    render() {
        const productDetails = this.props.value.filter((d, i) => i === this.props.row)[0];
        return (
            <div className={`inner-details`}
                 className={`${this.props.className} ${this.props.collapse ? 'collapsed' : ''}`}
                 style={{position: "relative", zIndex: 2000, background: "white", width: this.props.width || "100%"}}>
                <div className="product__preview">
                    <div className="product-picture">
                        <div className="load-file-picture">
                            <img src={productDetails['main_image'] ? productDetails['main_image'] : img }/>
                        </div>
                    </div>
                    <div className="product__preview__list">
                        {productDetails.shell_fabric_1 && <div className="product__preview__list__item">
                            <span className='product__preview__item__title'>Shell fabric 1</span>
                            <span className='product__preview__item__value'>{this.finder(this.props.filters.data.shell_fabric, productDetails.shell_fabric_1)}</span>
                        </div>}
                        {productDetails.shell_fabric_1_weight && <div className="product__preview__list__item">
                            <span className='product__preview__item__title'>Shell fabric weight 1</span>
                            <span className='product__preview__item__value'>{this.finder(this.props.filters.data.weight, +productDetails.shell_fabric_1_weight)}</span>
                        </div>}
                        {productDetails.shell_fabric_1_composition && <div className="product__preview__list__item">
                            <span className='product__preview__item__title'>Shell fabric composition 1</span>
                            <span className='product__preview__item__value'>{this.finder(this.props.filters.data.composition, productDetails.shell_fabric_1_composition)}</span>
                        </div>}
                        {productDetails.shell_fabric_1_construction && <div className="product__preview__list__item">
                            <span className='product__preview__item__title'>Shell fabric construction 1</span>
                            <span className='product__preview__item__value'>{this.finder(this.props.filters.data.construction, productDetails.shell_fabric_1_construction)}</span>
                        </div>}
                        {productDetails.lining && <div className="product__preview__list__item">
                            <span className='product__preview__item__title'>Lining</span>
                            <span className='product__preview__item__value'>{productDetails.lining}</span>
                        </div>}
                        {productDetails.category && <div className="product__preview__list__item">
                            <span className='product__preview__item__title'>Category</span>
                            <span className='product__preview__item__value'>{productDetails.category}</span>
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}

const down = keyframes`
  from {
    transform: rotateX(90deg);
    height: 0;    
  }

  to {
    transform: rotateX(0deg);        
    height: 288px;
  }
`;

const up = keyframes`
  from {
    transform: rotateX(0deg);        
    height: 288px;    
  }

  to {
    transform: rotateX(90deg);
    height: 0;    
  }
`;

export default styled(InnerRow)`
  .inner-details__inner {
    width: 80vw;
  }

  animation: ${down} 0.3s linear;
  animation-fill-mode: forwards;
  transform-origin: top center;
  height: 0;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
  &.collapsed {
      animation: ${up} 0.3s linear;
      animation-fill-mode: forwards;
  }
`;