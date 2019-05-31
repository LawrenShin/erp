import React from 'react';
import { connect } from 'react-redux'
import img from '../../assets/img/examples/img_1.jpg';
import {NavLink} from 'react-router-dom';
import Back from '../controls/backbtn';
import { createRequestAction } from '../../actions'
import { Message } from 'semantic-ui-react'

class ViewProduct extends React.Component {
    componentWillMount(){
        this.props.getProduct(this.props.match.params.id)
    }

    render() {
        if(this.props.product && this.props.product.state === 'fail') return <Message color='red'>Couldn't load product</Message>

        return (
        <>
            <div className="page-heading page-heading_product">	
                <div className="page-heading__title">
                    <div className="page-heading__top">
                        <h1 className="h1 h1_product">Product # 1235</h1>
                        <NavLink 
                            to={`/products/edit/${this.props.match.params.id}`} 
                            className="page-heading__icon page-heading__icon_circle">
                                <i className="icon-edit"></i>
                        </NavLink>
                    </div>
                </div>
                <div className="page-heading__navs">								
                    <div className="card-filters-nav">
                        <Back />
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
                                        <label className="box-field__label product-label">Trade mark:</label>
                                        <span className="product-label-val">Infunt</span>
                                    </div>
                                </div>
                                <div className="product-columns__item">
                                    <div className="product-details__item-nowrap">
                                        <label className="box-field__label product-label">Season:</label>
                                        <span className="product-label-val">SS</span>
                                    </div>
                                </div>
                                <div className="product-columns__item">
                                    <div className="product-details__item-nowrap">
                                        <label className="box-field__label product-label">Target: price:</label>
                                        <span className="product-label-val">$1234</span>	
                                    </div>
                                </div>
                                <div className="product-columns__item">
                                    <div className="product-details__item-nowrap">
                                        <label className="box-field__label product-label">Year:</label>
                                        <span className="product-label-val">2019</span>	
                                    </div>
                                </div>
                                <div className="product-columns__item">
                                    <div className="product-details__item-nowrap">
                                        <label className="box-field__label product-label">Collection:</label>
                                        <span className="product-label-val">Весна-Лето 2019</span>
                                    </div>
                                </div>
                                <div className="product-columns__item">									
                                    <div className="product-details__item-nowrap">
                                        <label className="box-field__label product-label">MOQ:</label>
                                        <span className="product-label-val">123</span>
                                    </div>
                                </div>
                                <div className="product-columns__item">
                                    <div className="product-details__item-nowrap">
                                        <label className="box-field__label product-label">Code 1C</label>
                                        <span className="product-label-val">00000004060</span>	
                                    </div>
                                </div>
                                <div className="product-columns__item">
                                    <div className="product-details__item-nowrap">
                                        <label className="box-field__label product-label">Vendor code:</label>
                                        <span className="product-label-val">00000004060</span>
                                    </div>
                                </div>
                                <div className="product-columns__item">
                                    <div className="product-details__item-nowrap">
                                        <label className="box-field__label product-label">Buying manager:</label>
                                        <span className="product-label-val">Nick Sipson</span>
                                    </div>
                                </div>
                                <div className="product-columns__item">																		
                                    <div className="checkbox-elem checkbox-elem_1">
                                        <input type="checkbox" id="checkbox-1" checked />
                                        <label className="checkbox-label" for="checkbox-1">Package</label>
                                    </div>
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
                                    <div className="load-file-picture">
                                        <img src={img} alt="" />
                                    </div>
                                </div>
                                <div className="product-columns-3 product-items">
                                    <div className="product-columns__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Product group:</label>
                                            <span className="product-label-val">Blouse</span>
                                        </div>
                                    </div>
                                    <div className="product-columns__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Gender:</label>
                                            <span className="product-label-val">Female</span>
                                        </div>
                                    </div>
                                    <div className="product-columns__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Age:</label>
                                            <span className="product-label-val">Child</span>
                                        </div>
                                    </div>
                                    <div className="product-columns__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Color:</label>
                                            <span className="product-label-val">Blue</span>
                                        </div>
                                    </div>
                                    <div className="product-columns__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Décor:</label>
                                            <span className="product-label-val">Рюши</span>
                                        </div>
                                    </div>
                                    <div className="product-columns__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Designer:</label>
                                            <span className="product-label-val">Alexander MqQueen</span>
                                        </div>
                                    </div>
                                    <div className="product-columns__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Style name:</label>
                                            <span className="product-label-val">Aisha</span>
                                        </div>
                                    </div>
                                    <div className="product-columns__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Print Ind:</label>
                                            <span className="product-label-val">1234</span>
                                        </div>
                                    </div>
                                    <div className="product-columns__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Print mood:</label>
                                            <span className="product-label-val">1234</span>
                                        </div>
                                    </div>
                                    <div className="product-columns__item">
                                        <div className="product-details__item-nowrap">
                                            <label className="box-field__label product-label">Wearing occasions:</label>
                                            <span className="product-label-val">1234</span>
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
                                        <span className="product-label-val">Блузка детская для девочек</span>
                                    </div>
                                </div>
                                <div className="product-details__item ">
                                    <div className="product-details__item-nowrap">
                                        <label className="box-field__label product-label">Sleeve:</label>
                                        <span className="product-label-val">длинный</span>
                                    </div>
                                </div>
                                <div className="product-details__item">
                                    <div className="product-details__item-nowrap">
                                        <label className="box-field__label product-label">Size range:</label>
                                        <span className="product-label-val">Kids 98-128 6p</span>
                                    </div>
                                </div>
                                <div className="product-details__item">
                                    <div className="product-details__item-nowrap">
                                        <label className="box-field__label product-label">Purpose:</label>
                                        <span className="product-label-val">Для крещения</span>
                                    </div>
                                </div>
                                <div className="product-details__item">
                                    <div className="product-details__item-nowrap">
                                        <label className="box-field__label product-label">Product category:</label>
                                        <span className="product-label-val">Outwear</span>
                                    </div>
                                </div>
                                <div className="product-details__item">
                                    <div className="product-details__item-nowrap">
                                        <label className="box-field__label product-label">Length:</label>
                                        <span className="product-label-val">Выше колена</span>
                                    </div>
                                </div>
                                <div className="product-details__item">
                                    <div className="product-details__item-nowrap">
                                        <label className="box-field__label product-label">Pocket type:</label>
                                        <span className="product-label-val">Внутренние</span>
                                    </div>
                                </div>
                                <div className="product-details__item">
                                    <div className="product-details__item-nowrap">
                                        <label className="box-field__label product-label">Sleeve indicator:</label>
                                        <span className="product-label-val">1234</span>
                                    </div>
                                </div>
                                <div className="product-details__item">
                                    <div className="product-details__item-nowrap">
                                        <label className="box-field__label product-label">Style specialities:</label>
                                        <span className="product-label-val">Без швов</span>
                                    </div>
                                </div>
                                <div className="product-details__item">
                                    <div className="product-details__item-nowrap">
                                        <label className="box-field__label product-label">Level waist:</label>
                                        <span className="product-label-val">Высокий</span>
                                    </div>
                                </div>
                                <div className="product-details__item">
                                    <div className="product-details__item-nowrap">
                                        <label className="box-field__label product-label">Neck type:</label>
                                        <span className="product-label-val">Капюшон</span>
                                    </div>
                                </div>
                                <div className="product-details__item">
                                    <div className="product-details__item-nowrap">
                                        <label className="box-field__label product-label">Additional info:</label>
                                        <span className="product-label-val">123</span>
                                    </div>
                                </div>
                                <div className="product-details__item">
                                    <div className="product-details__item-nowrap">
                                        <label className="box-field__label product-label">Fastener type:</label>
                                        <span className="product-label-val">Без застежки</span>
                                    </div>
                                </div>
                                <div className="product-details__item">
                                    <div className="product-details__item-nowrap">
                                        <label className="box-field__label product-label">Silhouette:</label>
                                        <span className="product-label-val">Classic</span>
                                    </div>
                                </div>
                                <div className="product-details__item">
                                    <div className="product-details__item-nowrap">
                                        <label className="box-field__label product-label">Strap type:</label>
                                        <span className="product-label-val">Без бретелей</span>
                                    </div>
                                </div>
                            </div>

                            <div className="tabs-product">
                                <div className="nav-tab">
                                    <span className="nav-tab__link active">Shell fabric</span>
                                    <span className="nav-tab__link">Padding</span>
                                    <span className="nav-tab__link">Lining</span>
                                    <span className="nav-tab__link">decor fabric</span>
                                    <span className="nav-tab__link">trims</span>
                                </div>
                                <div className="tabs-product__wrap">
                                    <div className="product-details__box">
                                        <div className="product-details__item product-details__item_1">
                                            <div className="product-details__item-nowrap">
                                                <label className="box-field__label product-label">Shell fabric 1:</label>
                                                <span className="product-label-val">Poplin</span>
                                            </div>
                                        </div>
                                        <div className="product-details__item product-details__item_1">
                                            <div className="product-details__item-nowrap">
                                                <label className="box-field__label product-label">Shell fabric 1 weight:</label>
                                                <span className="product-label-val">12%</span>
                                            </div>
                                        </div>
                                        <div className="product-details__item product-details__item_1">
                                            <div className="product-details__item-nowrap">
                                                <label className="box-field__label product-label">Shell fabric 1<br/> composition:</label>
                                                <span className="product-label-val">100%Cotton</span>
                                            </div>
                                        </div>
                                        <div className="product-details__item product-details__item_1">
                                            <div className="product-details__item-nowrap">
                                                <label className="box-field__label product-label">Shell fabric 1<br/> constraction:</label>
                                                <span className="product-label-val">Knit</span>
                                            </div>
                                        </div>
                                        <div className="product-details__item product-details__item_1">
                                            <div className="product-details__item-nowrap">
                                                <label className="box-field__label product-label">Shell fabric 2:</label>
                                                <span className="product-label-val">Poplin</span>
                                            </div>
                                        </div>
                                        <div className="product-details__item product-details__item_1">
                                            <div className="product-details__item-nowrap">
                                                <label className="box-field__label product-label">Shell fabric 2 weight:</label>
                                                <span className="product-label-val">12%</span>
                                            </div>
                                        </div>
                                        <div className="product-details__item product-details__item_1">
                                            <div className="product-details__item-nowrap">
                                                <label className="box-field__label product-label">Shell fabric 2<br/> composition:</label>
                                                <span className="product-label-val">100%Cotton</span>
                                            </div>
                                        </div>
                                        <div className="product-details__item product-details__item_1">
                                            <div className="product-details__item-nowrap">
                                                <label className="box-field__label product-label">Shell fabric 2<br/> constraction:</label>
                                                <span className="product-label-val">Knit</span>
                                            </div>
                                        </div>
                                        <div className="product-details__item product-details__item_1">
                                            <div className="product-details__item-nowrap">
                                                <label className="box-field__label product-label">Shell fabric 3:</label>
                                                <span className="product-label-val">Poplin</span>
                                            </div>
                                        </div>
                                        <div className="product-details__item product-details__item_1">
                                            <div className="product-details__item-nowrap">
                                                <label className="box-field__label product-label">Shell fabric 3 weight:</label>
                                                <span className="product-label-val">12%</span>
                                            </div>
                                        </div>
                                        <div className="product-details__item product-details__item_1">
                                            <div className="product-details__item-nowrap">
                                                <label className="box-field__label product-label">Shell fabric 3<br/> composition:</label>
                                                <span className="product-label-val">100%Cotton</span>
                                            </div>
                                        </div>
                                        <div className="product-details__item product-details__item_1">
                                            <div className="product-details__item-nowrap">
                                                <label className="box-field__label product-label">Shell fabric 3<br/> constraction:</label>
                                                <span className="product-label-val">Knit</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="product-columns product-checkboxes">
                                <div className="product-columns__item product-columns__item_checkboxes">								
                                    <div className="checkbox-elem">
                                        <input type="checkbox" id="checkbox-11" checked />
                                        <label className="checkbox-label" for="checkbox-11">Drip dry</label>
                                    </div>
                                </div>
                                <div className="product-columns__item product-columns__item_checkboxes">								
                                    <div className="checkbox-elem">
                                        <input type="checkbox" id="checkbox-12" />
                                        <label className="checkbox-label" for="checkbox-12">Do not wash</label>
                                    </div>
                                </div>
                                <div className="product-columns__item product-columns__item_checkboxes">								
                                    <div className="checkbox-elem">
                                        <input type="checkbox" id="checkbox-13" checked />
                                        <label className="checkbox-label" for="checkbox-13">Line dry</label>
                                    </div>
                                </div>
                                <div className="product-columns__item product-columns__item_checkboxes">								
                                    <div className="checkbox-elem">
                                        <input type="checkbox" id="checkbox-14" />
                                        <label className="checkbox-label" for="checkbox-14">Machine wash cold</label>
                                    </div>
                                </div>
                                <div className="product-columns__item product-columns__item_checkboxes">								
                                    <div className="checkbox-elem">
                                        <input type="checkbox" id="checkbox-15" />
                                        <label className="checkbox-label" for="checkbox-15">Professional drycleaning</label>
                                    </div>
                                </div>
                                <div className="product-columns__item product-columns__item_checkboxes">								
                                    <div className="checkbox-elem">
                                        <input type="checkbox" id="checkbox-16" />
                                        <label className="checkbox-label" for="checkbox-16">Do not bleach</label>
                                    </div>
                                </div>
                                <div className="product-columns__item product-columns__item_checkboxes">								
                                    <div className="checkbox-elem">
                                        <input type="checkbox" id="checkbox-17" />
                                        <label className="checkbox-label" for="checkbox-17">Do not iron deco</label>
                                    </div>
                                </div>
                                <div className="product-columns__item product-columns__item_checkboxes">								
                                    <div className="checkbox-elem">
                                        <input type="checkbox" id="checkbox-18" checked />
                                        <label className="checkbox-label" for="checkbox-18">Do not dry-clean</label>
                                    </div>
                                </div>
                                <div className="product-columns__item product-columns__item_checkboxes">								
                                    <div className="checkbox-elem">
                                        <input type="checkbox" id="checkbox-19" />
                                        <label className="checkbox-label" for="checkbox-19">Gentle wash up to 30c</label>
                                    </div>
                                </div>
                                <div className="product-columns__item product-columns__item_checkboxes">								
                                    <div className="checkbox-elem">
                                        <input type="checkbox" id="checkbox-20" />
                                        <label className="checkbox-label" for="checkbox-20">Iron up to 200c</label>
                                    </div>
                                </div>
                                <div className="product-columns__item product-columns__item_checkboxes">								
                                    <div className="checkbox-elem">
                                        <input type="checkbox" id="checkbox-21" />
                                        <label className="checkbox-label" for="checkbox-21">Flat dry</label>
                                    </div>
                                </div>
                                <div className="product-columns__item product-columns__item_checkboxes">								
                                    <div className="checkbox-elem">
                                        <input type="checkbox" id="checkbox-22" />
                                        <label className="checkbox-label" for="checkbox-22">Do not iron</label>
                                    </div>
                                </div>
                                <div className="product-columns__item product-columns__item_checkboxes">								
                                    <div className="checkbox-elem">
                                        <input type="checkbox" id="checkbox-23" />
                                        <label className="checkbox-label" for="checkbox-23">Cold iron</label>
                                    </div>
                                </div>
                                <div className="product-columns__item product-columns__item_checkboxes">								
                                    <div className="checkbox-elem">
                                        <input type="checkbox" id="checkbox-24" />
                                        <label className="checkbox-label" for="checkbox-24">Iron steam</label>
                                    </div>
                                </div>
                                <div className="product-columns__item product-columns__item_checkboxes">								
                                    <div className="checkbox-elem">
                                        <input type="checkbox" id="checkbox-25" />
                                        <label className="checkbox-label" for="checkbox-25">Do not tumble dry</label>
                                    </div>
                                </div>
                                <div className="product-columns__item product-columns__item_checkboxes">								
                                    <div className="checkbox-elem">
                                        <input type="checkbox" id="checkbox-26" />
                                        <label className="checkbox-label" for="checkbox-26">Iron on reversed side</label>
                                    </div>
                                </div>
                                <div className="product-columns__item product-columns__item_checkboxes">								
                                    <div className="checkbox-elem">
                                        <input type="checkbox" id="checkbox-27" />
                                        <label className="checkbox-label" for="checkbox-27">Hand wash</label>
                                    </div>
                                </div>
                                <div className="product-columns__item product-columns__item_checkboxes">								
                                    <div className="checkbox-elem">
                                        <input type="checkbox" id="checkbox-28" />
                                        <label className="checkbox-label" for="checkbox-28">Color may fade with light chlorin...</label>
                                    </div>
                                </div>
                                <div className="product-columns__item product-columns__item_checkboxes">								
                                    <div className="checkbox-elem">
                                        <input type="checkbox" id="checkbox-29" />
                                        <label className="checkbox-label" for="checkbox-29">Deco detail sh/be remove before ...</label>
                                    </div>
                                </div>
                                <div className="product-columns__item product-columns__item_checkboxes">								
                                    <div className="checkbox-elem">
                                        <input type="checkbox" id="checkbox-30" />
                                        <label className="checkbox-label" for="checkbox-30">Iron steam on reverse side</label>
                                    </div>
                                </div>
                                <div className="product-columns__item product-columns__item_checkboxes">								
                                    <div className="checkbox-elem">
                                        <input type="checkbox" id="checkbox-31" />
                                        <label className="checkbox-label" for="checkbox-31">Bleach when needed</label>
                                    </div>
                                </div>
                                <div className="product-columns__item product-columns__item_checkboxes">								
                                    <div className="checkbox-elem">
                                        <input type="checkbox" id="checkbox-32" />
                                        <label className="checkbox-label" for="checkbox-32">Do not wring</label>
                                    </div>
                                </div>
                                <div className="product-columns__item product-columns__item_checkboxes">								
                                    <div className="checkbox-elem">
                                        <input type="checkbox" id="checkbox-33" />
                                        <label className="checkbox-label" for="checkbox-33">Any bleach allowed</label>
                                    </div>
                                </div>
                                <div className="product-columns__item product-columns__item_checkboxes">								
                                    <div className="checkbox-elem">
                                        <input type="checkbox" id="checkbox-34" />
                                        <label className="checkbox-label" for="checkbox-34">Machine wash warm</label>
                                    </div>
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
                                <div className="product-details__block product-details__block_1">
                                    <div className="product-details__load_item">								
                                        <div className="box-field">
                                            <label className="box-field__label">Measurement list:</label>
                                            <div className="product-load__line">
                                                <div className="product-load_value">
                                                    <span className="product-load_text" title="">Brand_СезонГод-тема_имя стиля_ML</span>.xls
                                                    <span className="item-load item-load_file">
                                                        <i className="icon-file"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-details__block product-details__block_1">	
                                    <div className="product-details__load_item">								
                                        <div className="box-field">
                                            <label className="box-field__label">Description:</label>
                                            <div className="product-load__line">
                                                <div className="product-load_value">
                                                    <span className="product-load_text" title="">Brand_СезонГод-тема_имя стиля_DESCL</span>.xls
                                                    <span className="item-load item-load_file">
                                                        <i className="icon-file"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-details__block product-details__block_1">
                                    <div className="product-details__load_item">								
                                        <div className="box-field">
                                            <label className="box-field__label">Specification:</label>
                                            <div className="product-load__line">
                                                <div className="product-load_value">
                                                    <span className="product-load_text" title="">Brand_СезонГод-тема_имя стиля_SPEC</span>.xls
                                                    <span className="item-load item-load_file">
                                                        <i className="icon-file"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-details__block product-details__block_1">
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
                                </div>
                                <div className="product-details__block product-details__block_1">
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
                                </div>
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
                                        <span className="product-label-val">123445</span>
                                    </div>
                                </div>
                                <div className="product-details__item product-details__item_2">
                                    <div className="product-details__item-nowrap">
                                        <label className="box-field__label product-label">Vat rate:</label>
                                        <span className="product-label-val">12%</span>
                                    </div>
                                </div>
                                <div className="product-details__item product-details__item_2">
                                    <div className="product-details__item-nowrap">
                                        <label className="box-field__label product-label">Code tnved:</label>
                                        <span className="product-label-val">122455</span>
                                    </div>
                                </div>
                                <div className="product-details__item product-details__item_2">
                                    <div className="product-details__item-nowrap">
                                        <label className="box-field__label product-label">Country origin id:</label>
                                        <span className="product-label-val">122455</span>
                                    </div>
                                </div>
                                <div className="product-details__item product-details__item_2">								
                                    <div className="checkbox-elem">
                                        <input type="checkbox" id="checkbox-111" checked />
                                        <label className="checkbox-label" for="checkbox-111">Weight product</label>
                                    </div>
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
}), dispatch => ({
    getProduct: (id) => dispatch(createRequestAction('product', 'getProduct', [id])),
}))(ViewProduct);