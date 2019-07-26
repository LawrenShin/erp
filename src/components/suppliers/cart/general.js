import React, {Component} from 'react';
import Pointer from '../../controls/pointer';
import Input from '../../controls/input';
import Header from './header';
import MinMax from '../../controls/min-max';
import Options from '../../controls/options';
import Checkbox from '../../controls/checkbox';
import TextArea from '../../controls/text-area';
import {connect} from 'react-redux';
import {createRequestAction} from '../../../actions/index';
import {Loading, Error} from '../../helpers';
import Slider from '../../controls/slider';
import styled from 'styled-components';
import {Formik} from 'formik';
import PaymentTerms from '../create/forms/PaymentTerms';
import Supplier from '../../../requestor/supplier';
import {history} from '../../../routes/history';
import {Dropdown} from 'semantic-ui-react';

const Raiting = styled(({value, className}) => {
    const r = 50;    
    const c = Math.PI * (r * 2);    
    const size = c;
    const offset = (100 - value) / 100 * c;

    return (
        <div className={className}>
            <svg width="200" height="200" viewBox="0 0 120 120" version="1.1"
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="50" stroke="#ccc" strokeWidth="12" fill="transparent"/>
                <circle cx="60" cy="60" r="50" stroke="#40bde8" strokeWidth="12" fill="transparent" strokeDashoffset={offset} strokeDasharray={size} transform="rotate(270 60 60)"/>
            </svg>   
            <div>
                <span>{value}%</span>
                <i>score</i>
            </div>
        </div>  
    );  
})`
    position: relative;
    display: flex;
    align-item: center;
    div{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;  
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    span{
        font-size: 24px;
        font-weight: bold;
        color: #40bde8;
        text-align: center;
    }
    i{
        font-style: normal;
        font-size: 13px;
        color: #77848f;
        text-align: center;
    }
`;

class ViewSuppierGeneral extends Component {
    componentDidMount() {
        this.props.getPaymentTerms();
        if(this.props.needToGetSupplier)
            this.props.getById();
    }
    getDashArray(){
        const r = 50;
        const value = 78;
        const c = Math.PI * (r * 2);    
        
        return c / 100 * value;
    }
    state = {
        error: null
    }

