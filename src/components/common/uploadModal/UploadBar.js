import React from 'react'
import { connect } from 'react-redux'

const UploadBar = (props) => {
  return (
    <div className="upload__row">
      <div className="upload__row__label">{props.file.name}<br/>{props.file.size / 1000000}Mb</div>
      <div className="upload__row__content">
        <div className="download-line">
          <div className="download-line__bg">
            <div className="download-line__status" style={{width: props.percentage + '%'}}></div>
          </div>
          <button type="button" className='download-line__stop'><i className="icon-close"></i></button>
        </div>
      </div>
    </div>
  )
}
export default connect((state, ownProps) => ({
  percentage: state.supplierContracts.loading.progress[ownProps.file.name]
}), dispatch => ({
  cancelUpload: (fileName) => dispatch({ type: 'CANCEL_UPLOAD', payload: fileName })
}))(UploadBar)