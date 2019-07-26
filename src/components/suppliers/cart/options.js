import React, {Component} from 'react';
import Header from './header';
import {history} from '../../../routes/history'
import {connect} from 'react-redux';
import {createRequestAction} from '../../../actions/index';
import {Loading, Error} from '../../helpers';
import styled from 'styled-components';
import {Formik} from 'formik';
import DeliveryTerms from '../create/forms/DeliveryTerms';
// import Supplier from '../../../requestor/supplier';
import SupplierApi from '../../../requestor/supplier';
import OptionsForm from '../create/forms/OptionsForm'
import CommonButton from '../../common/CommonButton'
import suppliersApi from '../../../requestor/supplier'


const Submit = styled(({className, ...props}) =>
    <input {...props} type="submit" className={"btn " + className} value="Save"/>)`
margin-top: 20px;
width: fit-content;
`;

class ViewSuppierOptions extends Component {
    state = {
        categories: null,
        ages: null,
        genders: null,
        incoterm: null,
        port: null,
        defaultValues: null,
    };

    localSave = (values) => this.setState({...values})
    incotermSave = (val) => this.setState({incoterm: val})
    portSave = (val) => this.setState({port: val})

    async componentDidMount() {
        if (this.props.needToGetSupplier)
            this.props.getById();
        this.props.getAges();
        this.props.getCategories();
        this.props.getGenders();

        try {
            const defaultValues = await suppliersApi.getIncoterm(this.props.match.params.id)
            this.setState({defaultValues: defaultValues.results})
        } catch (e) {
            console.log(e)
        }
    }


    handleEdit = async () => {
        const {defaultValues, ...editedPart} = this.state
        const {categories, genders, ages, payment_terms_date, ...cleanSupplier} = this.props.supplier.data
        let current_datetime = new Date(payment_terms_date)
        let formatted_date = current_datetime.getDate() + "/" + (current_datetime.getMonth()) + "/" + current_datetime.getFullYear()

        const editedSupplier = {
            ...cleanSupplier,
            categories: editedPart.categories ? editedPart.categories : categories,
            ages: editedPart.ages ? editedPart.ages : ages,
            genders: editedPart.genders ? editedPart.genders : genders,
            formatted_date
        }
        const savedIncotermPlusPort = await SupplierApi.saveIncoterm({
            supplier: this.props.match.params.id,
            incoterm: editedPart.incoterm || defaultValues[0].incoterm,
            port: editedPart.port || defaultValues[0].port,
        })
        const editedSupplierResponse = await SupplierApi.edit(editedSupplier)
        if (editedSupplierResponse)
            history.replace(`/suppliers/view/options/${this.props.match.params.id}`)
    }

    render() {

        const {supplier, genders, ages, categories, readOnly} = this.props;
        if ([supplier.state, genders.state, ages.state, categories.state].includes("loading"))
            return <Loading/>;
        if (supplier.state === "fail")
            return <Error error={supplier.err}/>;
        else if ([genders.state, ages.state, categories.state].includes("fail"))
            return <Error error={genders.err || ages.err || categories.err}/>;

        const {id, name} = supplier.data;

        return (
            <>
                <Header id={id} name={name} selected="2" edit={!readOnly}/>
                <div className="bg-box">
                    {this.props.supplier.data &&
                    <OptionsForm
                        editMode={true}
                        supplier={this.props.match.params.id}
                        readOnly={this.props.readOnly}
                        saveStepInfo={(info) => this.localSave(info)}
                        options_info={{
                            categories: this.props.supplier.data.categories,
                            genders: this.props.supplier.data.genders,
                            ages: this.props.supplier.data.ages,
                        }}
                        defaultValues={this.state.defaultValues}
                    />}
                    {this.props.match.path.match(/\/edit\//gm)
                    &&
                    <CommonButton style={{maxWidth: '80px'}} type="btn btn1" text={'Save'}
                                  onClick={this.handleEdit}/>}
                </div>
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