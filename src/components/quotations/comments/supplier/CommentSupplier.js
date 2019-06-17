import React, {Component} from 'react';

import Loading from '../../../helpers/loading'
import CommonButton from '../../../common/CommonButton'

import CommentTitle from '../manager/CommentTitle'
import CommentFormSupplier from './CommentFormSupplier'
import CommentAnswer from './CommentAnswer'

class CommentManager extends Component {
    render() {
        return (
            <>
                <div className="quotation__comment -supplier-page">
                    <CommentTitle text='Changes request'/>
                    {/* Текст который писали менеджеры */}
                    <CommentAnswer count='001' text='Please change the length of sleeve to 42cm'/>
                    <CommentFormSupplier/>
                </div>
            </>
        );
    }
}

export default (CommentManager);