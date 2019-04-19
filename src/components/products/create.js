import React from 'react';
import { connect } from 'react-redux';
import { createAction } from '../../actions';
import Back from '../controls/backbtn';
import ApiWrapper from '../api-wrapper';
import Loading from '../helpers/loading';
import { Message } from 'semantic-ui-react';

import TechnicalHooks from './createProductParts/TechnicalHooks';
import TechnicalFilesHooks from './createProductParts/TechnicalFilesHooks';
import DesignHooks from './createProductParts/DesignHooks';
import GeneralHooks from './createProductParts/GeneralHooks';
import LogisticsHooks from './createProductParts/LogisticsHooks';

import { createProductStoreForRequest, requestErrors } from '../../ducks/createProduct';

class CreateProduct extends React.Component {
    state = {}
    
    async componentDidMount(){
        const { getApi } = this.props;

        try{
            const generalMap = await getApi('product').run('getGeneral')
            const designMap = await getApi('product').run('getDesign')
            const technicalMap = await getApi('product').run('getTechnical')
            const fabricMap = await getApi('product').run('getFabric')
            
            const requestOptionsInfo = await getApi('product').run('getOptionsProducts')
            generalMap.set('season', requestOptionsInfo.actions.POST.season.choices)

            this.setState({
                generalMap,
                designMap,
                technicalMap,
                fabricMap
            })
        }catch(e){
            this.setState({ error: e })
        }
    }

    componentDidUpdate(){
        if(this.state.designMap)
            console.log(this.state.designMap.keys())
    }

    handleCreateProduct = () => {
        const { product, create } = this.props
        create(product)
    }

    render() {
        const isLoaded = !!this.state.generalMap && !!this.state.designMap && !!this.state.technicalMap && !!this.state.fabricMap;
        return (
            <>
                <div className="page-heading page-heading_product">	
                    <div className="page-heading__title">
                        <div className="page-heading__top">
                            <h1 className="h1 h1_product">Create Product</h1>
                        </div>
                    </div>
                    <div className="page-heading__navs">
                        <div className="card-filters-nav">
                            <Back />
                        </div>
                    </div>
                </div>
                <form>
                    {isLoaded ?
                        <>
                        <div className="product">
                            <GeneralHooks generalMap={this.state.generalMap} />
                            <DesignHooks designMap={this.state.designMap} />
                            <TechnicalHooks 
                                technicalMap={this.state.technicalMap} 
                                fabricMap={this.state.fabricMap} />
                            {/* <TechnicalFilesHooks /> */} 
                            {/* only for update */}
                            <LogisticsHooks />
                        </div>
                        
                        {this.state.error && <Message color='red'>{this.state.error}</Message>}
                        {this.props.requestErrors && <Message color='red'>{this.props.requestErrors.message}</Message>}
                        
                        <div className="product-button">
                            <input 
                                type="button" 
                                value="Save" 
                                className="btn btn2" 
                                onClick={this.handleCreateProduct} />
                            <span className="btn">Start quatation</span>
                        </div>
                        </>
                        : 
                        <Loading />}
                </form>
            </>
        )
    }
}

export default connect(state => ({
    product: createProductStoreForRequest(state),
    requestErrors: requestErrors(state)
}), dispatch => ({
    create: (payload) => dispatch(createAction('CREATE_PRODUCT_REQUEST', payload))
}))(ApiWrapper(CreateProduct));