import React from 'react'
import moment from 'moment'
import SingleDatePickerComponent from '../../common/SingleDatePickerComponent'
import Loading from '../../helpers/loading'
import {Message} from 'semantic-ui-react'

//an attempt to set startDate
const twoWeeksCheck = (day) => {
    const twoWeeks = moment().add(13, 'days')
    console.log(day.diff(twoWeeks, 'days'), day.diff(twoWeeks, 'days') > 13)
    if (day.diff(twoWeeks, 'days') > 13) return false
    return true
}

const QuotationCreateWizardForm = (props) => (
    <form className="quotation-modal__content -sm" onSubmit={props.handleSubmit}>
        <h2>Create Quotation Wizard</h2>
        <div className="quotation-modal__params">
            <div className="quotation-modal__params__row">
                {/* <!-- Кирилл, я тут ввел модификаторы размеров, например -lg - 50% и -sm - 20%, но можешь не использовать и задвать ширину стилем --> */}
                <div className="quotation-modal__params__item -lg">
                    <div className="box-field">
                        <label className="box-field__label" htmlFor="name">Quotation name</label>
                        <input type="text" className="box-field__input undefined"
                               onChange={props.handleChange}
                               value={props.values.name}
                               id="name"
                               name="name"
                               type="name"
                               value={props.values.name}/>
                    </div>
                </div>
                <div className="quotation-modal__params__item -sm">
                    <div className="box-field -date-icon">
                        <label className="box-field__label"
                               htmlFor="quotation_start_date">Quotation starts date</label>
                        <SingleDatePickerComponent
                            date={props.startDate}
                            saveDate={props.setStartDate}
                            openDirection='down'
                            simple={true}/>
                    </div>
                </div>
                <div className="quotation-modal__params__item -sm">
                    <div className="box-field -date-icon">
                        <label className="box-field__label" htmlFor="quotation_expiry_date">Expiry date</label>
                        <SingleDatePickerComponent
                            twoWeeksCheck={twoWeeksCheck}
                            date={props.expDate}
                            saveDate={props.setExpDate}
                            openDirection='down'
                            simple={true}/>
                    </div>
                </div>
            </div>
            {/*<div className="quotation-modal__params__row">
        <div className="quotation-modal__params__item -flex -lg">
          <div className="checkbox-elem">
            <input 
              type="radio" 
              id="regular_period" 
              name="type" 
              value='regular'
              defaultChecked={true}
              onChange={props.handleChange} />
            <label className="checkbox-label" htmlFor="regular_period">Regular</label>
          </div>
          <div className="checkbox-elem">
            <input 
              type="radio" 
              id="urgent_period" 
              name="type"
              value='urgent'
              onChange={props.handleChange} />
            <label className="checkbox-label" htmlFor="urgent_period">Urgent</label>
          </div>
        </div>
        <div className="quotation-modal__params__item">
          <div className="checkbox-elem">
            <input 
              type="checkbox" 
              id="do_not_notify_supplier" 
              name="do_not_notify_supplier"
              onChange={props.handleChange} />
            <label className="checkbox-label" htmlFor="do_not_notify_supplier">Do not notify supplier</label>
          </div>
        </div>
      </div>*/}
        </div>
        <div className="options-buttons quotation-modal__buttons">
            {props.createState.loading ? <Loading/> :
                <div className="btn btn2 btn-save" onClick={props.handleSubmit}>Create</div>}
            {props.createState.error && <Message color='red'>{props.createState.error}</Message>}
            {/* <div className="btn">Cancel</div> */}
        </div>
    </form>);

export default QuotationCreateWizardForm