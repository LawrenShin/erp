import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'
// manager
import CommentTitle from './CommentTitle'
import CommentForm from './CommentForm'
import CommentSended from './CommentSended'
// supplier
import CommentAnswer from '../supplier/CommentAnswer'
import CommentFormSupplier from '../supplier/CommentFormSupplier'
import CommentSupplier from '../supplier/CommentSupplier'

const CommentManager = ({ sendPrice, side, display, product_item, comments, addedProductsRelations, postComment, requestedChanges, distributionId }) => {
    const [form, setForm] = useState('none')
    
    const composeComments = ( returnWhat ) => {
        const relation = addedProductsRelations[Object.keys(addedProductsRelations).filter(key => addedProductsRelations[key].product === distributionId)[0]]
        if(relation){
            if(returnWhat === 'relationId') return relation.id
            return comments.data.filter(c => c.product_item === relation.id)
        }
        return []
    }
    const handlePostComment = (payload) => {
        postComment(payload)
        setForm(form === 'none' ? 'block' : 'none')
    }
    const wereResponded = (needle, stack) => {
        const match = stack.filter(s => s.id === needle)[0]
        return match
    }
    
    if(side === 'manager'){
        return (
            <div className={`quotation__comment ${display}`}>
                <CommentTitle text='Changes request' />
                {(comments.data && addedProductsRelations) && composeComments().map(c => <CommentSended key={uuid()} value={c.text} comment={c} />)}
                <CommentForm 
                    relationId={ (comments.data && addedProductsRelations) && composeComments('relationId') }
                    postComment={handlePostComment}
                    display={form} />
                <button
                    onClick={() => setForm(form === 'none' ? 'block' : 'none')}
                    className="-text-color-blue" >Add another comment</button>
            </div>
        );
    }
    if(side === 'supplier'){
        if(comments.data && requestedChanges.data){
            let matchedComments = comments.data.filter(c => c.product_item === product_item)
            let matchedRequestedChanges = requestedChanges.data.filter(rc => rc.distribution_id === distributionId).map(change => change.requests.filter((request, i) => {
                        if (matchedComments[i]) return request.product_item_id === matchedComments[i].product_item
                    }))[0]
            
            return (<>
                {matchedComments.map((mc, i) => {
                    if(matchedRequestedChanges){
                        return wereResponded(mc.id, matchedRequestedChanges) ? <div className={`quotation__comment -supplier-page ${display}`} key={uuid()}>
                            <CommentTitle text='Changes request' />
                            <CommentAnswer comment={mc} index={i} />
                            <CommentFormSupplier 
                                commentId={mc.id}
                                distributionId={distributionId}
                                sendPrice={sendPrice} />
                        </div> : null
                    }
                })}
            </>)
        }else{
            return (<></>)
        }
    }
}

export default connect(state => ({
    comments: state.quotations.comments,
    addedProductsRelations: state.quotations.currentQuotationReducer.addedProductsRelations.data,
    requestedChanges: state.quotations.supplierPart.viewedQuotation.requestedChanges,
}), dispatch => ({
    postComment: (relation) => dispatch({ type: 'POST_COMMENT', payload: relation }),
}))(CommentManager);