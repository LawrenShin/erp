import React from 'react';
import {connect} from 'react-redux'
import img from '../../assets/img/examples/noimg.jpg';
import {NavLink} from 'react-router-dom';
import Back from '../controls/backbtn';
import {createRequestAction} from '../../actions'
import {Message} from 'semantic-ui-react'
import className from 'classnames';
import Checkbox from '../controls/checkbox'
import ProductsApi from "../../requestor/product";
import {generalStore} from "../../ducks/productSagas/createProduct";
import CommonApi from "../../requestor/common";

class ViewProduct extends React.Component {
    state = {
        filter: [],
    };
    getTechnicalFile = async (id) => {
        const productTechFile = await ProductsApi.getTechnicalFiles(id).then(res => this.setState({techFile: res.results})).catch(e => console.log(e.message));
    };

    getFilters = async () => await ProductsApi.getFilters().then(res => this.setState({filter: res})).catch(e => console.log(e.message));

    componentDidMount() {
        this.props.getProduct(this.props.match.params.id);
        this.getTechnicalFile(this.props.match.params.id);
        this.getFilters();
        const countries = CommonApi.getCountries().then(res => console.log(res.result));
    }

    finder = (heap, needle) => {
        const match = heap.filter(h => h.value === needle)[0];
        if (match && 'text' in match) return match.text;
        return null
    };

