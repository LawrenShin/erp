import React, { useState } from 'react';
import CommonButton from '../../../common/CommonButton'

const CommentFormSupplier = ({ commentId, distributionId, sendPrice }) => {
    const [price ,setPrice] = useState('')
    return (
        <>
            <form className="quotation__comment__answer">
                <input 
                    type='number'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder='Your new price' 
                    className="quotation__comment__price" />
                <CommonButton
                    onClick={() => sendPrice({ distributionId: distributionId, commentId: commentId, price })}
                    text='Send new price' className="btn btn2 -btn-with-wrap" />
                <CommonButton
                    onClick={() => sendPrice({ distributionId: distributionId, commentId: commentId })}
                    text={`Decline change & keep previous price`} className="btn btn2 -btn-with-wrap" />
            </form>
        </>
    );
};

export default (CommentFormSupplier);