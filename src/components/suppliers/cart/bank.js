import React, {Component} from 'react';
import Input from '../../controls/input';
import Header from './header';
import Checkbox from '../../controls/checkbox';
import {connect} from 'react-redux';
import {createRequestAction} from '../../../actions/index';
import Loading from '../../helpers/loading';
import {history} from '../../../routes/history'
import {Formik} from 'formik';
import Supplier from '../../../requestor/supplier';

class ViewSuppierBank extends Component {
    state = { 
    };

    componentDidMount() {
        if(this.props.needToGetSupplier)
            this.props.getById();
    }

    render() {
        const {supplier, readOnly} = this.props;
        if([supplier.state].includes("loading"))
            return <Loading />;
        if(supplier.state === "fail")
            return <p>{supplier.message}</p>; 

        const {id, name, beneficiary_name, same_as_suppliers, beneficiary_bank, beneficiary_account_number, bank_address, swift, iban} = supplier.data;
        
        return (            
            <>
                <Header id={id} name={name} selected="3" edit={!readOnly}/>

                <Formik initialValues={ 
                        {
                            id,
                            name,
                            beneficiary_name, 
                            same_as_suppliers, 
                            beneficiary_bank, 
                            beneficiary_account_number, 
                            bank_address, 
                            swift, 
                            iban
                        }

                    }
                    validateOnBlur={false}
                    onSubmit={(values, actions) => {
                        actions.setSubmitting(false);

                        console.log(values);
                        
                        actions.setSubmitting(false);

                        Supplier.edit(values).then( (res) => {
                            if(res.status === 200){
                                this.props.getById();
                                history.replace(`/suppliers/view/accounting/${this.props.match.params.id}`)
                            }
                        }).catch(res => {
                            if(res.status === 400){
                                actions.setErrors(res.response.data);
                            }
                        })
                    }}
                    render={ ({values, errors, handleSubmit, handleChange, handleBlur}) => (
                        <div className="bg-box box-supplier">
                            <form onSubmit={handleSubmit}>
                                <div className="form-box form-box-bank">
                                    <div className="form-box__item">	
                                        <Input readOnly={readOnly} onChange={handleChange} value={values.beneficiary_name} error={errors.beneficiary_name} name='beneficiary_name' label="Beneficiary name" simple/>
                                        <Checkbox readOnly={readOnly} name='same_as_supplier' checked={values.same_as_suppliers === true} error={errors.same_as_suppliers} label='Same as Supplier' onChange={handleChange} />
                                    </div>
                                    <Input readOnly={readOnly} onChange={handleChange} value={values.beneficiary_bank} error={errors.beneficiary_bank} name='beneficiary_bank' label="Beneficiary bank" />
                                    <Input readOnly={readOnly} onChange={handleChange} value={values.beneficiary_account_number} error={errors.beneficiary_account_number} name='beneficiary_account_number' label="Beneficiary account number" />
                                    <Input readOnly={readOnly} onChange={handleChange} value={values.bank_address} error={errors.bank_address} name='bank_address' label="Bank Address" />
                                    <Input readOnly={readOnly} onChange={handleChange} value={values.swift} error={errors.swift} name='swift' label="SWIFT" />
                                    <Input readOnly={readOnly} onChange={handleChange} value={values.iban} error={errors.iban} name='iban' label="IBAN" />
                                </div>
                                {!readOnly && <input type="submit" className="btn" value="Save"></input>}
                            </form>
                        </div>  
                )}/>
            </>
        );
    }
}

export default connect((state) => ({
    supplier: state.suppliers.supplier,
    needToGetSupplier: state.suppliers.needToGetSupplier
}), (dispatch, ownProps) => ({
    getById: () => dispatch(createRequestAction("supplier", "getById", [ownProps.match.params.id]))
}))(ViewSuppierBank);