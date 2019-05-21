import React, {Component} from 'react';
import graph from '../../assets/img/graph.jpg';
import Pointer from '../controls/pointer';
import Loading from '../helpers/loading';
import {connect} from 'react-redux';
import {renamedDashboard} from '../../selectors/dashboard';
import {createAction, createRequestAction} from '../../actions';
import RaitingWidget from './widgets/raiting';
import PackingListWidget from './widgets/packingList';

import WavesChart from '../charts/WavesChart';
import WeeklyPaymentsComponent from './widgets/WeeklyPaymentsComponent';
import ReconsiderPaymentTerms from './widgets/ReconsiderPaymentTerms';

class Dashboard extends Component {
    state = {
        wavesWidth: 0,
        areas: [{areaName: 'China', strokeColor: 'rgb(105, 197, 216)', fillColor: 'url(#colorUv)'}, {areaName: 'Bangladesh', strokeColor: 'rgb(28, 94, 151)', fillColor: 'url(#colorPv)'}]
    }

    componentDidMount() {
        this.props.clearOptions();
        this.props.getWeeklyPayments();
        this.props.getReconsiderTerms();
        this.setState({wavesWidth: this.ref.current.clientWidth - 60});
        window.addEventListener("resize", this.onResize);
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.onResize);
    }

    onResize = () => {
        this.setState({wavesWidth: this.ref.current.clientWidth - 60});
    }
    
    updateOptions = (filter, value) => {
        this.props.setOptions({
            ...this.props.options,
            [filter]: value
        });
    }

    ref = React.createRef();

    render(){
        return(
            <>
                <div className="page-heading page-heading_full page-heading_dashboard">
                    <div className="page-heading__title">
                        <div className="page-heading__top">
                            <h1 className="h1">Dashboard</h1>
                        </div>
                        <h2 className="page-subtitle">Payment manager</h2>
                    </div>
                </div>

                <div className="info-box">
                    <div className="info-msg info-msg_col-2">
                        <div className="info-msg__icon-box">
                            <div className="info-msg__icon">
                                <i className="icon-payment-history"></i>
                            </div>
                        </div>
                        {this.props.weeklyPayments.state === 'loaded' ? 
                            <WeeklyPaymentsComponent data={this.props.weeklyPayments.data} />
                        :
                            <Loading />
                        }
                    </div>
                    {this.props.reconsiderTerms.state === 'loaded' ? 
                        <ReconsiderPaymentTerms data={this.props.reconsiderTerms.data} />
                    :
                        <Loading />
                    }
                    <div className="info-msg">
                        <div className="info-msg__icon-box">
                            <div className="info-msg__icon">
                                <i className="icon-warning"></i>
                            </div>
                        </div>
                        <div className="info-msg__content">
                            <div className="info-msg__head">
                                <div className="info-msg__title">Please don’t forget adout air shipment credit note</div>
                            </div>
                        </div>
                    </div>
                </div>    

                <div className="flex-block dashboard__flex-block">
                    <div className="graph-box">
                        <div className="window">
                            <div className="window-head">
                                <div className="window-title">
                                    <i className="window-title__icon icon-analytics"></i>
                                    Payment terms analytics
                                </div>
                                <div className="window-btns">
                                    <Pointer className="window-btn window-btn_refresh"><i className="icon-refresh"></i></Pointer>
                                    <Pointer className="window-btn window-btn_hide"><i className="icon-angle-down"></i></Pointer>
                                    <Pointer className="window-btn window-btn_close"><i className="icon-close"></i></Pointer>
                                </div>
                            </div>
                            <div className="window-content" ref={this.ref}>
                                <div className="graph dashboard__graph">
                                    <WavesChart width={this.state.wavesWidth} areas={this.state.areas} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <RaitingWidget />                   
                </div>

                <PackingListWidget />
            </>
        );
    }
}

const mapStateToProps = ({ dashboard }) => ({
    options: dashboard.options,
    weeklyPayments: dashboard.weeklyPayments,
    reconsiderTerms: dashboard.reconsiderTerms
})

export default connect(mapStateToProps, 
    (dispatch) => ({
        clearOptions: (type = null) => dispatch(createAction('CLEAR_OPTIONS', {type})),
        getWeeklyPayments: () => dispatch(createRequestAction('dashboard', 'getWeeklyPayments')),
        getReconsiderTerms: () => dispatch(createRequestAction('dashboard', 'getReconsiderTerms'))
    }))(Dashboard);