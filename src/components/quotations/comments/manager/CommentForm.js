import React, {useState} from 'react';
import CommonButton from '../../../common/CommonButton'

const CommentForm = ({display, postComment, relationId}) => {
    const [written, write] = useState('')
    return (
        <form className={`quotation__comment__form ` + display}>
            <textarea
                placeholder="Comment"
                value={written}
                onChange={(e) => write(e.target.value)}></textarea>
            <CommonButton text='Send' type='btn2'
                          onClick={() => postComment({product_item: relationId, text: written})}/>
        </form>
    );
};

export default CommentForm