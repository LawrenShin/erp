import React from 'react'

import ModalSemantic from '../common/ModalSemantic'
import QuotationCreateWizard from './quotationWizard/QuotationCreateWizard'

const modalTrigger = () => <span className="page-heading__icon page-heading__icon_circle"><i className="icon-plus-2"></i></span>

const QuotationHeader = (props) => {
    return (
        <>
            <div className="page-heading">
                <div className="page-heading__title">
                    <div className="page-heading__top">
                        <h1 className="h1">{props.title}</h1>
                        {typeof props.link === 'undefined' ? <ModalSemantic
                            style={ {marginLeft: '0 !important'} }
                            trigger={ modalTrigger() }>
                                <QuotationCreateWizard />
                        </ModalSemantic> : ''}
                    </div>
                    {(props.subtitle) ? <h2 className="page-subtitle">{props.subtitle}</h2> : ''}
                </div>
            </div>
        </>
    );
};

export default QuotationHeader;