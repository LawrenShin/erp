import React from 'react';

const UploadBar = (props) => {
  return (
    <div className="upload__row">
      <div className="upload__row__label">{props.file.name}<br/>{props.file.size / 1000000}Mb</div>
      <div className="upload__row__content">
        <div className="download-line">
          <div className="download-line__bg"></div>
          <div className="download-line__status" style={{width: '83%'}}></div>
          <button type="button" className='download-line__stop'><i className="icon-close"></i></button>
        </div>
      </div>
    </div>
  )
}
export default UploadBar