    render() {
        if (this.props.product && this.props.product.state === 'fail') return <Message color='red'>Couldn't load
            product</Message>;
        return (
            <>
                <div className="page-heading page-heading_product">
                    <div className="page-heading__title">
                        <div className="page-heading__top">
                            <h1 className="h1 h1_product">Product #{this.props.match.params.id}</h1>
                            <NavLink
                                to={`/products/edit/${this.props.match.params.id}`}
                                className="page-heading__icon page-heading__icon_circle">
                                <i className="icon-edit"></i>
                            </NavLink>
                        </div>
                    </div>
                    <div className="page-heading__navs">
                        <div className="card-filters-nav">
                            <Back/>
                        </div>
                    </div>
                </div>
                <form>
                    <div className="product">
                        <div className="product__item">
                            <div className="product__heading">
                                <i className="product__icon icon-customers"></i>
                                <div className="product__title">general</div>
                            </div>
                            <div className="product-details">
                                <div className="product-columns">
                                    <div className="product-columns__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Name:</label>
                                            <span
                                                className="product-label-val">{this.props.product.data.name}</span>
                                        </div>
                                    </div>
                                    <div className="product-columns__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Theme:</label>
                                            <span
                                                className="product-label-val">{this.props.product.data.theme}</span>
                                        </div>
                                    </div>
                                    <div className="product-columns__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Trade mark:</label>
                                            <span
                                                className="product-label-val">
                                                {this.props.product.data.trade_mark}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="product-columns__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Season:</label>
                                            <span className="product-label-val">{this.props.product.data.season}</span>
                                        </div>
                                    </div>
                                    <div className="product-columns__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Target: price:</label>
                                            <span
                                                className="product-label-val">${this.props.product.data.target_price}</span>
                                        </div>
                                    </div>
                                    <div className="product-columns__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Year:</label>
                                            <span className="product-label-val">{this.props.product.data.year}</span>
                                        </div>
                                    </div>
                                    <div className="product-columns__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Collection:</label>
                                            <span
                                                className="product-label-val">{this.state.filter.collection && this.finder(this.state.filter.collection, this.props.product.data.collection)}</span>
                                        </div>
                                    </div>
                                    <div className="product-columns__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">MOQ:</label>
                                            <span className="product-label-val">{this.props.product.data.moq}</span>
                                        </div>
                                    </div>
                                    <div className="product-columns__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Code 1C</label>
                                            <span className="product-label-val">{this.props.product.data.code}</span>
                                        </div>
                                    </div>
                                    <div className="product-columns__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Vendor code:</label>
                                            <span
                                                className="product-label-val">{this.props.product.data.vendor_code}</span>
                                        </div>
                                    </div>
                                    <div className="product-columns__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Buying manager:</label>
                                            <span
                                                className="product-label-val">{this.state.filter.buying_manager && this.finder(this.state.filter.buying_manager, this.props.product.data.buing_manager)}</span>
                                        </div>
                                    </div>
                                    <div className="product-columns__item">
                                        <Checkbox simple={true}
                                                  defaultChecked={this.props.product.data.package}
                                                  label='Package'/>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="product__item">
                            <div className="product__heading">
                                <i className="product__icon icon-design"></i>
                                <div className="product__title">design</div>
                            </div>
                            <div className="product-details">

                                <div className="product-details__box">
                                    <div className="product-picture">
                                        <div
                                            className={className('load-file-picture', {'-without-padding': !this.props.product.data.main_image})}>
                                            <img
                                                src={this.props.product.data.main_image ? this.props.product.data.main_image : img}/>
                                        </div>
                                    </div>
                                    <div className="product-columns-3 product-items">
                                        <div className="product-columns__item">
                                            <div className="product-details__item-nowrap">
                                                <label className="box-field__label product-label">Product type:</label>
                                                <span
                                                    className="product-label-val">{this.state.filter.product_group && this.finder(this.state.filter.product_group, this.props.product.data.nomenclature_group)}</span>
                                            </div>
                                        </div>
                                        <div className="product-columns__item">
                                            <div className="product-details__item-nowrap">
                                                <label className="box-field__label product-label">Gender:</label>
                                                <span
                                                    className="product-label-val">{this.props.product.data.gender}</span>
                                            </div>
                                        </div>
                                        <div className="product-columns__item">
                                            <div className="product-details__item-nowrap">
                                                <label className="box-field__label product-label">Age:</label>
                                                <span className="product-label-val">{this.props.product.data.age}</span>
                                            </div>
                                        </div>
                                        <div className="product-columns__item">
                                            <div className="product-details__item-nowrap">
                                                <label className="box-field__label product-label">Color:</label>
                                                <span
                                                    className="product-label-val">{this.props.product.data.color}</span>
                                            </div>
                                        </div>
                                        <div className="product-columns__item">
                                            <div className="product-details__item-nowrap">
                                                <label className="box-field__label product-label">Décor:</label>
                                                <span
                                                    className="product-label-val">{this.state.filter.decor && this.finder(this.state.filter.decor, this.props.product.data.decor)}</span>
                                            </div>
                                        </div>
                                        <div className="product-columns__item">
                                            <div className="product-details__item-nowrap">
                                                <label className="box-field__label product-label">Designer:</label>
                                                <span
                                                    className="product-label-val">{this.state.filter.designer && this.finder(this.state.filter.designer, this.props.product.data.designer)}</span>
                                            </div>
                                        </div>
                                        <div className="product-columns__item">
                                            <div className="product-details__item-nowrap">
                                                <label className="box-field__label product-label">Style name:</label>
                                                <span
                                                    className="product-label-val">{this.state.filter.style_name && this.finder(this.state.filter.style_name, this.props.product.data.style)}</span>
                                            </div>
                                        </div>
                                        <div className="product-columns__item">
                                            <div className="product-details__item-nowrap">
                                                <label className="box-field__label product-label">Print Ind:</label>
                                                <span
                                                    className="product-label-val">{this.props.product.data.print_ind}</span>
                                            </div>
                                        </div>
                                        <div className="product-columns__item">
                                            <div className="product-details__item-nowrap">
                                                <label className="box-field__label product-label">Print mood:</label>
                                                <span
                                                    className="product-label-val">{this.state.filter.print_mood && this.finder(this.state.filter.print_mood, this.props.product.data.print_mood)}</span>
                                            </div>
                                        </div>
                                        <div className="product-columns__item">
                                            <div className="product-details__item-nowrap">
                                                <label className="box-field__label product-label">Wearing
                                                    occasions:</label>
                                                <span
                                                    className="product-label-val">{this.state.filter.wearing_occasion && this.finder(this.state.filter.wearing_occasion, this.props.product.data.wearing_occasion)}</span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="product__item">
                            <div className="product__heading">
                                <i className="product__icon icon-tech"></i>
                                <div className="product__title">technical</div>
                            </div>
                            <div className="product-details">
                                <div className="product-details__box">
                                    <div className="product-details__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Product type:</label>
                                            <span className="product-label-val">{this.props.product.data.name}</span>
                                        </div>
                                    </div>
                                    <div className="product-details__item ">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Sleeve:</label>
                                            <span
                                                className="product-label-val">{this.state.filter.sleeve && this.finder(this.state.filter.sleeve, this.props.product.data.sleeve)}</span>
                                        </div>
                                    </div>
                                    <div className="product-details__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Size range:</label>
                                            <span
                                                className="product-label-val">{this.state.filter.size_range && this.finder(this.state.filter.size_range, this.props.product.data.size_grid)}</span>
                                        </div>
                                    </div>
                                    <div className="product-details__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Purpose:</label>
                                            <span
                                                className="product-label-val">{this.state.filter.purpose && this.finder(this.state.filter.purpose, this.props.product.data.purpose)}</span>
                                        </div>
                                    </div>
                                    <div className="product-details__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Product category:</label>
                                            <span
                                                className="product-label-val">{this.props.product.data.category}</span>
                                        </div>
                                    </div>
                                    <div className="product-details__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Length:</label>
                                            <span
                                                className="product-label-val">{this.state.filter.length && this.finder(this.state.filter.length, this.props.product.data.length)}</span>
                                        </div>
                                    </div>
                                    <div className="product-details__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Pocket type:</label>
                                            <span
                                                className="product-label-val">{this.state.filter.pocket_type && this.finder(this.state.filter.pocket_type, this.props.product.data.type_pocket)}</span>
                                        </div>
                                    </div>
                                    {/*<div className="product-details__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Style
                                                specialities:</label>
                                            <span
                                                className="product-label-val">{this.props.product.data.style_specialities}</span>
                                        </div>
                                    </div>*/}
                                    <div className="product-details__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label productч-label">Waist level:</label>
                                            <span
                                                className="product-label-val">{this.state.filter.level_waist && this.finder(this.state.filter.level_waist, this.props.product.data.level_waist)}</span>
                                        </div>
                                    </div>
                                    <div className="product-details__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Neck type:</label>
                                            <span
                                                className="product-label-val">{this.state.filter.neck_type && this.finder(this.state.filter.neck_type, this.props.product.data.kind_neck)}</span>
                                        </div>
                                    </div>
                                    <div className="product-details__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Additional info:</label>
                                            <span
                                                className="product-label-val">{this.props.product.data.additional_nomenclature_description}</span>
                                        </div>
                                    </div>
                                    <div className="product-details__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Fastener type:</label>
                                            <span
                                                className="product-label-val">{this.state.filter.fastener_type && this.finder(this.state.filter.fastener_type, this.props.product.data.kind_fastener)}</span>
                                        </div>
                                    </div>
                                    <div className="product-details__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Shape:</label>
                                            <span
                                                className="product-label-val">{this.state.filter.silhouette && this.finder(this.state.filter.silhouette, this.props.product.data.silhouette)}</span>
                                        </div>
                                    </div>
                                    <div className="product-details__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Strap type:</label>
                                            <span
                                                className="product-label-val">{this.state.filter.strap_type && this.finder(this.state.filter.strap_type, this.props.product.data.kind_strap)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="tabs-product">
                                    <div className="nav-tab">
                                        <span className="nav-tab__link active">Shell fabric</span>
                                        {/*<span className="nav-tab__link">Padding</span>
                                    <span className="nav-tab__link">Lining</span>
                                    <span className="nav-tab__link">decor fabric</span>
                                    <span className="nav-tab__link">trims</span>*/}
                                    </div>
                                    <div className="tabs-product__wrap">
                                        <div className="product-details__box">
                                            <div className="product-details__item product-details__item_1">
                                                <div className="product-details__item-nowrap">
                                                    <label className="box-field__label product-label">Shell fabric
                                                        1:</label>
                                                    <span
                                                        className="product-label-val">{this.state.filter.shell_fabric && this.finder(this.state.filter.shell_fabric, this.props.product.data.shell_fabric_1)}</span>
                                                </div>
                                            </div>
                                            <div className="product-details__item product-details__item_1">
                                                <div className="product-details__item-nowrap">
                                                    <label className="box-field__label product-label">Shell fabric 1
                                                        weight:</label>
                                                    <span
                                                        className="product-label-val">{this.state.filter.weight && this.finder(this.state.filter.weight, +this.props.product.data.shell_fabric_1_weight)}</span>
                                                </div>
                                            </div>
                                            <div className="product-details__item product-details__item_1">
                                                <div className="product-details__item-nowrap">
                                                    <label className="box-field__label product-label">Shell fabric
                                                        1<br/> composition:</label>
                                                    <span
                                                        className="product-label-val">{this.state.filter.composition && this.finder(this.state.filter.composition, this.props.product.data.shell_fabric_1_composition)}</span>
                                                </div>
                                            </div>
                                            <div className="product-details__item product-details__item_1">
                                                <div className="product-details__item-nowrap">
                                                    <label className="box-field__label product-label">Shell fabric
                                                        1<br/> constraction:</label>
                                                    <span
                                                        className="product-label-val">{this.state.filter.construction && this.finder(this.state.filter.construction, this.props.product.data.shell_fabric_1_construction)}</span>
                                                </div>
                                            </div>
                                            <div className="product-details__item product-details__item_1">
                                                <div className="product-details__item-nowrap">
                                                    <label className="box-field__label product-label">Shell fabric
                                                        2:</label>
                                                    <span
                                                        className="product-label-val">{this.state.filter.shell_fabric && this.finder(this.state.filter.shell_fabric, this.props.product.data.shell_fabric_2)}</span>
                                                </div>
                                            </div>
                                            <div className="product-details__item product-details__item_1">
                                                <div className="product-details__item-nowrap">
                                                    <label className="box-field__label product-label">Shell fabric 2
                                                        weight:</label>
                                                    <span
                                                        className="product-label-val">{this.state.filter.weight && this.finder(this.state.filter.weight, +this.props.product.data.shell_fabric_2_weight)}</span>
                                                </div>
                                            </div>
                                            <div className="product-details__item product-details__item_1">
                                                <div className="product-details__item-nowrap">
                                                    <label className="box-field__label product-label">Shell fabric
                                                        2<br/> composition:</label>
                                                    <span
                                                        className="product-label-val">{this.state.filter.composition && this.finder(this.state.filter.composition, this.props.product.data.shell_fabric_2_composition)}</span>
                                                </div>
                                            </div>
                                            <div className="product-details__item product-details__item_1">
                                                <div className="product-details__item-nowrap">
                                                    <label className="box-field__label product-label">Shell fabric
                                                        2<br/> constraction:</label>
                                                    <span
                                                        className="product-label-val">{this.state.filter.construction && this.finder(this.state.filter.construction, this.props.product.data.shell_fabric_2_construction)}</span>
                                                </div>
                                            </div>
                                            <div className="product-details__item product-details__item_1">
                                                <div className="product-details__item-nowrap">
                                                    <label className="box-field__label product-label">Shell fabric
                                                        3:</label>
                                                    <span
                                                        className="product-label-val">{this.state.filter.shell_fabric && this.finder(this.state.filter.shell_fabric, this.props.product.data.shell_fabric_3)}</span>
                                                </div>
                                            </div>
                                            <div className="product-details__item product-details__item_1">
                                                <div className="product-details__item-nowrap">
                                                    <label className="box-field__label product-label">Shell fabric 3
                                                        weight:</label>
                                                    <span
                                                        className="product-label-val">{this.state.filter.weight && this.finder(this.state.filter.weight, +this.props.product.data.shell_fabric_3_weight)}</span>
                                                </div>
                                            </div>
                                            <div className="product-details__item product-details__item_1">
                                                <div className="product-details__item-nowrap">
                                                    <label className="box-field__label product-label">Shell fabric
                                                        3<br/> composition:</label>
                                                    <span
                                                        className="product-label-val">{this.state.filter.composition && this.finder(this.state.filter.composition, this.props.product.data.shell_fabric_3_composition)}</span>
                                                </div>
                                            </div>
                                            <div className="product-details__item product-details__item_1">
                                                <div className="product-details__item-nowrap">
                                                    <label className="box-field__label product-label">Shell fabric
                                                        3<br/> constraction:</label>
                                                    <span
                                                        className="product-label-val">{this.state.filter.construction && this.finder(this.state.filter.construction, this.props.product.data.shell_fabric_3_construction)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="product-columns product-checkboxes" style={{display: 'none'}}>
                                    <div className="product-columns__item product-columns__item_checkboxes">
                                        <Checkbox simple={true} label='Drip dry'/>
                                    </div>
                                    <div className="product-columns__item product-columns__item_checkboxes">
                                        <Checkbox simple={true} label='Do not wash'/>
                                    </div>
                                    <div className="product-columns__item product-columns__item_checkboxes">
                                        <Checkbox simple={true} label='Line dry'/>
                                    </div>
                                    <div className="product-columns__item product-columns__item_checkboxes">
                                        <Checkbox simple={true} label='Machine wash cold'/>
                                    </div>
                                    <div className="product-columns__item product-columns__item_checkboxes">
                                        <Checkbox simple={true} label='Professional drycleaning'/>
                                    </div>
                                    <div className="product-columns__item product-columns__item_checkboxes">
                                        <Checkbox simple={true} label='Do not bleach'/>
                                    </div>
                                    <div className="product-columns__item product-columns__item_checkboxes">
                                        <Checkbox simple={true} label='Do not iron deco'/>
                                    </div>
                                    <div className="product-columns__item product-columns__item_checkboxes">
                                        <Checkbox simple={true} label='Do not dry-clean'/>
                                    </div>
                                    <div className="product-columns__item product-columns__item_checkboxes">
                                        <Checkbox simple={true} label='Gentle wash up to 30c'/>
                                    </div>
                                    <div className="product-columns__item product-columns__item_checkboxes">
                                        <Checkbox simple={true} label='Iron up to 200c'/>
                                    </div>
                                    <div className="product-columns__item product-columns__item_checkboxes">
                                        <Checkbox simple={true} label='Flat dry'/>
                                    </div>
                                    <div className="product-columns__item product-columns__item_checkboxes">
                                        <Checkbox simple={true} label='Do not iron'/>
                                    </div>
                                    <div className="product-columns__item product-columns__item_checkboxes">
                                        <Checkbox simple={true} label='Cold iron'/>
                                    </div>
                                    <div className="product-columns__item product-columns__item_checkboxes">
                                        <Checkbox simple={true} label='Iron steam'/>
                                    </div>
                                    <div className="product-columns__item product-columns__item_checkboxes">
                                        <Checkbox simple={true} label='Do not tumble dry'/>
                                    </div>
                                    <div className="product-columns__item product-columns__item_checkboxes">
                                        <Checkbox simple={true} label='Iron on reversed side'/>
                                    </div>
                                    <div className="product-columns__item product-columns__item_checkboxes">
                                        <Checkbox simple={true} label='Hand wash'/>
                                    </div>
                                    <div className="product-columns__item product-columns__item_checkboxes">
                                        <Checkbox simple={true} label='Color may fade with light chlorin...'/>
                                    </div>
                                    <div className="product-columns__item product-columns__item_checkboxes">
                                        <Checkbox simple={true} label='Deco detail sh/be remove before ...'/>
                                    </div>
                                    <div className="product-columns__item product-columns__item_checkboxes">
                                        <Checkbox simple={true} label='Iron steam on reverse side'/>
                                    </div>
                                    <div className="product-columns__item product-columns__item_checkboxes">
                                        <Checkbox simple={true} label='Bleach when needed'/>
                                    </div>
                                    <div className="product-columns__item product-columns__item_checkboxes">
                                        <Checkbox simple={true} label='Do not wring'/>
                                    </div>
                                    <div className="product-columns__item product-columns__item_checkboxes">
                                        <Checkbox simple={true} label='Any bleach allowed'/>
                                    </div>
                                    <div className="product-columns__item product-columns__item_checkboxes">
                                        <Checkbox simple={true} label='Machine wash warm'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="product__item">
                            <div className="product__heading">
                                <i className="product__icon icon-technical-files"></i>
                                <div className="product__title">technical files</div>
                            </div>
                            <div className="product-details">
                                <div className="product-columns-3">
                                    {this.state.techFile && this.state.techFile.map((step, index) => (
                                        <div className="product-details__block product-details__block_1" key={index}>
                                            <div className="product-details__load_item">
                                                <div className="box-field">
                                                    <label className="box-field__label">
                                                        {step.type_file === 'ML' && 'Measurement list'}
                                                        {step.type_file === 'DESC' && 'Description'}
                                                        {step.type_file === 'SPEC' && 'Specification'}
                                                    </label>
                                                    <div className="product-load__line">
                                                        <div className="product-load_value">
                                                            <span className="product-load_text" title="">
                                                                {step.file.slice(step.file.lastIndexOf("/") + 1, step.file.lastIndexOf("."))}
                                                            </span>
                                                            <a href={step.file} className="item-load item-load_file"><i
                                                                className="icon-file"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {/*<div className="product-details__block product-details__block_1">
                                        <div className="product-details__load_item">
                                            <div className="box-field">
                                                <label className="box-field__label">Images:</label>
                                            </div>
                                            <div className="product-load-items">
                                                <div className="product-load__line">
                                                    <div className="product-load_value">
                                                        <span className="product-load_text" title="">Brand_СезонГод-тема_имя стиля_artworks 1</span>.jpg
                                                        <span className="item-load item-load_file">
                                                        <i className="icon-file"></i>
                                                    </span>
                                                    </div>
                                                </div>
                                                <div className="product-load__line">
                                                    <div className="product-load_value">
                                                        <span className="product-load_text" title="">Brand_СезонГод-тема_имя стиля_artworks 1</span>.jpg
                                                        <span className="item-load item-load_file">
                                                        <i className="icon-file"></i>
                                                    </span>
                                                    </div>
                                                </div>
                                                <div className="product-load__line">
                                                    <div className="product-load_value">
                                                        <span className="product-load_text" title="">Brand_СезонГод-тема_имя стиля_artworks 1</span>.jpg
                                                        <span className="item-load item-load_file">
                                                        <i className="icon-file"></i>
                                                    </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>*/}
                                    {/*<div className="product-details__block product-details__block_1">
                                        <div className="product-details__load_item">

                                            <div className="box-field">
                                                <label className="box-field__label">Vector files:</label>
                                            </div>
                                            <div className="product-load-items">
                                                <div className="product-load__line">
                                                    <div className="product-load_value">
                                                        <span className="product-load_text" title="">Brand_СезонГод-тема_имя стиля_artworks 1</span>.jpg
                                                        <span className="item-load item-load_file">
                                                        <i className="icon-file"></i>
                                                    </span>
                                                    </div>
                                                </div>
                                                <div className="product-load__line">
                                                    <div className="product-load_value">
                                                        <span className="product-load_text" title="">Brand_СезонГод-тема_имя стиля_artworks 1</span>.jpg
                                                        <span className="item-load item-load_file">
                                                        <i className="icon-file"></i>
                                                    </span>
                                                    </div>
                                                </div>
                                                <div className="product-load__line">
                                                    <div className="product-load_value">
                                                        <span className="product-load_text" title="">Brand_СезонГод-тема_имя стиля_artworks 1</span>.jpg
                                                        <span className="item-load item-load_file">
                                                        <i className="icon-file"></i>
                                                    </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>*/}
                                </div>
                            </div>
                        </div>

                        <div className="product__item">
                            <div className="product__heading">
                                <i className="product__icon icon-logostics"></i>
                                <div className="product__title">logistics</div>
                            </div>
                            <div className="product-details">
                                <div className="product-details__box">
                                    <div className="product-details__item product-details__item_2">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Number gtd:</label>
                                            <span
                                                className="product-label-val">{this.props.product.data.number_gtd}</span>
                                        </div>
                                    </div>
                                    <div className="product-details__item product-details__item_2">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Vat rate:</label>
                                            <span
                                                className="product-label-val">{this.props.product.data.vat_rate}</span>
                                        </div>
                                    </div>
                                    <div className="product-details__item product-details__item_2">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Code tnved:</label>
                                            <span
                                                className="product-label-val">{this.state.filter.code_tnved && this.finder(this.state.filter.code_tnved, this.props.product.data.code_tnved)}</span>
                                        </div>
                                    </div>
                                    <div className="product-details__item product-details__item_2">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Country origin id:</label>
                                            <span className="product-label-val">{this.props.product.data.country}</span>
                                        </div>
                                    </div>
                                    <div className="product-details__item product-details__item_2">
                                        <Checkbox simple={true}
                                                  checked={this.props.product.data.is_weight ? true : false}
                                                  label='Weight product'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        )
    }
}

export default connect(state => ({
    product: state.products.product
    //filter: state.products.filters
}), dispatch => ({
    getProduct: (id) => dispatch(createRequestAction('product', 'getProduct', [id])),
}))(ViewProduct);