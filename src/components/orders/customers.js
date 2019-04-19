import React, {Component} from 'react';
import Table from '../common/table';
import Loading from '../helpers/loading';
import {connect} from 'react-redux';
import {createRequestAction} from '../../actions';
import Order from '../common/order';

const statusClass = {
    CLOSED: 'bg-green',
    OPEN: 'bg-white',
    CANCELED: 'bg-red',
    'IN TRANSIT': 'bg-yellow'
}

class CustomerOrders extends Component {
    componentDidMount() {
        this.props.list();
    }

    fields = {                
        year: 'Year',
        season: 'Season',
        theme: 'Theme',
        brand: 'Brand',
        style_name: 'Style name',
        color: 'Color',
        gender_age: 'Gender + age',
        size_range: 'Size range',
        category: 'Category',
        price: 'Price',
        currency: 'Currency',
        comparable_price: 'Comparable_price, USD',
        qnty: 'Order qnty',
        total_order_amount: 'Total order amount, USD',                
        responsible_manager: 'Responsible manager',
        status: 'Order status'
    }

    render(){
        return(
            <>
                <div className="page-heading page-heading_card">	
                    <div className="page-heading__title">
                        <div className="page-heading__top">
                            <h1 className="h1">Customer Orders</h1>
                            <a className="page-heading__icon page-heading__icon_circle"><i className="icon-plus-2"></i></a>
                        </div>
                        <div className="page-subtitle">List of current orders</div>
                    </div>
                    <div className="page-heading__navs">
                        <form className="page-heading__form">
                            <div className="page-heading__search">
                                <div className="search-bl">
                                    <input type="text" className="search-bl__input" />
                                    <button type="submit" className="search-bl__btn"><i className="icon-search"></i></button>
                                </div>
                            </div>
                            <a href="#" className="page-heading__settings"><i className="icon-settings"></i></a>
                            <div className="filters-list">
                                <a href="" className="filters-list__link">top year</a>
                                <a href="" className="filters-list__link selected">top month</a>
                                <a href="" className="filters-list__link">top week</a>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="box-order">

                    <form>
                        <div className="filters-header">
                            <span className="filters-header__title">Filters</span>
                            <button type="reset" className="filters-header__reset">Clear all<i className="icon-trash"></i></button>
                        </div>
                        
                        <div className="filters-box filters-box-without-decor filters-box_smallitems">

                            <div className="filters-box__item">
                                <div className="filters-elem select-elem">
                                    <div className="ui fluid selection dropdown">
                                        <input type="hidden" />
                                        <div className="default text">Year</div>
                                        <i className="dropdown icon"></i>
                                        <div className="menu">
                                            <div className="item" data-value="af">2017</div>
                                            <div className="item active" data-value="ax">2019</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="filters-box__item">
                                <div className="input-elem">
                                    <input type="text" placeholder="Brand" className="filters-input" />
                                </div>
                            </div>
                            <div className="filters-box__item">
                                <div className="filters-elem select-elem">
                                    <div className="ui fluid selection dropdown">
                                        <input type="hidden" />
                                        <div className="default text">Season</div>
                                        <i className="dropdown icon"></i>
                                        <div className="menu">
                                            <div className="item" data-value="af">online</div>
                                            <div className="item active" data-value="ax">offline</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="filters-box__item">
                                <div className="filters-elem select-elem">
                                    <div className="ui fluid selection dropdown">
                                        <input type="hidden" />
                                        <div className="default text">Theme</div>
                                        <i className="dropdown icon"></i>
                                        <div className="menu">
                                            <div className="item" data-value="af">online</div>
                                            <div className="item" data-value="ax">offline</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="filters-box__item">
                                <div className="filters-elem select-elem">
                                    <div className="ui fluid selection dropdown">
                                        <input type="hidden" />
                                        <div className="default text">Gender+Age</div>
                                        <i className="dropdown icon"></i>
                                        <div className="menu">
                                            <div className="item" data-value="af">online</div>
                                            <div className="item" data-value="ax">offline</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="filters-box__item">
                                <div className="filters-elem select-elem">
                                    <div className="ui fluid selection dropdown">
                                        <input type="hidden" />
                                        <div className="default text">Size range</div>
                                        <i className="dropdown icon"></i>
                                        <div className="menu">
                                            <div className="item" data-value="af">online</div>
                                            <div className="item" data-value="ax">offline</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="filters-box__item">
                                <div className="input-elem">
                                    <input type="number" placeholder="Style name" className="filters-input" />
                                </div>
                            </div>
                            <div className="filters-box__item">
                                <div className="filters-elem select-elem">
                                    <div className="ui fluid selection dropdown">
                                        <input type="hidden" />
                                        <div className="default text">Color</div>
                                        <i className="dropdown icon"></i>
                                        <div className="menu">
                                            <div className="item" data-value="af">online</div>
                                            <div className="item" data-value="ax">offline</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="filters-box__item">
                                <div className="input-elem">
                                    <input type="number" placeholder="Comparable price" className="filters-input" />
                                </div>
                            </div>
                            <div className="filters-box__item">
                                <div className="filters-elem select-elem">
                                    <div className="ui fluid selection dropdown">
                                        <input type="hidden" />
                                        <div className="default text">Order status</div>
                                        <i className="dropdown icon"></i>
                                        <div className="menu">
                                            <div className="item" data-value="af">online</div>
                                            <div className="item" data-value="ax">offline</div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="filters-box__item filters-box__item_range">
                                <div className="filters-elem filters-range">
                                    <div className="filters-range__title">Total order qnty, pcs</div>
                                    <div className="filters-range__slider">
                                            <div className="filters-range__inputs">
                                                <input type="number" className="filters-range__input" />
                                                <span className="filters-range__divider">to</span>
                                                <input type="number" className="filters-range__input" />
                                            </div>	                                            
                                    </div>
                                </div>
                            </div>
                            <div className="filters-box__item filters-box__item_range">
                                <div className="filters-elem filters-range">
                                    <div className="filters-range__title">Total order amount, USD</div>
                                    <div className="filters-range__slider">
                                            <div className="filters-range__inputs">
                                                <input type="number" className="filters-range__input" />
                                                <span className="filters-range__divider">to</span>
                                                <input type="number" className="filters-range__input" />
                                            </div>											
                                    </div>
                                </div>
                            </div>
                            <div className="filters-box__item">
                                <div className="filters-elem select-elem select-elem select-elem_multiple">
                                    
                                    <div className="select-elem__text">Category</div>
                                    <div className="ui fluid multiple special selection dropdown">
                                        <input type="hidden" name="country" value="ax,al,as" />
                                        <i className="dropdown icon"></i>
                                        <div className="text">3 selected</div>
                                            <div className="menu transition" tabindex="-1">
                                            <div className="item selected" data-value="af">Afghanistan</div>
                                            <div className="item active" data-value="ax">Aland Islands</div>
                                            <div className="item active" data-value="al">Albania</div>
                                            <div className="item" data-value="dz">Algeria</div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                            <div className="filters-box__item">
                                <div className="filters-elem select-elem">
                                    <div className="ui fluid selection dropdown">
                                        <input type="hidden" />
                                        <div className="default text">Suppliers</div>
                                        <i className="dropdown icon"></i>
                                        <div className="menu">
                                            <div className="item" data-value="af">online</div>
                                            <div className="item" data-value="ax">offline</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        
                    </form>

                    {
                        this.props.data.state === "loading" ? <Loading/> : 
                        <Table 
                            fields={this.fields} 
                            data={this.props.data.data} 
                            header={(name, title) => <Order name={name} title={title} />} 
                            cell={(value, name) => name === 'gender_age' ? 
                                <div className="col-list-details">
                                    <div className="col-details">
                                        <div className="col-details__item" style={{backgroundColor: "#1461a0"}}>Male</div>
                                        <div className="col-details__item" style={{backgroundColor: "#7714a0"}}>Female</div>
                                        <div className="col-details__item" style={{backgroundColor: "#77848f"}}>Unisex</div>
                                    </div>
                                    <div className="col-list">
                                        {value}
                                    </div>
                                </div> :
                                name === 'status' ? <span className={`order-status ${statusClass[value]}`}>{value}</span> : 
                                value
                            }/>
                    }
                    
                </div>
            </>
        );
    }
}

export default connect((state) => ({
    data: state.orders.list
}), (dispatch) => ({
    list: () => dispatch(createRequestAction("order", "list"))
}))(CustomerOrders);