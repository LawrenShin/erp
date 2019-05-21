import React from 'react';
import {NavLink} from 'react-router-dom';
import SupplierTable from '../../suppliers/Table';
import ProductTable from '../../products/Table'
import {connect} from 'react-redux';
import {createRequestAction} from '../../../actions';
import Loading from '../../helpers/loading';

class CreateQuotation extends React.Component {
    ref = React.createRef();

    state = { 
        tableWidth: 0,
        tableHeight: 0
    };

    componentDidMount() {
        window.addEventListener("resize", this.onResize);
        this.onResize();
        this.props.getSuppliers();
        this.props.getProducts();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
    }


    onResize = () => {
        this.setState({tableWidth: this.ref.current.clientWidth, tableHeight: 400});
    }

    render() {
        return (
            <>
                <div className="page-heading page-heading_quotation" ref={this.ref}>
                    <div className="page-heading__title">
                        <div className="page-heading__top">
                            <h1 className="h1">Quotation page</h1>
                        </div>
                    </div>
                    <div className="page-heading__navs">
                        <div className="steps-navigation">
                            <NavLink to="/quotations" className="btn btn2 btn_quotation">List of quotations</NavLink>
                            <NavLink to="/quotations/stage/1" className="steps-navigation__link active">First stage</NavLink>
                            <span className="steps-navigation__link">Second stage</span>
                            <span className="steps-navigation__link">Third stage</span>
                        </div>
                    </div>
                </div>

                <h2 className="h2">Create quotation</h2>
                <form>
                    <div className="box-bg-quotation">
                        <div className="filters-quotation">	
                            <div className="box-field box-field_calendar box-field_name">
                                <label className="box-field__label">Quotation name</label>
                                <input type="text" className="box-field__input" />
                            </div>
                            <div className="box-field box-field_calendar">
                                <label className="box-field__label">Tender starts date</label>
                                <div className="box-field__input box-field__input_as_decor">
                                    <input type="text" />
                                    <i className="datepicker-icon icon-calendar"></i>
                                </div>
                            </div>
                            <div className="box-field box-field_calendar">
                                <label className="box-field__label">Expiry date</label>
                                <div className="box-field__input box-field__input_as_decor">
                                    <input type="text" />
                                    <i className="datepicker-icon icon-calendar"></i>
                                </div>
                                <div className="checkbox-elem checkbox-elem_notify">
                                    <input type="checkbox" id="accept-1" />
                                    <label className="checkbox-label" for="accept-1">Do not notify supplier</label>
                                </div>
                            </div>
                            <div className="box-field box-field_calendar">
                                <label className="box-field__label">Reminder date (Enterprise only)</label>
                                <div className="box-field__input box-field__input_as_decor">
                                    <input type="text" />
                                    <i className="datepicker-icon icon-calendar"></i>
                                </div>
                                <div className="checkbox-elem checkbox-elem_notify">
                                    <input type="checkbox" id="accept-2" />
                                    <label className="checkbox-label" for="accept-2">Do not notify supplier</label>
                                </div>
                            </div>
                            <div className="box-field box-field_checbox-period">
                                <div className="checkbox-elem checkbox-elem_period">
                                    <input type="checkbox" id="regular" />
                                    <label className="checkbox-label" for="regular">Regular</label>
                                </div>
                                <div className="checkbox-elem checkbox-elem_period">
                                    <input type="checkbox" id="urgent" />
                                    <label className="checkbox-label" for="urgent">Urgent</label>
                                </div>
                            </div>
                        </div>
                
                    </div>
                    
                    <div className="quotation-filters">
                        <div className="quotation-heading">
                            <h2 className="h2">Choose supplier</h2>
                            <div className="search-bl quotation-search">
                                <input type="text" className="search-bl__input" />
                                <button type="submit" className="search-bl__btn"><i className="icon-search"></i></button>
                            </div>
                        </div>

                        <div className="filters-header">
                            <span className="filters-header__title">Filters</span>
                            <button type="reset" className="filters-header__reset">Clear all<i className="icon-trash"></i></button>
                        </div>
                        
                        <div className="filters-box filters-box-without-decor">
                            <div className="filters-box__item">
                                <div className="input-elem">
                                    <input type="text" placeholder="Name" className="filters-input" />
                                </div>
                            </div>

                            <div className="filters-box__item">
                                <div className="filters-elem select-elem select-elem select-elem_multiple">
                                    
                                    <div className="select-elem__text">Status</div>

                                    <div className="ui fluid multiple special selection dropdown">
                                        <input type="hidden" name="country" value="" />
                                        <i className="dropdown icon"></i>
                                        <div className="text default">1 selected</div>
                                        <div className="menu transition hidden" tabindex="-1">
                                            <div className="item active" data-value="af">online</div>
                                            <div className="item" data-value="af">offline</div>
                                        </div>

                                    </div>
                                </div>
                            </div>


                            <div className="filters-box__item">
                                <div className="filters-elem select-elem">
                                    <div className="ui fluid selection dropdown">
                                        <input type="hidden" />
                                        <div className="default text">Type</div>
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
                                        <div className="default text">Payment type</div>
                                        <i className="dropdown icon"></i>
                                        <div className="menu">
                                            <div className="item" data-value="af">online</div>
                                            <div className="item" data-value="ax">offline</div>
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
                                        <div className="default text">Gender</div>
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
                                        <div className="default text">Age</div>
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
                                        <div className="default text">Incoterms</div>
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
                                    <input type="text" placeholder="Port" className="filters-input" />
                                </div>
                            </div>
                            <div className="filters-box__item">
                                <div className="input-elem">
                                    <input type="text" placeholder="Factory country" className="filters-input" />
                                </div>
                            </div>
                            <div className="filters-box__item">
                                <div className="input-elem">
                                    <input type="text" placeholder="Factory city" className="filters-input" />
                                </div>
                            </div>
                            <div className="filters-box__item">
                                <div className="input-elem">
                                    <input type="text" placeholder="Legal country" className="filters-input" />
                                </div>
                            </div>
                            <div className="filters-box__item">
                                <div className="input-elem">
                                    <input type="text" placeholder="Legal city" className="filters-input" />
                                </div>
                            </div>

                            <div className="filters-box__item">
                                <div className="filters-elem select-elem filters-elem_rating">
                                    
                                    <div role="listbox" aria-expanded="false" className="ui selection dropdown active visible" tabindex="0">
                                        <div className="default text" role="alert" aria-live="polite">Rating</div>
                                        <i aria-hidden="true" className="dropdown icon"></i>
                                        {/*<div className="filters_rating__2CyfD ">
                                            <div className="rc-slider">
                                                <div className="rc-slider-rail"></div>
                                                <div className="rc-slider-track rc-slider-track-1" style={{left: "24%", width: "45%"}}></div>
                                                <div className="rc-slider-step"></div>
                                                <div tabindex="0" className="rc-slider-handle rc-slider-handle-1" role="slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="24" aria-disabled="false" style={{border: "none", left: "24%"}}>
                                                    <div className="rc-slider-tooltip rc-slider-tooltip-placement-top " style={{left: "-14px", top: "-35px"}}>
                                                        <div className="rc-slider-tooltip-content">
                                                            <div className="rc-slider-tooltip-arrow"></div><div className="rc-slider-tooltip-inner" role="tooltip">67%</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                    <div tabindex="0" className="rc-slider-handle rc-slider-handle-2" role="slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="69" aria-disabled="false" style={{border: "none",  left: "69%"}}>
                                                        <div className="rc-slider-tooltip rc-slider-tooltip-placement-top " style={{left: "-14px", top: "-35px"}}>
                                                        <div className="rc-slider-tooltip-content">
                                                            <div className="rc-slider-tooltip-arrow"></div><div className="rc-slider-tooltip-inner" role="tooltip">67%</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="rc-slider-mark"></div>
                                            </div>
                                        </div>*/}
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="filters-box__item">
                                <div className="filters-elem select-elem">
                                    <div className="ui fluid selection dropdown">
                                        <input type="hidden" />
                                        <div className="default text">Financial rating</div>
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
                                        <div className="default text">Reability rating</div>
                                        <i className="dropdown icon"></i>
                                        <div className="menu">
                                            <div className="item" data-value="af">online</div>
                                            <div className="item" data-value="ax">offline</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="filters-box__item">
                                <div className="checkbox-elem">
                                    <input type="checkbox" id="checkbox-1" />
                                    <label className="checkbox-label" for="checkbox-1">Respond in time</label>
                                </div>
                            </div>
                            <div className="filters-box__item">
                                <div className="checkbox-elem">
                                    <input type="checkbox" id="checkbox-2" />
                                    <label className="checkbox-label" for="checkbox-2">Offeres Cost break down</label>
                                </div>
                            </div>
                            <div className="filters-box__item">
                                <div className="checkbox-elem">
                                    <input type="checkbox" id="checkbox-3" />
                                    <label className="checkbox-label" for="checkbox-3">Responsiveness in working with orders</label>
                                </div>
                            </div>
                            <div className="filters-box__item">
                                <div className="checkbox-elem">
                                    <input type="checkbox" id="checkbox-4" />
                                    <label className="checkbox-label" for="checkbox-4">Gives a discount for rejects and product delay</label>
                                </div>
                            </div>
                            <div className="filters-box__item">
                                <div className="checkbox-elem">
                                    <input type="checkbox" id="checkbox-5" />
                                    <label className="checkbox-label" for="checkbox-5">Doesn’t bother with work spam</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>	

                <SupplierTable addToQuotation store={{...this.props.store}} />

                <div className="buttons-quotation">
                    <span className="btn btn_quotation">Save</span>
                    <span className="btn btn2 btn_quotation">Send invitation</span>
                    <span className="btn btn_quotation btn-disabled">View status</span>
                </div>

                <form>
                    <div className="choice-product-filters">
                        <div className="filters-header filters-header_product">
                            <h2 className="h2">Choose products</h2>
                            <div className="reset-products">
                                <button type="reset" className="filters-header__reset">Clear all<i className="icon-trash"></i></button>
                            </div>
                        </div>
                        
                        <div className="filters-box filters-box-without-decor filters-box_smallitems">
                            <div className="filters-box__item">
                                <div className="filters-elem select-elem">
                                    <div className="ui fluid selection dropdown">
                                        <input type="hidden" />
                                        <div className="default text">Year</div>
                                        <i className="dropdown icon"></i>
                                        <div className="menu">
                                            <div className="item" data-value="af">2019</div>
                                            <div className="item active" data-value="ax">offline</div>
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
                                            <div className="item active" data-value="ax">offline</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="filters-box__item">
                                <div className="filters-elem select-elem">
                                    <div className="ui fluid selection dropdown">
                                        <input type="hidden" />
                                        <div className="default text">Product category</div>
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
                                        <div className="default text">Product group</div>
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
                                        <div className="default text">Gender</div>
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
                                        <div className="default text">Age</div>
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
                                        <div className="default text">Style name</div>
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
                                <div className="filters-elem select-elem">
                                    <div className="ui fluid selection dropdown">
                                        <input type="hidden" />
                                        <div className="default text">Additional info</div>
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
                                    <input type="text" placeholder="Target price original" className="filters-input" />
                                </div>
                            </div>
                            <div className="filters-box__item">
                                <div className="input-elem">
                                    <input type="text" placeholder="Target price  suppliers" className="filters-input" />
                                </div>
                            </div>
                            <div className="filters-box__item filters-box__item_two">									
                                <div className="box-field">
                                    <div className="box-field_two">
                                        <span className="box-field__smalllabel">MOQ</span>
                                        <input type="text" className="filters-input" />
                                        <span className="box-field__smalllabel">to</span>
                                        <input type="text" className="filters-input" />
                                    </div>
                                </div>
                            </div>
                            <div className="filters-box__item">
                                <div className="filters-elem select-elem">
                                    <div className="ui fluid selection dropdown">
                                        <input type="hidden" />
                                        <div className="default text">Lining</div>
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
                                        <div className="default text">Shell fabric 1</div>
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
                                        <div className="default text">Shell fabric 1 weight</div>
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
                                        <div className="default text">Shell fabric 2</div>
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
                                        <div className="default text">Shell fabric 2 weight</div>
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
                                        <div className="default text">Padding</div>
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
                                        <div className="default text">Supplier</div>
                                        <i className="dropdown icon"></i>
                                        <div className="menu">
                                            <div className="item" data-value="af">online</div>
                                            <div className="item active" data-value="ax">offline</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>	

                <ProductTable choose store={{...this.props.store}} />

                <div className="buttons-quotation buttons-quotation_products">
                    <NavLink to="/quotations/distribute" className="btn btn_products">Distribute products on suppliers</NavLink>
                    <span className="btn btn_products btn-disabled">View prices</span>
                </div>
            </>
        )
    }
}

export default connect(
    (state) => ({
        headers: state.products.headers,
        store: {...state}
    }), (dispatch) => ({
    getSuppliers: () => dispatch(createRequestAction("supplier", "list")),
    getProducts: (options) => dispatch(createRequestAction('product', 'list', [options])),
}))(CreateQuotation);