    render() {
        const {supplier, readOnly} = this.props;
        if(supplier.state === "loading")
            return <Loading />;
        if(supplier.state === "fail")
            return <Error error={supplier.err} />;            
        
        const {id, name, status, type, moq_min, moq_max, manufacturer, importer, consignee, nlg, supplier_code_1c, get_reliability_rating, get_financial_rating, comment, get_rating, factory, is_timely_response_to_letters, is_cost_break_down, is_efficiency_work_with_orders, is_discount_reject_delay, is_no_spam_any_work_questions, contract_number, purchaser, payment_terms} = supplier.data;

        if(this.state.error) 
            return <Error>{this.state.error}</Error>

        return (            
            <>
                <Header id={id} name={name} edit={!readOnly}/>

                <div className="bg-box box-card-general">
                    <Formik initialValues={{ 
                        id, name, status, type, moq_min, moq_max, manufacturer, importer, consignee, nlg, supplier_code_1c, comment, factory, is_timely_response_to_letters, is_cost_break_down, is_efficiency_work_with_orders, is_discount_reject_delay, is_no_spam_any_work_questions, contract_number, purchaser, payment_terms }}
                    onSubmit={(values, actions) => {
                        actions.setSubmitting(false);
                        Supplier.edit(values).then( (res) => {
                            if(res.status === 200){
                                this.props.getById();
                                history.replace(`/suppliers/view/${this.props.match.params.id}`)                         
                            }
                        }).catch(res => {
                            if(res.status === 400){
                                actions.setErrors(res.response.data);
                            }
                            else{
                                this.setState({error: res.toString()})
                            }
                        })
                    }}

                    validateOnBlur={false}
                    render={ ({values, errors, handleSubmit, handleChange, handleBlur, setFieldValue}) => (
                        <form onSubmit={handleSubmit}>
                            <div className="general-form">
                                <div className="form-box">            
                                    <Input readOnly={readOnly} label="Name" error={errors.name} name="name" value={values.name} onChange={handleChange} />
                                    <Input readOnly={readOnly} label="Contract number" error={errors.contract_number} name="contract_number" value={values.contract_number} onChange={handleChange} />
                                    <Input type='number' readOnly={readOnly} label="Factory capacity" error={errors.factory} name="factory" value={values.factory} onChange={handleChange} />
                                    <Options readOnly={readOnly} value={values.status} label="Status" onChange={handleChange} name="status" list={ [{name: "Inactive", value: 'IN'}, {name: "Асtive", value: 'AC'}, {name: "Test", value: 'TS'}] } />	
                                    <Input readOnly={readOnly} label="NLG" error={errors.nlg} value={values.nlg} name="nlg" onChange={handleChange} />
                                    <Options error={errors.type} readOnly={readOnly} value={values.type} label="Type" onChange={handleChange} name="type" list={ [{name: "Agent", value: 'AG'}, {name: "Factory", value: 'FC'}] }>
                                        <div className="type-pin"><Pointer><i className="icon-placeholder"></i></Pointer></div>
                                    </Options>
                                    <MinMax readOnly={readOnly} label="MOQ" onChange={handleChange} min={values.moq_min} max={values.moq_max} minName="moq_min" maxName="moq_max" minError={errors.moq_min} maxError={errors.moq_max} />	
                                    <Input readOnly={readOnly} label="Manufacturer" error={errors.manufacturer} name="manufacturer" value={values.manufacturer} onChange={handleChange} />
                                    <Input readOnly={readOnly} label="Purchaser" error={errors.purchaser} name="purchaser" value={values.purchaser} onChange={handleChange}/>
                                    <Input readOnly={readOnly} label="Importer" error={errors.importer} name="importer" value={values.importer} onChange={handleChange}/>
                                    <Input readOnly={readOnly} label="Сonsignee" error={errors.consignee} name="consignee" value={values.consignee} onChange={handleChange}/>
                                    <div className="form-box__item">
                                        <label className="box-field__label">Payment terms:</label>
                                        <div className="term-select">
                                        <div className="select-elem">
                                        { 
                                            this.props.paymentTerms.state === "loaded" ? 
                                            <Dropdown 
                                                options={this.props.paymentTerms.data}
                                                defaultValue={values.payment_terms}
                                                disabled={readOnly} 
                                                onChange={(e, {name, value}) => setFieldValue(name, value)}
                                                placeholder='payment_terms' 
                                                name='payment_terms' 
                                                search selection />
                                            : <Loading />
                                            }
                                        </div>
                                        {/* <div className="item-add">
                                            <Pointer>
                                                <i className="icon-plus"></i>
                                            </Pointer>
                                        </div>
                                        <div className="item-remove">
                                            <Pointer>
                                                <i className="icon-trash"></i>
                                            </Pointer>
                                        </div> */}
                                        </div>                
                                    </div>
                                    <Input readOnly={readOnly} label="1C Code" error={errors.supplier_code_1c} maxLength={8} name="supplier_code_1c" value={values.supplier_code_1c} onChange={handleChange} />
                                </div>
                                <div className="general-form__aside">
                                    <div className="general-form__aside-inner">
                                        <div className="general-form__diagram">
                                            <Raiting value={get_rating} />                                     
                                        </div>
                                        <div className="general-form-ranges">
                                            <div className="general-form-ranges__item">
                                                <div className="general-form-ranges__title">Reability: {get_reliability_rating}%</div>
                                                <Slider readOnly name="reability" value={get_reliability_rating}/>
                                            </div>
                                            <div className="general-form-ranges__item">
                                                <div className="general-form-ranges__title">Financial: {get_financial_rating}%</div>
                                                <Slider readOnly name="financial" value={get_financial_rating}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>	
                            <div className="general-list">
                                <div className="general-list__item">								
                                    <Checkbox readOnly={readOnly} error={errors.is_timely_response_to_letters} name="is_timely_response_to_letters" checked={values.is_timely_response_to_letters} simple label="Respond in time" onChange={handleChange} />
                                </div>
                                <div className="general-list__item">		
                                    <Checkbox readOnly={readOnly} error={errors.is_cost_break_down} name="is_cost_break_down" checked={values.is_cost_break_down} onChange={handleChange} simple label="Offeres Cost break down" />						
                                </div>
                                <div className="general-list__item">	
                                    <Checkbox readOnly={readOnly} error={errors.is_efficiency_work_with_orders} name="is_efficiency_work_with_orders" checked={values.is_efficiency_work_with_orders} onChange={handleChange} simple label="Responsiveness in working with orders" />							
                                </div>
                                <div className="general-list__item">	
                                    <Checkbox readOnly={readOnly} error={errors.is_discount_reject_delay} name="is_discount_reject_delay" checked={values.is_discount_reject_delay} onChange={handleChange} simple label="Gives a discount for rejects and product delay" />									
                                </div>
                                <div className="general-list__item">			
                                    <Checkbox readOnly={readOnly} error={errors.is_no_spam_any_work_questions} name="is_no_spam_any_work_questions" checked={values.is_no_spam_any_work_questions} onChange={handleChange} simple label="Doesn’t bother with work spam" />					
                                </div>
                            </div>
                            <div className="coment-area">									
                                <TextArea readOnly={readOnly} error={errors.comment} simple label="Comments" name="comment" value={values.comment} onChange={handleChange} />
                            </div>
                            {
                                !readOnly ?
                                <input type="submit" className="btn" value="Save" />
                                : null
                            }
                        </form>
                    )}/>
                </div>
            </>
        );
    }
}

export default connect((state) => ({
    supplier: state.suppliers.supplier,
    paymentTerms: state.suppliers.paymentTerms,
    needToGetSupplier: state.suppliers.needToGetSupplier
}), (dispatch, ownProps) => ({
    getById: () => dispatch(createRequestAction("supplier", "getById", [ownProps.match.params.id])),
    getPaymentTerms: () => dispatch(createRequestAction("supplier", "getPaymentTerms"))
}))(ViewSuppierGeneral);