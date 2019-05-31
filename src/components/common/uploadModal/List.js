import React from 'react'
import uuid from 'uuid'
import Loading from '../../helpers/loading'
import { connect } from 'react-redux'

import UploadBar from './UploadBar'
import UploadedFile from './UploadedFile'


const list = (props) => {  
  if(props.type === 'uploaded'){
    if(!props.uploadedFiles.status ) props.getUploadedContract(props.supplier)

    const renderUploaded = (files) => files.map(f => <UploadedFile 
      key={uuid()} 
      file={f}
      deleteFile={props.deleteUploadedContract}
      supplier={props.supplier} />)

    return (<>
      {
        props.uploadedFiles.status === 'loading' ? 
          <Loading />
        :
          props.uploadedFiles.data.length ? 
            renderUploaded(props.uploadedFiles.data)
          :
            null
      }
    </>)
  }else{
    const renderUpload = file => <UploadBar key={uuid()} file={file} />

    return (<>
      {props.files.length > 0 && props.files.map((f, i) => renderUpload(f, i))}
    </>)
  }
}


const mapStateToProps = (state, ownProps) => {
  if(ownProps.type === 'uploaded'){
    return {
      uploadedFiles: state.supplierContracts.uploaded
    }
  }else{
    return {
      loading: state.supplierContracts.loading
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  if(ownProps.type === 'uploaded'){
    return {
      deleteUploadedContract: payload => dispatch({ type: 'DELETE_UPLOADED_CONTRACT', payload }),
      getUploadedContract: payload => dispatch({ type: 'GET_UPLOADED_CONTRACT', payload }),
    }
  }else{
    return {
      
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(list)