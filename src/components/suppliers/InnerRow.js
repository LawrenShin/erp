import React,{Component} from 'react';
import _ from 'lodash';
import SimpleBarChart from '../charts/SimpleBarChart';
import RadialChart from '../charts/RadialChart';
import styled, {keyframes} from 'styled-components';
import Loading from '../helpers/loading';
import LoadingTransparent from '../helpers/loadingTransparent';

class InnerRow extends Component{

  render(){
    const supplierDetails = this.props.graphDetails.data.filter((d, i) => i === this.props.row)[0];
    const isDetails = typeof supplierDetails !== 'undefined';
    return(
      <div className={`inner-details`} className={`${this.props.className} ${this.props.collapse ? 'collapsed' : ''}`} style={{position: "relative", zIndex: 2000, background: "white", width: this.props.width || "100%"}}>
        <div className="inner-details__inner">

          {isDetails ? <div className="contacts-details">
            <div className="inner-details__title">
              <div className="inner-details__title_withicon">
                Contact details <span className="contacts-details__icon"><i className="icon-clone"></i></span>
              </div>
            </div>

            <div className="contacts-details__list">
              <div className="contacts-details__item">{supplierDetails.contacts_details.name}</div>
              <div className="contacts-details__item">{supplierDetails.contacts_details.person_name}</div>
              <div className="contacts-details__item">E-mail:
                <a href={`mailto:${supplierDetails.contacts_details.person_email}`}>
                  {supplierDetails.contacts_details.person_email}
                </a>
              </div>

              <div className="contacts-details__item">Tel:
                <a href={`tel:${supplierDetails.contacts_details.person_phone}`} className="inner-details__tel">
                  {supplierDetails.contacts_details.person_phone}
                </a>
              </div>

              <div className="contacts-details__item">Address: {supplierDetails.contacts_details.address}</div>
            </div>
          </div> : <LoadingTransparent />}

          {isDetails ? <>
            <div className="order-dynamics">
              <div className="inner-details__title">order dynamycs</div>
              <SimpleBarChart width={400} height={200} data={supplierDetails.order_dynamics} />
            </div>
            <div className="order-dynamics-charts">
              <div className="order-dynamics__pie">
                <RadialChart width={200} height={200} data={supplierDetails.chart} />
              </div>
            </div>
          </> : <Loading />}

          {isDetails ? <div className="counts">
            <div className="counts__item">
              <div className="counts__title">Reliability rating</div>
              <div className="counts__val counts__val_percent">{`${supplierDetails.reliability_rating} %`}</div>
            </div>
            <div className="counts__item">
              <div className="counts__title">Total amount, usd</div>
              <div className="counts__val">{supplierDetails.total_amount_usd}</div>
            </div>
            <div className="counts__item">
              <div className="counts__title">Total amount, pieces</div>
              <div className="counts__val">{supplierDetails.total_amount_pieces}</div>
            </div>
            <div className="counts__item">
              <div className="counts__title">Product category</div>
              <div className="counts__val counts__val_category">
                { ((cats) => {
                  if(cats.length){
                    return cats.join(', ');
                  }
                })(supplierDetails.product_category) }
              </div>
            </div>
          </div> : <LoadingTransparent />}

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