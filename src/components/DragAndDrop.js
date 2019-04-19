import React from 'react';
import Dropzone from 'react-dropzone';
import Messages from '../requestor/messages';

class DragAndDrop extends React.Component {
  state = { stagedFiles: [] };

   onDrop = (acceptedFiles, rejectedFiles) => {
    console.log(acceptedFiles);
    Messages.uploadFile({ file: acceptedFiles[0], message: this.props.message }).then(res => console.log(res));
   }

   handleClick = () => this.props.toggleDragAndDrop();

   render() {
    return (
      <div className='modal-overlay' onClick={this.handleClick}>
        <Dropzone onDrop={this.onDrop}>
          {({getRootProps, getInputProps, isDragActive}) => {
            return (
                <div
                  {...getRootProps()}
                  className={['dropzone', isDragActive ? 'dropzone--isActive' : ''].join(' ')}
                >
                  <input {...getInputProps()} />
                  {
                    isDragActive ?
                      <div className='drag drag-active'><p>Good boy!</p></div> :
                      <div className='drag'><p>Drag or click here to upload.</p></div>
                  }
                </div>
            )
          }}
        </Dropzone>
      </div>
    );
  }
}

export default DragAndDrop;