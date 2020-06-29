import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonClick}) => {
    return (
        <div>
            <p className='f4'>
                {'This magic Brain will detect faces on your pictures. Give it a try!'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='w-70  f4' type='text' onChange={onInputChange} />
                    <button onClick={onButtonClick} className='w-30 f4 grow link ph3 pv2 dib white bg-blue ' >Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;