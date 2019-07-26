import React from 'react';
import {connect} from 'react-redux';
import {createAction} from '../../actions';
import Back from '../controls/backbtn';
import ApiWrapper from '../api-wrapper';
import Loading from '../helpers/loading';
import {Message} from 'semantic-ui-react';

import TechnicalHooks from './createProductParts/TechnicalHooks';
import TechnicalFilesHooks from './createProductParts/TechnicalFilesHooks';
import DesignHooks from './createProductParts/DesignHooks';
import GeneralHooks from './createProductParts/GeneralHooks';
import LogisticsHooks from './createProductParts/LogisticsHooks';
import ProductsApi from '../../requestor/product'
import {history} from '../../routes/history'

import {
    gatherProductPropsForRequest,
    gatherProductPropsForUpdate,
    requestErrors,
    requestErrorsSelector,
    createProductIdSelector
} from '../../ducks/productSagas/createProduct';
import * as yup from "yup";
import {NavLink} from "react-router-dom";

class CreateProduct extends React.Component {
    state = {
        errors: false,
        created: false,
        edited: false,
        createProductFields: yup.object().shape({
            name: yup.string().required(),
            theme: yup.string().required(),
            trade_mark: yup.string().required(),
            season: yup.string().required(),
            target_price: yup.number().required().integer().min(1),
            year: yup.string().required(),
            moq: yup.number().required().integer(),
            collection: yup.string().required(),
            buing_manager: yup.string().required(),
            color: yup.string().required(),
            style: yup.string().required(),
            age: yup.string().required(),
            gender: yup.string().required(),
            category: yup.string().required(),
            kind: yup.string().required(),
            size_grid: yup.string().required(),
            purpose: yup.string().required(),
            length: yup.string().required(),
            type_pocket: yup.string().required(),
            level_waist: yup.string().required(),
            kind_neck: yup.string().required(),
            kind_fastener: yup.string().required(),
            silhouette: yup.string().required(),
            kind_strap: yup.string().required(),
            sleeve: yup.string().required(),
            shell_fabric_1: yup.string().required(),
            shell_fabric_1_weight: yup.string().required(),
            shell_fabric_1_composition: yup.string().required(),
            shell_fabric_1_construction: yup.string().required(),
            print_mood: yup.string().required()
        })
    };

    async componentDidMount() {
        const {getApi} = this.props;

        try {
            const generalMap = await getApi('product').run('getGeneral');
            const designMap = await getApi('product').run('getDesign');
            const technicalMap = await getApi('product').run('getTechnical');
            const fabricMap = await getApi('product').run('getFabric');
            const logisticMap = await getApi('product').run('getLogistics');
            const generalFilter = await getApi('product').run('getFilters');

            const requestOptionsInfo = await getApi('product').run('getOptionsProducts');
            generalMap.set('season', requestOptionsInfo.actions.POST.season.choices);

            this.setState({
                generalMap,
                designMap,
                technicalMap,
                fabricMap,
                logisticMap,
                generalFilter
            })
        } catch (e) {
            this.setState({error: e})
        }
    }

    componentDidUpdate() {
        // conditional redirect after creation
        (!!this.props.createdProductId && this.state.created) && history.push(`/products/edit/${this.props.createdProductId}`);
    }

    handleCreateProduct = () => {
        const {forRequest, create} = this.props;
        if(forRequest.buing_manager === null) forRequest.buing_manager = this.props.userId;
        this.state.createProductFields.validate(forRequest, {abortEarly: false})
            .then(valid => {
                create(forRequest);
                this.setState({created: true});
            })
            .catch(err => {
                this.setState({errors: err.errors})
            });
    };
    handleEditProduct = async (id) => {
        const {forRequest} = this.props;
        for (var key in forRequest) {
            if ((forRequest[key] === false && key !== 'package') || forRequest[key] === '' || forRequest[key] === 0 || key === 'main_image' || forRequest[key] === null) {
                delete forRequest[key]
            }
        }
        const editedProduct = await ProductsApi.editProduct(id, forRequest).then(res => res, this.setState({edited: true})).catch(e => console.log(e.message));
    };

