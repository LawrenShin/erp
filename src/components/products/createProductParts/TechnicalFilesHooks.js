import React, {useState, useCallback} from 'react';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone'

import {Message} from 'semantic-ui-react'
import Input from '../../controls/input';
import ConnectedDropdown from '../../controls/ConnectedDropdown';
import {createAction} from '../../../actions';
import {generalStore} from '../../../ducks/productSagas/createProduct'
import ProductsApi from "../../../requestor/product";
import className from 'classnames';

const TechnicalFilesHooks = (props) => {
    const mainImageName = null;
    return (
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
                                <label className="box-field__label required">Upload sketch</label>
                                <Dropzone
                                    multiple={false}
                                    accept='image/png,image/jpeg'
                                    onDrop={(e) => {
                                        if (e[0].size <= '2097152') {
                                            ProductsApi.uploadMainImage(e, props.product.id).then(res => res).catch(e => console.log(e.message));
                                            props.saveToStore({name: 'main_image', data: e[0].name})
                                        } else {
                                            props.saveToStore({name: 'main_image', data: 'File is too big'})
                                        }
                                    }}>
                                    {({getRootProps, getInputProps}) => (
                                        <div {...getRootProps({className: ''})}>
                                            <input {...getInputProps()} name='main_image'/>
                                            <div
                                                className={className('tech_files', {'-downloaded': props.store.main_image && props.store.main_image !== 'File is too big'}, {'-error': props.store.main_image === 'File is too big'})}>
                                                <button
                                                    type='button'>{props.store.main_image ? props.store.main_image : 'Upload file, max size 2MB'}</button>
                                            </div>
                                        </div>
                                    )}
                                </Dropzone>
                            </div>
                        </div>
                    </div>
                    <div className="product-details__block">
                        <div className="product-details__load_item">
                            <div className="box-field">
                                <label className="box-field__label">Measurement list</label>
                                <Dropzone
                                    accept='application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                                    onDrop={(e) => {
                                        if (e[0].size <= '2097152') {
                                            ProductsApi.uploadFilesProduct(e, props.product.id, 'ML').then(res => res).catch(e => console.log(e.message));
                                            props.saveToStore({name: 'ml', data: e[0].name})
                                        } else {
                                            props.saveToStore({name: 'ml', data: 'File is too big'})
                                        }
                                    }}>
                                    {({getRootProps, getInputProps}) => (
                                        <div {...getRootProps({className: ''})}>
                                            <input {...getInputProps()} name='ml'/>
                                            <div className={className('tech_files', {'-downloaded': props.store.ml && props.store.ml !== 'File is too big'}, {'-error': props.store.ml === 'File is too big'})}>
                                                <button
                                                    type='button'>{props.store.ml ? props.store.ml : 'Upload file, max size 2MB'}</button>
                                            </div>
                                        </div>
                                    )}
                                </Dropzone>
                            </div>
                        </div>
                    </div>
                    <div className="product-details__block">
                        <div className="product-details__load_item">
                            <div className="box-field">
                                <label className="box-field__label">Description</label>
                                <Dropzone
                                    accept='application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/pdf'
                                    onDrop={(e) => {
                                        if (e[0].size <= '2097152') {
                                            ProductsApi.uploadFilesProduct(e, props.product.id, 'DESC').then(res => res).catch(e => console.log(e.message));
                                            props.saveToStore({name: 'desc', data: e[0].name})
                                        } else {
                                            props.saveToStore({name: 'desc', data: 'File is too big'})
                                        }
                                    }}>
                                    {({getRootProps, getInputProps}) => (
                                        <div {...getRootProps({className: ''})}>
                                            <input {...getInputProps()} name='desc'/>
                                            <div className={className('tech_files', {'-downloaded': props.store.desc && props.store.desc !== 'File is too big'}, {'-error': props.store.desc === 'File is too big'})}>
                                                <button
                                                    type='button'>{props.store.desc ? props.store.desc : 'Upload file, max size 2MB'}</button>
                                            </div>
                                        </div>
                                    )}
                                </Dropzone>
                            </div>
                        </div>
                    </div>
                    <div className="product-details__block">
                        <div className="product-details__load_item">
                            <div className="box-field">
                                <label className="box-field__label">Specification</label>
                                <Dropzone
                                    accept='application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/pdf'
                                    onDrop={(e) => {
                                        if (e[0].size <= '2097152') {
                                            ProductsApi.uploadFilesProduct(e, props.product.id, 'SPEC').then(res => res).catch(e => console.log(e.message));
                                            props.saveToStore({name: 'spec', data: e[0].name})
                                        } else {
                                            props.saveToStore({name: 'spec', data: 'File is too big'})
                                        }
                                    }}>
                                    {({getRootProps, getInputProps}) => (
                                        <div {...getRootProps({className: ''})}>
                                            <input {...getInputProps()} name='spec'/>
                                            <div className={className('tech_files', {'-downloaded': props.store.spec && props.store.spec !== 'File is too big'}, {'-error': props.store.spec === 'File is too big'})}>
                                                <button
                                                    type='button'>{props.store.spec ? props.store.spec : 'Upload file, max size 2MB'}</button>
                                            </div>
                                        </div>
                                    )}
                                </Dropzone>
                            </div>
                        </div>
                    </div>
                    {/*<div className="product-details__block">
                        <div className="product-details__load_item">
                            <div className="box-field">
                                <label className="box-field__label">Images:</label>
                                <label className="load-file product-loader">
                                    <span className="box-field__input load-file__input"></span>
                                    <i className="load-file__icon icon-upload"></i>
                                    <input type="file" className="load-file__file"/>
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
                    </div>*/}
                    {/*<div className="product-details__block">
                        <div className="product-details__load_item">

                            <div className="box-field">
                                <label className="box-field__label">Vector files:</label>
                                <label className="load-file product-loader">
                                    <span className="box-field__input load-file__input"></span>
                                    <i className="load-file__icon icon-upload"></i>
                                    <input type="file" className="load-file__file"/>
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
                    </div>*/}
                </div>
            </div>
        </div>
    )
};

export default connect((state) => ({
    store: generalStore(state)
}), (dispatch) => ({
    saveToStore: (payload) => dispatch(createAction('GENERAL', payload))
}))(TechnicalFilesHooks);