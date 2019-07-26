import React from 'react';
import className from 'classnames';

const CommentAnswer = (props) => {
    return (
        <>
            <div className="quotation__comment__text">
                <span className="-text-color-blue">{props.index}.</span>
                <span>{props.comment.text}</span>
            </div>
            <div className="quotation__comment__form__info">
                {props.comment.author && <span><b>From: </b>{props.comment.author}</span>}
                {props.comment.created_at && <span><b>Created at: </b>{props.comment.created_at}</span>}
            </div>
        </>
    );
};

export default CommentAnswer;