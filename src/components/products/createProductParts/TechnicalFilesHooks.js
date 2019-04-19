import React, { useState } from 'react'

const TechnicalFilesHooks = () => {
  
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
                          <label className="box-field__label">Measurement list:</label>
                          <label className="load-file product-loader">
                              <span className="box-field__input load-file__input"></span>
                              <i className="load-file__icon icon-upload"></i>
                              <input type="file" onChange={(e) => console.log(e.target.file)} className="load-file__file" />
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
  )
}

export default TechnicalFilesHooks