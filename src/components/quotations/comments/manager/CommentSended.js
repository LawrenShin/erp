import React from 'react';
import moment from 'moment'

const CommentSended = (props) => {
    const date = props.comment.created_at.match(/[\d]{4}-[\d]{2}-[\d]{2}/gm)[0].replace(/-/g, '.')
    const time = props.comment.created_at.match(/[\d]{2}:[\d]{2}:[\d]{2}/gm)[0].replace(/-/g, '.')
    console.log()
    return (
        <>
            <div className="quotation__comment__form">
                <textarea placeholder="Comment" disabled value={props.comment.text}></textarea>
                <div className="quotation__comment__form__info">
                    {props.comment.author && <span><b>From: </b>{props.comment.author}</span>}
                    {props.comment.created_at && <span><b>Created at: </b>{date} - {time}</span>}
                </div>
            </div>
        </>
    );
};

export default CommentSended;