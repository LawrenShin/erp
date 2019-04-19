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
      <div class="page-heading page-heading_full">
        <div class="page-heading__title">
          <div class="page-heading__top">
            <h1 class="h1">{customer.name}</h1>
            <NavLink class="page-heading__icon page-heading__icon_circle" to={`/customers/edit/${customer.id}`}>
              <i class="icon-edit"></i>
            </NavLink>
          </div>
          <div class="page-subtitle_strong">{customer.code}</div>
        </div>
      </div>
      <div class="bg-box">
        {customer.description && 
          <div class="card-description">
            <div class="card-description__title">Description:</div>
            <div class="card-description__text">
              <p>{customer.description}</p>
            </div>
          </div>
        }
        <h2 class="decor-heading">
          <i class="icon-general-info"></i>GENERAL INFORMATION
        </h2>
        <div class="card-cols">

          <div class="card-cols__col">
            <ul class="card-list">
              <li class="card-list__item">
                <span class="card-list__title">Head contractor:</span>
                <span class="card-list__val">{customer.head_contractor_name}</span>
              </li>
              <li class="card-list__item">
                <span class="card-list__title">Parent:</span>
                <span class="card-list__val">{customer.parent}</span>
              </li>
              <li class="card-list__item">
                <span class="card-list__title">INN:</span>
                <span class="card-list__val">{customer.inn}</span>
              </li>
              <li class="card-list__item">
                <span class="card-list__title">KPP:</span>
                <span class="card-list__val">{customer.kpp}</span>
              </li>
              <li class="card-list__item">
                <span class="card-list__title">OKPO:</span>
                <span class="card-list__val">{customer.okpo}</span>
              </li>
            </ul>
          </div>

          <div class="card-cols__col">
            <ul class="card-list">									
              <li class="card-list__item">
                <span class="card-list__title">Main bank account:</span>
                <span class="card-list__val">{customer.main_bank_account}</span>
              </li>								
              <li class="card-list__item">
                <span class="card-list__title">Main contract:</span>
                <span class="card-list__val">{customer.main_contract}</span>
              </li>								
              <li class="card-list__item">
              {/* how to present data? */}
                <span class="card-list__title">Work schedule:</span>
                <span class="card-list__val">From <span>8 a.m</span> till <span>5 p.m.</span></span>
              </li>								
              <li class="card-list__item">
                <span class="card-list__title">Lead time days:</span>
                <span class="card-list__val">{customer.lead_time_days}</span>
              </li>								
              <li class="card-list__item">
                <span class="card-list__title">Identity document:</span>
                <span class="card-list__val">{customer.identity_document}<span download="download"><i class="icon-file"></i></span></span>
              </li>
            </ul>
          </div>

          <div class="card-cols__col card-cols__col_3">
            <div class="card-cols__colinside">
              <div class="card-cols__col-2">
                <ul class="card-list">									
                  <li class="card-list__item">
                    <span class="card-list__title">Code supplier:</span>
                    <span class="card-list__val">{customer.code_supplier}</span>
                  </li>								
                  <li class="card-list__item">
                    <span class="card-list__title">Inn view:</span>
                    <span class="card-list__val">{customer.inn_view}</span>
                  </li>								
                  <li class="card-list__item">
                    <span class="card-list__title">Delay:</span>
                    <span class="card-list__val">{customer.delay}</span>
                  </li>	
                </ul>
              </div>
              
              <div class="card-cols__col-2">
                <div class="general-list general-list_column">
                  <div class="general-list__item">								
                    <div class="checkbox-elem">
                      <Checkbox label='Is non resident' name='is_non_resident' checked={customer.is_non_resident} readOnly={true} />
                    </div>
                  </div>
                  <div class="general-list__item">								
                    <div class="checkbox-elem">
                      <Checkbox label='Is deleted' name='is_deleted' checked={customer.is_deleted} readOnly={true} />
                    </div>
                  </div>
                  <div class="general-list__item">								
                    <div class="checkbox-elem">
                      <Checkbox label='Is nds' name='is_nds' checked={customer.is_nds} readOnly={true} />
                    </div>
                  </div>
                  <div class="general-list__item">								
                    <div class="checkbox-elem">
                      <Checkbox label='Is tax' name='is_tax' checked={customer.is_tax} readOnly={true} />
                    </div>
                  </div>
                  <div class="general-list__item">								
                    <div class="checkbox-elem">
                      <Checkbox label='Is transport' name='is_transport' checked={customer.is_transport} readOnly={true} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          <h2 class="decor-heading">
            <i class="icon-contacts"></i>CONTACTS
          </h2>
          <div class="card-cols">
            <div class="card-cols__col">
              <ul class="card-list">
                <li class="card-list__item">
                  <span class="card-list__title">Region:</span>
                  {/* request */}
                  <span class="card-list__val">Ленинградская область (RU)</span> 
                </li>
                <li class="card-list__item">
                  <span class="card-list__title">Port:</span>
                  {/* request */}
                  <span class="card-list__val">Ленинградская область (RU)</span>
                </li>
              </ul>
            </div>
            <div class="card-cols__col">
              <ul class="card-list">
                <li class="card-list__item">
                  <span class="card-list__title">Access group contractor:</span>
                  <span class="card-list__val">{customer.access_group_contractor}</span>
                </li>
              </ul>
            </div>
            <div class="card-cols__col card-cols__col_3">
              <ul class="card-list">
                <li class="card-list__item">
                  <span class="card-list__title">Manufacturer:</span>
                  <span class="card-list__val">{customer.manufacturer}</span>
                </li>
              </ul>
            </div>
          </div>
          <h2 class="decor-heading">
            <i class="icon-options"></i>OPTIONS
          </h2>
          <div class="card-cols">
            <div class="card-cols__col">
              <ul class="card-list">
                <li class="card-list__item">
                  <span class="card-list__title">Commission remuneration:</span>
                  <span class="card-list__val">{customer.commission_remuneration}</span>
                </li>
                <li class="card-list__item">
                  <span class="card-list__title">Calc method commission remuneration:</span>
                  <span class="card-list__val">{customer.calc_method_commission_remuneration}</span>
                </li>
                <li class="card-list__item">
                  <span class="card-list__title">Allowable amount debt:</span>
                  <span class="card-list__val">{customer.allowable_amount_debt}</span>
                </li>
                <li class="card-list__item">
                  <span class="card-list__title">Type settlements:</span>
                  <span class="card-list__val">{customer.type_settlements}</span>
                </li>
              </ul>
            </div>
            <div class="card-cols__col">
              <ul class="card-list">
                <li class="card-list__item">
                  <span class="card-list__title">Type item price:</span>
                  <span class="card-list__val">{customer.type_item_price}</span>
                </li>
                <li class="card-list__item">
                  <span class="card-list__title">Type delivery:</span>
                  <span class="card-list__val">{customer.type_delivery}</span>
                </li>
                <li class="card-list__item">
                  <span class="card-list__title">Type entity:</span>
                  <span class="card-list__val">{customer.type_entity}</span>
                </li>
                <li>
                  <Checkbox label='Is sign control amount debt' name='is_sign_control_amount_debt' checked={customer.is_sign_control_amount_debt} readOnly={true} />
                </li>
              </ul>
            </div>
          </div>
        {customer.comment && 
        <div class="card-comment">
          <div class="card-comment__title">Comments:</div>
          <div class="card-comment__description">
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