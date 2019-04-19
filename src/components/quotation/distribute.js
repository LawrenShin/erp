import React from 'react';
import {NavLink} from 'react-router-dom';
import AddBtn from '../controls/addbtn';
import Dropdown from '../controls/dropdown';
import Input from '../controls/input';
import Table from './distributeTable';
import {connect} from 'react-redux';
import {createRequestAction} from '../../actions';
import Loading from '../helpers/loading';

class Distribute extends React.Component {
    state = { 
        tableWidth: 0,
        tableHeight: 0
    };

    ref = React.createRef();

    getHeight = () => {
        return 300;
    }

    componentDidMount() {
        window.addEventListener("resize", this.onResize);
        this.onResize();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
    }


    onResize = () => {
        this.setState({tableWidth: this.ref.current.clientWidth, tableHeight: this.getHeight()});
    }

    render() {
        return (
            <>
                <div className="page-heading page-heading_distribute" ref={this.ref}>	
                    <div className="page-heading__title">
                        <div className="page-heading__top">
                            <h1 className="h1">Pick suppliers for every product</h1>
                        </div>
                    </div>
                </div>

                <form>
                    <div className="filters-header reset-products_single filters-header_distribute">
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

                <Table width={this.state.tableWidth} height={this.state.tableHeight} />

                <div className="buttons-list-distribute">
                    <span className="btn btn-pick">Save</span>
                </div>
            </>
        )
    }
}

export default Distribute;