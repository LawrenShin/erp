import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'

import ModalSemantic from '../ModalSemantic'
import Pointer from "../../controls/pointer";
import List from './List'

class UploadModal extends PureComponent {
    state = { files: [], error: '' }

    componentDidMount(){
        if(!this.props.uploadedFiles.status ) this.props.getUploadedContract()
    }

    onDrop = (stage) => {
        if (stage.length === 0) {
            this.setState({ ...this.state, error: 'We accept pdf only' })
            return
        }else{
            const oversized = stage.filter(s => Math.ceil(s.size / 1000000) > 25)
            const names = oversized.map(o => o.name)
            this.setState({ ...this.state, error: `These files are too large - ${names.join(', ')}` })
            if(oversized.length) return
        }

        this.setState({ 
            files: [ ...stage ],
            error: ''
        }, () => {
            console.log('from modal INIT UPLOAD_______')
            this.props.initUploadContract({ supplier: this.props.supplier, files: this.state.files })
        })
    }
    unstageFile = (name) => this.setState({ files: this.state.files.filter(f => f.name !== name) })

    componentWillUnmount(){ this.props.refreshSupplierContracts() }
    
    render() {
        return (
            <>
                <ModalSemantic
                    size="mini"
                    style={{marginLeft: '0 !important'}}
                    trigger={<Pointer className={`card-filters__link -text-color${this.props.uploadedFiles.data.length ? '-green' : '-red'}`}>
                            <i className="icon-upload"></i>
                            <span className="card-filters__title">Upload contract</span>
                        </Pointer>}>

                    <div className="upload__modal">
                       <div className="upload__header">
                            Upload File
                        </div>
                        <div className="upload__body">
                            <Dropzone 
                                accept='application/pdf'    
                                onDrop={this.onDrop}>
                                {({getRootProps, getInputProps}) => (
                                    <section>
                                        <div {...getRootProps({className: ''})}>
                                            <input {...getInputProps()} />
                                            <div className="upload__input">
                                                <i className="icon-upload"></i>
                                                <p className="-title">Drag & Drop or <button type='button'
                                                                                             className="-text-color-blue">Browse</button> files
                                                    to upload
                                                </p>
                                                <p className="-text">Maximum Upload File Size: 25MB</p>
                                            </div>
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                            {this.state.error && <span className='-text-color-red'>{this.state.error}</span>}
                            <List 
                                supplier={this.props.supplier}
                                files={this.state.files}
                                type='upload' />
                            <List 
                                supplier={this.props.supplier}
                                uploadedFiles={this.props.uploadedFiles}
                                type='uploaded' />
                        </div>
                    </div>
                    
                </ModalSemantic>
            </>
        )
    }
}

export default connect(state => ({
    uploadedFiles: state.supplierContracts.uploaded,
}), (dispatch, ownProps) => ({
    refreshSupplierContracts: payload => dispatch({ type: 'REFRESH_CONTRACT' }),
    initUploadContract: payload => dispatch({ type: 'UPLOAD_CONTRACT', payload }),
    getUploadedContract: () => dispatch({ type: 'GET_UPLOADED_CONTRACT', payload: ownProps.supplier }),
}))(UploadModal);