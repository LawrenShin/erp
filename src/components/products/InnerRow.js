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

    render() {
        const productDetails = this.props.value.filter((d, i) => i === this.props.row)[0];
        const filters = ['shell_fabric_1', 'shell_fabric_1_composition', 'shell_fabric_1_weight', 'lining', 'category', 'additional_nomenclature_description'];
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
                        {console.log(productDetails)}
                        {productDetails && Object.keys(productDetails).map(d => {
                            const req = filters.filter(word => word === d)[0];
                            if (productDetails[d] && req) {
                                return (
                                    <div key={uuid()} className="product__preview__list__item"><span
                                        className="product__preview__item__title">{d}:</span><span
                                        className="product__preview__item__value">{productDetails[d]}</span></div>
                                )
                            }
                        })}
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