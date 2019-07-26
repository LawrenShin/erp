import React from 'react';
import { connect } from 'react-redux'
import img from '../../assets/img/examples/img_1.jpg';
import Back from '../controls/backbtn';
import CreateProduct from './create'
import { createRequestAction } from '../../actions'

class EditProduct extends React.Component {
    componentWillMount(){
        // if (!this.props.product || Array.isArray(this.props.product.data)) 
        this.props.getProduct(this.props.match.params.id)
        this.props.refresh()
    }
    
    render() {
        return (
            <>
                <CreateProduct edit product={this.props.product} />
            </>
        )
    } 
}

export default connect(state => ({
    product: state.products.product
}), dispatch => ({
    getProduct: (id) => dispatch(createRequestAction('product', 'getProduct', [id])),
    refresh: () => dispatch({ type: 'CREATE_PRODUCT_REFRESH' }),
}))(EditProduct);