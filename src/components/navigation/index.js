import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import quotation from '../../assets/quotation.svg';
import styled from 'styled-components';
import UserProfile from '../header/UserProfile';

const navLinks = [
    {
        linkName: 'Dashboard',
        iconPosition: { 'objectPosition': '0 0px' }
    }, 
    // {
    //     linkName: 'Customers',
    //     iconPosition: { 'objectPosition': '0 -21px' },
    //     hideForRoles: ['supplier']
    // }, 
    {
        linkName: 'Suppliers',
        iconPosition: { 'objectPosition': '0 -45px' },
        hideForRoles: ['supplier']
    }, 
    // {
    //     linkName: 'Messages',
    //     iconPosition: { 'objectPosition': '0 -65px' }
    // }, 
    // {
    //     linkName: 'Orders',
    //     iconPosition: { 'objectPosition': '0 -87px' }
    // }, 
    {
        linkName: 'Products',
        iconPosition: { 'objectPosition': '0 -108px' },
        hideForRoles: ['supplier']
    }, 
    // {
    //     linkName: 'Analytics',
    //     iconPosition: { 'objectPosition': '0 -137px' },
    //     hideForRoles: ['supplier']
    // }
];
    const Quotation = styled.i`
        margin-top: -4px;
        margin-right: 8px;
        width: 30px;
        text-align: center;
        font-size: 20px;
        filter: invert(100%);
    `;

    class OrdersComponent extends React.Component {
        state = {
            active: this.props.show
        }

        static defaultProps = {
            onClick: () => {}
        }

        click = () => {
            this.setState(({active}) => ({active: !active}), () => {
                if(this.state.active) 
                    this.props.dispatch({type: 'SHOW_ORDERS_MENU'}); 
                else 
                    this.props.dispatch({type: 'HIDE_ORDERS_MENU'}); 
                    this.props.onClick(true);
                });
        }

        render() {
            const {active} = this.state;

            return (
                <>
                    <a href="javascript:void(0)" className={`${active ? 'active' : ''}`} onClick={this.click}><i className="icon-orders"></i><span>Orders</span></a>
                    {active ?
                        <ul>
                            <li>
                                <NavLink to="/orders/suppliers">Suppliers Orders</NavLink >
                            </li>
                            <li>
                                <NavLink to="/orders/customers">Customer Orders</NavLink >
                            </li>
                        </ul> : 
                    null}
                </>
            );
        }
    }

    const Orders = connect((state) => ({
        show: state.common.showOrdersMenu
    }))(OrdersComponent);

    class Navigation extends React.Component {
        state = {
            active: true
        }

        render(){ 
            const {role} = this.props;
            const {active} = this.state;

            return (
                <nav className="main-menu">
                    <UserProfile />
                    <ul>
                        {navLinks.filter( ({hideForRoles}) => !hideForRoles || !hideForRoles.includes(role)).map((link) => ( 
                            <li key={link.linkName}>
                                {
                                    link.linkName === 'Orders' && role === 'manager' ?
                                        <Orders onClick={(active) => this.setState({active: !active})}/>
                                    :
                                        <NavLink 
                                            activeClassName={active && `active` || ''}
                                            to={`/${link.linkName.toLowerCase()}`}>
                                                    <i className={`icon-${link.linkName.toLowerCase()}`}></i>
                                                    <span>{link.linkName}</span>
                                        </NavLink>                        
                                }
                            </li>
                        ))}
                        <li key={'quotation'}>
                            <NavLink 
                                activeClassName={`active`}
                                to={`/quotations`}>
                                        <Quotation><img src={quotation} width="24" height="24" /></Quotation>
                                        <span>Quotation</span>
                            </NavLink>                        
                        </li>
                    </ul>
                </nav>
            );
        }
    } 

const mapStateToProps = (state) => ({
    auth: state.auth,
    role: state.auth.role
})

export default connect(mapStateToProps)(Navigation);