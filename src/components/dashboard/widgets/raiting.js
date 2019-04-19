import React from 'react';
import {Loading, LineBlock} from '../../helpers';
import Table from '../../common/table';
import {connect} from 'react-redux';
import {createAction, createRequestAction} from '../../../actions';
import Pointer from '../../controls/pointer';

const FIELDS = { 
    "name": 'Supplier', 
    "financial_rating": 'Financial rating', 
    "credit_debt": 'Credit debt' 
};

class RaitingDashboardWidget extends React.Component{

    ref = React.createRef();

    state = { 
        tableWidth: 0,
        tableHeight: 0,
    };

    timeout = null;

    componentDidMount() {
        this.props.query('');
        window.addEventListener("resize", this.onResize);
        this.onResize();
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
    }

    onResize = () => {
        this.setState({tableWidth: this.ref.current.clientWidth - 22, tableHeight: 322});
    }

    onChange = ({target: {value}}) => {
        if(this.timeout !== null)
            clearTimeout(this.timeout);
        
        this.timeout = setTimeout( () => {
            this.props.query(value);
        }, 500);
    }

    render(){
        return (
            <div className="financial-rating">
                <div className="window">
                    <div className="window-head">
                        <div className="window-title">
                            <i className="window-title__icon icon-bookmark-button"></i>
                            Suppliers financial rating
                        </div>
                        <div className="window-btns">
                            <Pointer className="window-btn window-btn_refresh"><i className="icon-refresh"></i></Pointer>
                            <Pointer className="window-btn window-btn_hide"><i className="icon-angle-down"></i></Pointer>
                            <Pointer className="window-btn window-btn_close"><i className="icon-close"></i></Pointer>
                        </div>
                    </div>
                    
                    <div className="window-content" ref={this.ref}>
                        <div className="financial-rating__content">
                            <div className="window__form">
                                <form>
                                    <div className="window__form-content">
                                        <div className="search-bl">
                                            <input type="text" className="search-bl__input" defaultValue="" onChange={this.onChange}/>
                                            <button type="button" className="search-bl__btn"><i className="icon-search"></i></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            {
                                this.props.list.state === 'loaded' ? 
                                <div className="financial-rating__table">
                                    <Table 
                                        fields={FIELDS} 
                                        data={this.props.list.data} 
                                        cellWidth={this.state.tableWidth / 3.15} 
                                        cellHeight={40} 
                                        headerHeight={40} 
                                        height={322}
                                        header={(title) => <span><i className="icon-arrow-dowble"></i>{title}</span>} 
                                        cell={(value, name) => name === "name" ? <LineBlock title={value}>{value}</LineBlock> : value}
                                        /> 
                                </div>
                                : 
                                <Loading/>
                            }
                        </div>
                    </div>
                </div>
            </div>
            
            
        )
    }
};

const mapStateToProps = (state) => ({
    list: state.dashboard.raiting
});

export default connect(mapStateToProps, 
    (dispatch) => ({
        query: (options) => dispatch(createRequestAction('dashboard', 'getRaiting', [options]))
    }))(RaitingDashboardWidget);