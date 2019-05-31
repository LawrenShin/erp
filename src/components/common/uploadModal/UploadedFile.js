import React from 'react';

export default function UploadedFile(props) {
  return (
    <div className="upload__row">
        <div className="upload__row__label">{props.file.local_file_name}</div>
        <div className="upload__row__content">
            <div className="-flex">
                <a target='_blank' rel='noopener noreferrer' href={props.file.file}>
                  <i className="icon-file"></i>
                </a>
                <button 
                  type='button' 
                  onClick={() => props.deleteFile({ 
                    fileId: props.file.id,
                    supplierId: props.supplier
                  })}
                  >
                    <i className="icon-trash"></i>
                </button>
            </div>
        </div>
    </div>
  );
}