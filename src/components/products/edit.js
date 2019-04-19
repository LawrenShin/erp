import React from 'react';
import img from '../../assets/img/examples/img_1.jpg';
import Back from '../controls/backbtn';

class EditProduct extends React.Component {
    render() {
        return (
            <>
                <div className="page-heading page-heading_product">	
                    <div className="page-heading__title">
                        <div className="page-heading__top">
                            <h1 className="h1 h1_product">Product # 1235</h1>
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
                                        <div className="box-field">
                                            <label className="box-field__label">Trade mark:</label>
                                            <input type="text" className="box-field__input" />
                                        </div>
                                    </div>
                                    <div className="product-columns__item">
                                        <div className="select-elem">
                                            <label className="box-field__label">Season:</label>
                                            <div className="ui fluid selection dropdown">
                                                <input type="hidden" />
                                                <div className="default text">SS</div>
                                                <i className="dropdown icon"></i>
                                                <div className="menu">
                                                    <div className="item" data-value="af">SS</div>
                                                    <div className="item active" data-value="ax">offline</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-columns__item">
                                        <div className="select-elem">
                                            <label className="box-field__label">Target: price:</label>
                                            <div className="ui fluid selection dropdown">
                                                <input type="hidden" />
                                                <div className="default text">$1234</div>
                                                <i className="dropdown icon"></i>
                                                <div className="menu">
                                                    <div className="item" data-value="af">$1234</div>
                                                    <div className="item active" data-value="ax">offline</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-columns__item">
                                        <div className="select-elem">
                                            <label className="box-field__label">Year:</label>
                                            <div className="ui fluid selection dropdown">
                                                <input type="hidden" />
                                                <div className="default text">2019</div>
                                                <i className="dropdown icon"></i>
                                                <div className="menu">
                                                    <div className="item" data-value="af">2019</div>
                                                    <div className="item active" data-value="ax">offline</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-columns__item">
                                        <div className="select-elem">
                                            <label className="box-field__label">Collection:</label>
                                            <div className="ui fluid selection dropdown">
                                                <input type="hidden" />
                                                <div className="default text">Весна-Лето 2019</div>
                                                <i className="dropdown icon"></i>
                                                <div className="menu">
                                                    <div className="item" data-value="af">Весна-Лето 2019</div>
                                                    <div className="item active" data-value="ax">offline</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-columns__item">									
                                        <div className="box-field">
                                            <label className="box-field__label">MOQ:</label>
                                            <div className="box-field_two">
                                                <span className="box-field__smalllabel">From</span>
                                                <input type="text" className="box-field__input" />
                                                <span className="box-field__smalllabel">to</span>
                                                <input type="text" className="box-field__input" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-columns__item">
                                        <div className="box-field">
                                            <label className="box-field__label">Code 1C</label>
                                            <div className="box-field__results">00000004060</div>
                                        </div>
                                    </div>
                                    <div className="product-columns__item">
                                        <div className="box-field">
                                            <label className="box-field__label">Vendor code:</label>
                                            <div className="box-field__results">00000004060</div>
                                        </div>
                                    </div>
                                    <div className="product-columns__item">
                                        <div className="select-elem">
                                            <label className="box-field__label">Buying manager:</label>
                                            <div className="ui fluid selection dropdown">
                                                <input type="hidden" />
                                                <div className="default text">Nick Sipson</div>
                                                <i className="dropdown icon"></i>
                                                <div className="menu">
                                                    <div className="item" data-value="af">Nick Sipson</div>
                                                    <div className="item active" data-value="ax">offline</div>
                                                </div>
                                            </div>
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
                                        <div className="box-field">
                                            <label className="box-field__label">Change picture</label>
                                            <label className="load-file load-file-design">
                                                <span className="box-field__input load-file__input"></span>
                                                <i className="load-file__icon load-file__icon_1 icon-upload"></i>
                                                <input type="file" className="load-file__file" />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="product-columns-3 product-items">
                                        <div className="product-columns__item">
                                            <div className="select-elem">
                                                <label className="box-field__label">Product group:</label>
                                                <div className="ui fluid selection dropdown">
                                                    <input type="hidden" />
                                                    <div className="default text">Blouse</div>
                                                    <i className="dropdown icon"></i>
                                                    <div className="menu">
                                                        <div className="item" data-value="af">Blouse</div>
                                                        <div className="item active" data-value="ax">offline</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-columns__item">
                                            <div className="select-elem">
                                                <label className="box-field__label">Gender:</label>
                                                <div className="ui fluid selection dropdown">
                                                    <input type="hidden" />
                                                    <div className="default text">Female</div>
                                                    <i className="dropdown icon"></i>
                                                    <div className="menu">
                                                        <div className="item" data-value="af">Female</div>
                                                        <div className="item active" data-value="ax">offline</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-columns__item">
                                            <div className="select-elem">
                                                <label className="box-field__label">Age:</label>
                                                <div className="ui fluid selection dropdown">
                                                    <input type="hidden" />
                                                    <div className="default text">Child</div>
                                                    <i className="dropdown icon"></i>
                                                    <div className="menu">
                                                        <div className="item" data-value="af">Child</div>
                                                        <div className="item active" data-value="ax">offline</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-columns__item">
                                            <div className="select-elem">
                                                <label className="box-field__label">Color:</label>
                                                <div className="ui fluid selection dropdown">
                                                    <input type="hidden" />
                                                    <div className="default text">Blue</div>
                                                    <i className="dropdown icon"></i>
                                                    <div className="menu">
                                                        <div className="item" data-value="af">Blue</div>
                                                        <div className="item active" data-value="ax">offline</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-columns__item">
                                            <div className="select-elem">
                                                <label className="box-field__label">Décor:</label>
                                                <div className="ui fluid selection dropdown">
                                                    <input type="hidden" />
                                                    <div className="default text">Рюши</div>
                                                    <i className="dropdown icon"></i>
                                                    <div className="menu">
                                                        <div className="item" data-value="af">Рюши</div>
                                                        <div className="item active" data-value="ax">offline</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-columns__item">
                                            <div className="select-elem">
                                                <label className="box-field__label">Designer:</label>
                                                <div className="ui fluid selection dropdown">
                                                    <input type="hidden" />
                                                    <div className="default text">Alexander MqQueen</div>
                                                    <i className="dropdown icon"></i>
                                                    <div className="menu">
                                                        <div className="item" data-value="af">Alexander MqQueen</div>
                                                        <div className="item active" data-value="ax">offline</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-columns__item">
                                            <div className="select-elem">
                                                <label className="box-field__label">Style name:</label>
                                                <div className="ui fluid selection dropdown">
                                                    <input type="hidden" />
                                                    <div className="default text">Aisha</div>
                                                    <i className="dropdown icon"></i>
                                                    <div className="menu">
                                                        <div className="item" data-value="af">Aisha</div>
                                                        <div className="item active" data-value="ax">offline</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-columns__item">
                                            <div className="select-elem">
                                                <label className="box-field__label">Print Ind:</label>
                                                <div className="ui fluid selection dropdown">
                                                    <input type="hidden" />
                                                    <div className="default text"></div>
                                                    <i className="dropdown icon"></i>
                                                    <div className="menu">
                                                        <div className="item" data-value="af">2019</div>
                                                        <div className="item active" data-value="ax">offline</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-columns__item">
                                            <div className="select-elem">
                                                <label className="box-field__label">Print mood:</label>
                                                <div className="ui fluid selection dropdown">
                                                    <input type="hidden" />
                                                    <div className="default text">1234</div>
                                                    <i className="dropdown icon"></i>
                                                    <div className="menu">
                                                        <div className="item" data-value="af">1234</div>
                                                        <div className="item active" data-value="ax">offline</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-columns__item">
                                            <div className="select-elem">
                                                <label className="box-field__label">Wearing occasions:</label>
                                                <div className="ui fluid selection dropdown">
                                                    <input type="hidden" />
                                                    <div className="default text">1234</div>
                                                    <i className="dropdown icon"></i>
                                                    <div className="menu">
                                                        <div className="item" data-value="af">1234</div>
                                                        <div className="item active" data-value="ax">offline</div>
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
                                <i className="product__icon icon-tech"></i>
                                <div className="product__title">technical</div>
                            </div>
                            <div className="product-details">
                                <div className="product-details__box">
                                    <div className="product-details__item">
                                        <div className="select-elem">
                                            <label className="box-field__label">Product type:</label>
                                            <div className="ui fluid selection dropdown">
                                                <input type="hidden" />
                                                <div className="default text">Блузка детская для девочек</div>
                                                <i className="dropdown icon"></i>
                                                <div className="menu">
                                                    <div className="item" data-value="af">Блузка детская для девочек</div>
                                                    <div className="item active" data-value="ax">offline</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-details__item">
                                        <div className="select-elem">
                                            <label className="box-field__label">Sleeve:</label>
                                            <div className="ui fluid selection dropdown">
                                                <input type="hidden" />
                                                <div className="default text">длинный</div>
                                                <i className="dropdown icon"></i>
                                                <div className="menu">
                                                    <div className="item" data-value="af">длинный</div>
                                                    <div className="item active" data-value="ax">offline</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-details__item">
                                        <div className="select-elem">
                                            <label className="box-field__label">Size range:</label>
                                            <div className="ui fluid selection dropdown">
                                                <input type="hidden" />
                                                <div className="default text">Kids 98-128 6p</div>
                                                <i className="dropdown icon"></i>
                                                <div className="menu">
                                                    <div className="item" data-value="af">Kids 98-128 6p</div>
                                                    <div className="item active" data-value="ax">offline</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-details__item">
                                        <div className="select-elem">
                                            <label className="box-field__label">Purpose:</label>
                                            <div className="ui fluid selection dropdown">
                                                <input type="hidden" />
                                                <div className="default text">Для крещения</div>
                                                <i className="dropdown icon"></i>
                                                <div className="menu">
                                                    <div className="item" data-value="af">Рюши</div>
                                                    <div className="item active" data-value="ax">offline</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-details__item">
                                        <div className="select-elem">
                                            <label className="box-field__label">Product category:</label>
                                            <div className="ui fluid selection dropdown">
                                                <input type="hidden" />
                                                <div className="default text">Outwear</div>
                                                <i className="dropdown icon"></i>
                                                <div className="menu">
                                                    <div className="item" data-value="af">Outwear</div>
                                                    <div className="item active" data-value="ax">offline</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-details__item">
                                        <div className="select-elem">
                                            <label className="box-field__label">Length:</label>
                                            <div className="ui fluid selection dropdown">
                                                <input type="hidden" />
                                                <div className="default text">Выше  колена</div>
                                                <i className="dropdown icon"></i>
                                                <div className="menu">
                                                    <div className="item" data-value="af">Выше  колена</div>
                                                    <div className="item active" data-value="ax">offline</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-details__item">
                                        <div className="select-elem">
                                            <label className="box-field__label">Pocket type:</label>
                                            <div className="ui fluid selection dropdown">
                                                <input type="hidden" />
                                                <div className="default text">Внутренние</div>
                                                <i className="dropdown icon"></i>
                                                <div className="menu">
                                                    <div className="item" data-value="af">Внутренние</div>
                                                    <div className="item active" data-value="ax">offline</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-details__item">
                                        <div className="select-elem">
                                            <label className="box-field__label">Sleeve indicator:</label>
                                            <div className="ui fluid selection dropdown">
                                                <input type="hidden" />
                                                <div className="default text">1234</div>
                                                <i className="dropdown icon"></i>
                                                <div className="menu">
                                                    <div className="item" data-value="af">1234</div>
                                                    <div className="item active" data-value="ax">offline</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-details__item">
                                        <div className="select-elem">
                                            <label className="box-field__label">Style specialities:</label>
                                            <div className="ui fluid selection dropdown">
                                                <input type="hidden" />
                                                <div className="default text">Без швов</div>
                                                <i className="dropdown icon"></i>
                                                <div className="menu">
                                                    <div className="item" data-value="af">Без швов</div>
                                                    <div className="item active" data-value="ax">offline</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-details__item">
                                        <div className="select-elem">
                                            <label className="box-field__label">Level waist:</label>
                                            <div className="ui fluid selection dropdown">
                                                <input type="hidden" />
                                                <div className="default text">Высокий</div>
                                                <i className="dropdown icon"></i>
                                                <div className="menu">
                                                    <div className="item" data-value="af">Высокий</div>
                                                    <div className="item active" data-value="ax">offline</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-details__item">
                                        <div className="select-elem">
                                            <label className="box-field__label">Neck type:</label>
                                            <div className="ui fluid selection dropdown">
                                                <input type="hidden" />
                                                <div className="default text">Капюшон</div>
                                                <i className="dropdown icon"></i>
                                                <div className="menu">
                                                    <div className="item" data-value="af">Капюшон</div>
                                                    <div className="item active" data-value="ax">offline</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-details__item">
                                        <div className="box-field">
                                            <label className="box-field__label">Additional info:</label>
                                            <input type="text" className="box-field__input" />
                                        </div>
                                    </div>
                                    <div className="product-details__item">
                                        <div className="select-elem">
                                            <label className="box-field__label">Fastener type:</label>
                                            <div className="ui fluid selection dropdown">
                                                <input type="hidden" />
                                                <div className="default text">Без застежки</div>
                                                <i className="dropdown icon"></i>
                                                <div className="menu">
                                                    <div className="item" data-value="af">Без застежки</div>
                                                    <div className="item active" data-value="ax">offline</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-details__item">
                                        <div className="select-elem">
                                            <label className="box-field__label">Silhouette:</label>
                                            <div className="ui fluid selection dropdown">
                                                <input type="hidden" />
                                                <div className="default text">Classic</div>
                                                <i className="dropdown icon"></i>
                                                <div className="menu">
                                                    <div className="item" data-value="af">Classic</div>
                                                    <div className="item active" data-value="ax">offline</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-details__item">
                                        <div className="select-elem">
                                            <label className="box-field__label">Strap type:</label>
                                            <div className="ui fluid selection dropdown">
                                                <input type="hidden" />
                                                <div className="default text">Без бретелей</div>
                                                <i className="dropdown icon"></i>
                                                <div className="menu">
                                                    <div className="item" data-value="af">Без бретелей</div>
                                                    <div className="item active" data-value="ax">offline</div>
                                                </div>
                                            </div>
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
                                            <div className="product-details__item">
                                                <div className="select-elem">
                                                    <label className="box-field__label">Shell fabric 1:</label>
                                                    <div className="ui fluid selection dropdown">
                                                        <input type="hidden" />
                                                        <div className="default text">Poplin</div>
                                                        <i className="dropdown icon"></i>
                                                        <div className="menu">
                                                            <div className="item" data-value="af">Poplin</div>
                                                            <div className="item active" data-value="ax">offline</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-details__item">
                                                <div className="select-elem">
                                                    <label className="box-field__label">Shell fabric 1 weight:</label>
                                                    <div className="ui fluid selection dropdown">
                                                        <input type="hidden" />
                                                        <div className="default text">12%</div>
                                                        <i className="dropdown icon"></i>
                                                        <div className="menu">
                                                            <div className="item" data-value="af">12%</div>
                                                            <div className="item active" data-value="ax">offline</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-details__item">
                                                <div className="select-elem">
                                                    <label className="box-field__label">Shell fabric 1 composition:</label>
                                                    <div className="ui fluid selection dropdown">
                                                        <input type="hidden" />
                                                        <div className="default text">100%Cotton</div>
                                                        <i className="dropdown icon"></i>
                                                        <div className="menu">
                                                            <div className="item" data-value="af">100%Cotton</div>
                                                            <div className="item active" data-value="ax">offline</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-details__item">
                                                <div className="select-elem">
                                                    <label className="box-field__label">Shell fabric 1 constraction:</label>
                                                    <div className="ui fluid selection dropdown">
                                                        <input type="hidden" />
                                                        <div className="default text">Knit</div>
                                                        <i className="dropdown icon"></i>
                                                        <div className="menu">
                                                            <div className="item" data-value="af">Classic</div>
                                                            <div className="item active" data-value="ax">offline</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-details__item">
                                                <div className="select-elem">
                                                    <label className="box-field__label">Shell fabric 2:</label>
                                                    <div className="ui fluid selection dropdown">
                                                        <input type="hidden" />
                                                        <div className="default text">Poplin</div>
                                                        <i className="dropdown icon"></i>
                                                        <div className="menu">
                                                            <div className="item" data-value="af">Poplin</div>
                                                            <div className="item active" data-value="ax">offline</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-details__item">
                                                <div className="select-elem">
                                                    <label className="box-field__label">Shell fabric 2 weight:</label>
                                                    <div className="ui fluid selection dropdown">
                                                        <input type="hidden" />
                                                        <div className="default text">12%</div>
                                                        <i className="dropdown icon"></i>
                                                        <div className="menu">
                                                            <div className="item" data-value="af">12%</div>
                                                            <div className="item active" data-value="ax">offline</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-details__item">
                                                <div className="select-elem">
                                                    <label className="box-field__label">Shell fabric 2 composition:</label>
                                                    <div className="ui fluid selection dropdown">
                                                        <input type="hidden" />
                                                        <div className="default text">100%Cotton</div>
                                                        <i className="dropdown icon"></i>
                                                        <div className="menu">
                                                            <div className="item" data-value="af">100%Cotton</div>
                                                            <div className="item active" data-value="ax">offline</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-details__item">
                                                <div className="select-elem">
                                                    <label className="box-field__label">Shell fabric 2 constraction:</label>
                                                    <div className="ui fluid selection dropdown">
                                                        <input type="hidden" />
                                                        <div className="default text">Knit</div>
                                                        <i className="dropdown icon"></i>
                                                        <div className="menu">
                                                            <div className="item" data-value="af">Classic</div>
                                                            <div className="item active" data-value="ax">offline</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-details__item">
                                                <div className="select-elem">
                                                    <label className="box-field__label">Shell fabric 3:</label>
                                                    <div className="ui fluid selection dropdown">
                                                        <input type="hidden" />
                                                        <div className="default text">Poplin</div>
                                                        <i className="dropdown icon"></i>
                                                        <div className="menu">
                                                            <div className="item" data-value="af">Poplin</div>
                                                            <div className="item active" data-value="ax">offline</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-details__item">
                                                <div className="select-elem">
                                                    <label className="box-field__label">Shell fabric 3 weight:</label>
                                                    <div className="ui fluid selection dropdown">
                                                        <input type="hidden" />
                                                        <div className="default text">12%</div>
                                                        <i className="dropdown icon"></i>
                                                        <div className="menu">
                                                            <div className="item" data-value="af">12%</div>
                                                            <div className="item active" data-value="ax">offline</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-details__item">
                                                <div className="select-elem">
                                                    <label className="box-field__label">Shell fabric 3 composition:</label>
                                                    <div className="ui fluid selection dropdown">
                                                        <input type="hidden" />
                                                        <div className="default text">100%Cotton</div>
                                                        <i className="dropdown icon"></i>
                                                        <div className="menu">
                                                            <div className="item" data-value="af">100%Cotton</div>
                                                            <div className="item active" data-value="ax">offline</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-details__item">
                                                <div className="select-elem">
                                                    <label className="box-field__label">Shell fabric 3 constraction:</label>
                                                    <div className="ui fluid selection dropdown">
                                                        <input type="hidden" />
                                                        <div className="default text">Knit</div>
                                                        <i className="dropdown icon"></i>
                                                        <div className="menu">
                                                            <div className="item" data-value="af">Classic</div>
                                                            <div className="item active" data-value="ax">offline</div>
                                                        </div>
                                                    </div>
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
                                    <div className="product-details__block">
                                        <div className="product-details__load_item">								
                                            <div className="box-field">
                                                <label className="box-field__label">Measurement list:</label>
                                                <label className="load-file product-loader">
                                                    <span className="box-field__input load-file__input"></span>
                                                    <i className="load-file__icon icon-upload"></i>
                                                    <input type="file" className="load-file__file" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-details__block">	
                                        <div className="product-details__load_item">								
                                            <div className="box-field">
                                                <label className="box-field__label">Description:</label>
                                                <label className="load-file product-loader">
                                                    <span className="box-field__input load-file__input"></span>
                                                    <i className="load-file__icon icon-upload"></i>
                                                    <input type="file" className="load-file__file" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-details__block">
                                        <div className="product-details__load_item">								
                                            <div className="box-field">
                                                <label className="box-field__label">Specification:</label>
                                                <label className="load-file product-loader">
                                                    <span className="box-field__input load-file__input"></span>
                                                    <i className="load-file__icon icon-upload"></i>
                                                    <input type="file" className="load-file__file" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-details__block">
                                        <div className="product-details__load_item">																					
                                            <div className="box-field">
                                                <label className="box-field__label">Images:</label>
                                                <label className="load-file product-loader">
                                                    <span className="box-field__input load-file__input"></span>
                                                    <i className="load-file__icon icon-upload"></i>
                                                    <input type="file" className="load-file__file" />
                                                </label>
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
                                    <div className="product-details__block">
                                        <div className="product-details__load_item">
                                                                        
                                            <div className="box-field">
                                                <label className="box-field__label">Vector files:</label>
                                                <label className="load-file product-loader">
                                                    <span className="box-field__input load-file__input"></span>
                                                    <i className="load-file__icon icon-upload"></i>
                                                    <input type="file" className="load-file__file" />
                                                </label>
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
                                    <div className="product-details__item">
                                        <div className="box-field">
                                            <label className="box-field__label">Number gtd:</label>
                                            <input type="text" className="box-field__input" />
                                        </div>
                                    </div>
                                    <div className="product-details__item">
                                        <div className="box-field">
                                            <label className="box-field__label">Vat rate:</label>
                                            <input type="text" className="box-field__input" />
                                        </div>
                                    </div>
                                    <div className="product-details__item">
                                        <div className="box-field">
                                            <label className="box-field__label">Code tnved:</label>
                                            <input type="text" className="box-field__input" />
                                        </div>
                                    </div>
                                    <div className="product-details__item">
                                        <div className="box-field">
                                            <label className="box-field__label">Country origin id:</label>
                                            <input type="text" className="box-field__input" />
                                        </div>
                                    </div>
                                    <div className="product-details__item">								
                                        <div className="checkbox-elem">
                                            <input type="checkbox" id="checkbox-111" checked />
                                            <label className="checkbox-label" for="checkbox-111">Weight product</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>	
                    <div className="product-button">
                        <input type="submit" value="Save" className="btn btn2" />
                        <span className="btn">Start quatation</span>
                    </div>
                </form>
            </>
        )
    } 
}

export default EditProduct;