    didIGetProduct = () => {
        if (this.props.edit && this.props.product && this.props.product.state === 'loaded') return true
        return false
    };

    render() {
        const isLoaded = !!this.state.generalMap && !!this.state.designMap && !!this.state.technicalMap && !!this.state.fabricMap;

        return (
            <>
                <div className="page-heading page-heading_product">
                    <div className="page-heading__title">
                        <div className="page-heading__top">
                            <h1 className="h1 h1_product">{this.props.edit ? 'Edit Product' : 'Create Product'}</h1>
                            {this.props.edit && <NavLink
                                to={`/products/view/${this.props.product.data.id}`}
                                className="page-heading__icon page-heading__icon_circle">
                                <i className="icon-close"></i>
                            </NavLink>}
                        </div>
                    </div>
                    <div className="page-heading__navs">
                        <div className="card-filters-nav">
                            <Back/>
                        </div>
                    </div>
                </div>
                <form>
                    {isLoaded ?
                        <>
                            <div className="product">
                                <GeneralHooks
                                    edit={this.props.edit}
                                    product={this.didIGetProduct() ? this.props.product.data : {}}
                                    generalMap={this.state.generalMap}
                                    generalFilter={this.state.generalFilter}
                                    requestErrors={this.props.requestErrors}/>
                                <DesignHooks
                                    product={this.didIGetProduct() ? this.props.product.data : {}}
                                    designMap={this.state.designMap}
                                    generalFilter={this.state.generalFilter}
                                    requestErrors={this.props.requestErrors}/>
                                <TechnicalHooks
                                    product={this.didIGetProduct() ? this.props.product.data : {}}
                                    technicalMap={this.state.technicalMap}
                                    fabricMap={this.state.fabricMap}
                                    requestErrors={this.props.requestErrors}/>
                                {this.props.edit && <TechnicalFilesHooks
                                    product={this.didIGetProduct() ? this.props.product.data : {}}
                                    requestErrors={this.props.requestErrors}/>}
                                {/* only for update */}
                                <LogisticsHooks logisticMap={this.state.logisticMap}
                                                product={this.didIGetProduct() ? this.props.product.data : {}}/>
                            </div>

                            {this.state.error && <Message color='red'>{this.state.error}</Message>}
                            {this.props.requestErrors &&
                            <Message color='red'>{this.props.requestErrors.message}</Message>}

                            {this.state.errors.length > 0 &&
                            <div className='create__errors' style={{marginBottom: '20px'}}>
                                {Object.keys(this.state.errors).map((error) =>
                                    <span>{`${error === 'name' ? 'Company name' : error} - ${this.state.errors[error]}`}</span>)}
                            </div>}

                            {this.state.created &&
                            <div className="create__answer" style={{marginBottom: '20px'}}>Product has been
                                created</div>}
                            {this.state.edited &&
                            <div className="create__answer" style={{marginBottom: '20px'}}>Product has been
                                modified</div>}
                            <div className="product-button">
                                <input
                                    type="button"
                                    value="Save"
                                    className="btn btn2"
                                    onClick={this.props.edit ? () => this.handleEditProduct(this.props.product.data.id) : this.handleCreateProduct}/>
                                {/*<span className="btn">Start quotation</span>*/}
                            </div>
                        </>
                        :
                        <Loading/>}
                </form>
            </>
        )
    }
}

export default connect(state => ({
    forRequest: gatherProductPropsForRequest(state),
    requestErrors: requestErrorsSelector(state),
    createdProductId: createProductIdSelector(state),
    userId: state.auth.id
}), dispatch => ({
    create: (payload) => dispatch(createAction('CREATE_PRODUCT_REQUEST', payload)),
}))(ApiWrapper(CreateProduct));
