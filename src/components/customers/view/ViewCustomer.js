import React,{Component} from 'react';

import {NavLink} from 'react-router-dom';
import {createRequestAction} from '../../../actions';
import { connect } from 'react-redux';
import {singleCustomerSelector} from '../../../selectors/customers';
import Loading from '../../helpers/loading';
import Checkbox from '../../controls/checkbox';

class ViewCustomer extends Component{
  componentDidMount(){
    this.props.getCustomer(this.props.match.params.id);
  }

  render(){
    if(this.props.customer.state === "loading"){
      return <Loading />;
    }

    const customer = this.props.customer.data;
    return(
      <>
      <div className="page-heading page-heading_full">
        <div className="page-heading__title">
          <div className="page-heading__top">
            <h1 className="h1">{customer.name}</h1>
            <NavLink className="page-heading__icon page-heading__icon_circle" to={`/customers/edit/${customer.id}`}>
              <i className="icon-edit"></i>
            </NavLink>
          </div>
          <div className="page-subtitle_strong">{customer.code}</div>
        </div>
      </div>
      <div className="bg-box">
        {customer.description && 
          <div className="card-description">
            <div className="card-description__title">Description:</div>
            <div className="card-description__text">
              <p>{customer.description}</p>
            </div>
          </div>
        }
        <h2 className="decor-heading">
          <i className="icon-general-info"></i>GENERAL INFORMATION
        </h2>
        <div className="card-cols">

          <div className="card-cols__col">
            <ul className="card-list">
              <li className="card-list__item">
                <span className="card-list__title">Head contractor:</span>
                <span className="card-list__val">{customer.head_contractor_name}</span>
              </li>
              <li className="card-list__item">
                <span className="card-list__title">Parent:</span>
                <span className="card-list__val">{customer.parent}</span>
              </li>
              <li className="card-list__item">
                <span className="card-list__title">INN:</span>
                <span className="card-list__val">{customer.inn}</span>
              </li>
              <li className="card-list__item">
                <span className="card-list__title">KPP:</span>
                <span className="card-list__val">{customer.kpp}</span>
              </li>
              <li className="card-list__item">
                <span className="card-list__title">OKPO:</span>
                <span className="card-list__val">{customer.okpo}</span>
              </li>
            </ul>
          </div>

          <div className="card-cols__col">
            <ul className="card-list">									
              <li className="card-list__item">
                <span className="card-list__title">Main bank account:</span>
                <span className="card-list__val">{customer.main_bank_account}</span>
              </li>								
              <li className="card-list__item">
                <span className="card-list__title">Main contract:</span>
                <span className="card-list__val">{customer.main_contract}</span>
              </li>								
              <li className="card-list__item">
              {/* how to present data? */}
                <span className="card-list__title">Work schedule:</span>
                <span className="card-list__val">From <span>8 a.m</span> till <span>5 p.m.</span></span>
              </li>								
              <li className="card-list__item">
                <span className="card-list__title">Lead time days:</span>
                <span className="card-list__val">{customer.lead_time_days}</span>
              </li>								
              <li className="card-list__item">
                <span className="card-list__title">Identity document:</span>
                <span className="card-list__val">{customer.identity_document}<span download="download"><i className="icon-file"></i></span></span>
              </li>
            </ul>
          </div>

          <div className="card-cols__col card-cols__col_3">
            <div className="card-cols__colinside">
              <div className="card-cols__col-2">
                <ul className="card-list">									
                  <li className="card-list__item">
                    <span className="card-list__title">Code supplier:</span>
                    <span className="card-list__val">{customer.code_supplier}</span>
                  </li>								
                  <li className="card-list__item">
                    <span className="card-list__title">Inn view:</span>
                    <span className="card-list__val">{customer.inn_view}</span>
                  </li>								
                  <li className="card-list__item">
                    <span className="card-list__title">Delay:</span>
                    <span className="card-list__val">{customer.delay}</span>
                  </li>	
                </ul>
              </div>
              
              <div className="card-cols__col-2">
                <div className="general-list general-list_column">
                  <div className="general-list__item">								
                    <div className="checkbox-elem">
                      <Checkbox label='Is non resident' name='is_non_resident' checked={customer.is_non_resident} readOnly={true} />
                    </div>
                  </div>
                  <div className="general-list__item">								
                    <div className="checkbox-elem">
                      <Checkbox label='Is deleted' name='is_deleted' checked={customer.is_deleted} readOnly={true} />
                    </div>
                  </div>
                  <div className="general-list__item">								
                    <div className="checkbox-elem">
                      <Checkbox label='Is nds' name='is_nds' checked={customer.is_nds} readOnly={true} />
                    </div>
                  </div>
                  <div className="general-list__item">								
                    <div className="checkbox-elem">
                      <Checkbox label='Is tax' name='is_tax' checked={customer.is_tax} readOnly={true} />
                    </div>
                  </div>
                  <div className="general-list__item">								
                    <div className="checkbox-elem">
                      <Checkbox label='Is transport' name='is_transport' checked={customer.is_transport} readOnly={true} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          <h2 className="decor-heading">
            <i className="icon-contacts"></i>CONTACTS
          </h2>
          <div className="card-cols">
            <div className="card-cols__col">
              <ul className="card-list">
                <li className="card-list__item">
                  <span className="card-list__title">Region:</span>
                  {/* request */}
                  <span className="card-list__val">Ленинградская область (RU)</span> 
                </li>
                <li className="card-list__item">
                  <span className="card-list__title">Port:</span>
                  {/* request */}
                  <span className="card-list__val">Ленинградская область (RU)</span>
                </li>
              </ul>
            </div>
            <div className="card-cols__col">
              <ul className="card-list">
                <li className="card-list__item">
                  <span className="card-list__title">Access group contractor:</span>
                  <span className="card-list__val">{customer.access_group_contractor}</span>
                </li>
              </ul>
            </div>
            <div className="card-cols__col card-cols__col_3">
              <ul className="card-list">
                <li className="card-list__item">
                  <span className="card-list__title">Manufacturer:</span>
                  <span className="card-list__val">{customer.manufacturer}</span>
                </li>
              </ul>
            </div>
          </div>
          <h2 className="decor-heading">
            <i className="icon-options"></i>OPTIONS
          </h2>
          <div className="card-cols">
            <div className="card-cols__col">
              <ul className="card-list">
                <li className="card-list__item">
                  <span className="card-list__title">Commission remuneration:</span>
                  <span className="card-list__val">{customer.commission_remuneration}</span>
                </li>
                <li className="card-list__item">
                  <span className="card-list__title">Calc method commission remuneration:</span>
                  <span className="card-list__val">{customer.calc_method_commission_remuneration}</span>
                </li>
                <li className="card-list__item">
                  <span className="card-list__title">Allowable amount debt:</span>
                  <span className="card-list__val">{customer.allowable_amount_debt}</span>
                </li>
                <li className="card-list__item">
                  <span className="card-list__title">Type settlements:</span>
                  <span className="card-list__val">{customer.type_settlements}</span>
                </li>
              </ul>
            </div>
            <div className="card-cols__col">
              <ul className="card-list">
                <li className="card-list__item">
                  <span className="card-list__title">Type item price:</span>
                  <span className="card-list__val">{customer.type_item_price}</span>
                </li>
                <li className="card-list__item">
                  <span className="card-list__title">Type delivery:</span>
                  <span className="card-list__val">{customer.type_delivery}</span>
                </li>
                <li className="card-list__item">
                  <span className="card-list__title">Type entity:</span>
                  <span className="card-list__val">{customer.type_entity}</span>
                </li>
                <li>
                  <Checkbox label='Is sign control amount debt' name='is_sign_control_amount_debt' checked={customer.is_sign_control_amount_debt} readOnly={true} />
                </li>
              </ul>
            </div>
          </div>
        {customer.comment && 
        <div className="card-comment">
          <div className="card-comment__title">Comments:</div>
          <div className="card-comment__description">
            <p>{customer.comment}</p>
          </div>
        </div>}
      </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  customer: singleCustomerSelector(state)
});

export default connect(mapStateToProps, 
  (dispatch) => ({
    getCustomer: (id) => dispatch(createRequestAction('customer', 'getById', [id]))
  }))(ViewCustomer);