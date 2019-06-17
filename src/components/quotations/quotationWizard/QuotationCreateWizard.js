import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import QuotationCreateWizardForm from './Form'
import moment from 'moment'
import { createQuotationState } from '../../../ducks/quotations/createQuotation'

import * as Yup from 'yup'

const createQuotationSchema = Yup.object().shape({
  quotation_start_date: Yup.string()
    .required(),
  quotation_expiry_date: Yup.number()
  .required()
})

const errorMessage = (m) => <span className='-error'> {m} </span>


const QuotationCreateWizard = props => {
  const [startDate, setStartDate] = useState(moment().format('DD/MM/YYYY'))
  const [expDate, setExpDate] = useState(moment().add(2, 'weeks').format('DD/MM/YYYY'))

  return (
    <div className="quotation-modal">
      <Formik
      initialValues={{ start_date: startDate, expiry_date: expDate, name: '', type: 'regular', do_not_notify_supplier: true }}
      validate={values => {
        let errors = {};
        return errors;
      }}

      onSubmit={(values, { setSubmitting }) => {
        // as we use a simple bycicle here (react hooks with formik and singledatepicker) we have to reassign these values during submit
        values.start_date = moment(startDate, 'DD/MM/YYYY').format('DD/MM/YYYY')
        values.expiry_date = moment(expDate, 'DD/MM/YYYY').format('DD/MM/YYYY')

        setTimeout(() => {
          props.createQuotation(values);
          setSubmitting(false);
        }, 100);
      }}
    >
      {formikProps => <QuotationCreateWizardForm 
        {...formikProps} 
        setStartDate={setStartDate} 
        startDate={startDate}
        setExpDate={setExpDate} 
        expDate={expDate}
        errorMessage={errorMessage}
        createState={{
          error: props.error, 
          loading: props.loading
        }} />
      }
      </Formik>
    </div>
  );
};

export default connect(
  state => ({
    ...createQuotationState(state)
  }),
  dispatch => ({
    createQuotation: (payload) => dispatch({ type: 'CREATE_QUOTATION', payload })
  })
)(QuotationCreateWizard);