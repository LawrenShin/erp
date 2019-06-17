import React from 'react';
import className from 'classnames';

const CommentTitle = (props) => {
    return (
        <>
            <p className="quotation__comment__title">{props.text}</p>
        </>
    );
};

export default CommentTitle;