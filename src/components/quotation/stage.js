import React from 'react';
import {NavLink} from 'react-router-dom';
import SupplierTable from '../suppliers/List';
import ProductTable from '../products/Table'
import {connect} from 'react-redux';
import {createRequestAction} from '../../actions';
import Loading from '../helpers/loading';
import Table from './stageTable';

class QuotationStage extends React.Component {
    ref = React.createRef();

    state = { 
        tableWidth: 0,
        tableHeight: 0,
        loaded: false
    };

    componentDidMount() {
        window.addEventListener("resize", this.onResize);
        this.onResize();
        setTimeout( () => {
            this.setState({loaded: true});
        }, 700)
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
                <div className="page-heading">	
                    <div className="page-heading__title">
                        <div className="page-heading__top">
                            <h1 className="h1">Stage {this.props.match.params.step}</h1>
                        </div>
                    </div>
                </div>

                <div className="steps-heading" ref={this.ref}>
                    <div className="start-date">
                        <span className="start-date__title">Start date:</span><span className="start-date__val">March, 15th</span><i className="start-date__icon icon-calendar"></i>
                    </div>
                    <div className="search-bl steps-search">
                        <input type="text" className="search-bl__input" />
                        <button type="submit" className="search-bl__btn"><i className="icon-search"></i></button>
                    </div>
                </div>
                <form>
                    <div className="filters-header filters-header_steps">
                        <h2 className="stage-subtitle">List of products with prices</h2>
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
                    
                </form>	


                {this.state.loaded ?
                <Table width={this.state.tableWidth} height={this.state.tableHeight} step={this.props.match.params.step}/>
                :
                <Loading />
                }

                <div className="buttons-list-distribute">
                    <span className="btn btn2 btn-steps">Save</span>
                    {
                        this.props.match.params.step == 1 ?
                        <NavLink to="/quotations/stage/2" className="btn btn-steps btn-steps-next">End first stage</NavLink> :
                        this.props.match.params.step == 2 ?
                        <NavLink to="/quotations/stage/3" className="btn btn-steps btn-steps-next">Start third stage</NavLink> 
                        :
                        <span class="btn btn2 btn-steps-last">Create order</span>
                    }
                    
                </div>
            </>

            
        )
    }

}

export default QuotationStage;