import React, {Component} from 'react';
import Header from './header';
import Options from '../../controls/options-multi';
import {connect} from 'react-redux';
import {createRequestAction} from '../../../actions/index';
import {Loading, Error} from '../../helpers';
import styled from 'styled-components';
import {Formik} from 'formik';
import DeliveryTerms from '../create/forms/DeliveryTerms';
import Supplier from '../../../requestor/supplier';

const Submit = styled(({className, ...props}) => 
    <input {...props} type="submit" className={"btn " + className} value="Save" />)`
margin-top: 20px;
width: fit-content;
`;

class ViewSuppierOptions extends Component {
    state = { 
    };

    componentDidMount() {
        if(this.props.needToGetSupplier)
            this.props.getById();
        this.props.getAges();
        this.props.getCategories();
        this.props.getGenders();
    }

    render() {
        
        const {supplier, genders, ages, categories, readOnly} = this.props;
        if([supplier.state, genders.state, ages.state, categories.state].includes("loading"))
            return <Loading />;
        if(supplier.state === "fail")
            return <Error error={supplier.err} />; 
        else if([genders.state, ages.state, categories.state].includes("fail"))
            return <Error error={genders.err || ages.err || categories.err} />; 

        const {id, name} = supplier.data;
        
        return (            
            <>
                <Header id={id} name={name} selected="2" edit={!readOnly}/>

                <Formik initialValues={ 
                        {
                            categories: supplier.data.categories,
                            genders: supplier.data.genders,
                            ages: supplier.data.ages,
                            id,
                            name 
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
                                <div className="options">
                                    <div className="options__col">
                                        <Options   
                                            readOnly={readOnly}    
                                            error={errors.categories}                            
                                            label='Categories' 
                                            name='categories' 
                                            list={categories.data.map(({name, id}) => ({name, value: id}))} 
                                            value={values.categories}
                                            onChange={handleChange} />
                                    </div>
                                
                                    <div className="options__col">
                                        <Options
                                            readOnly={readOnly}    
                                            error={errors.genders}
                                            name='genders' 
                                            label='Genders' 
                                            list={genders.data.map(({name, id}) => ({name, value: id}))} 
                                            value={values.genders}
                                            onChange={handleChange} />

                                        <Options
                                            readOnly={readOnly}    
                                            error={errors.ages}
                                            name='ages' 
                                            label='Ages' 
                                            list={ages.data.map(({name, id}) => ({name, value: id}))} 
                                            value={values.ages}
                                            onChange={handleChange} />
                                    </div>

                                    <DeliveryTerms localSave={() => {}} />
                                    {!readOnly && <Submit onClick={handleSubmit} />} 
                                </div>
                            </form>
                        </div>  
                )}/>
            </>
        );
    }
}

export default connect((state) => ({
    supplier: state.suppliers.supplier,
    ages: state.suppliers.ages,
    genders: state.suppliers.genders,
    categories: state.suppliers.categories,
    needToGetSupplier: state.suppliers.needToGetSupplier
}), (dispatch, ownProps) => ({
    getById: () => dispatch(createRequestAction("supplier", "getById", [ownProps.match.params.id])),
    getAges: () => dispatch(createRequestAction("supplier", "getAges")),
    getCategories: () => dispatch(createRequestAction("supplier", "getCategories")),
    getGenders: () => dispatch(createRequestAction("supplier", "getGenders"))
}))(ViewSuppierOptions);