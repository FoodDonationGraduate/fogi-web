import * as React from 'react';
import { useState, useRef } from 'react';
import { Button } from 'react-bootstrap';

const reduceString = (str) => {
  if (str.length > 9) {
    const result = str.split('.');
    return result[0].substring(0, 9) + '...' + result[1];
  }
  return str;
};

const UploadButton = ({
  label,
  type,
  setValue,
  allowMultiple=false
}) => {
  const [fileName, setFileName] = useState(null);
  const inputRef = useRef(null);

  const handleUpload = () => {
    inputRef.current?.click();
  };

  const handleDisplayFileDetails = () => {
    inputRef.current?.files && setFileName(inputRef.current.files[0].name);
    const files = inputRef.current.files;
    if (!allowMultiple) setValue(files[0]);
    else setValue(files);
  };

  return (
    <div>
      <input
        ref={inputRef}
        onChange={handleDisplayFileDetails}
        accept={type}
        className='d-none'
        type='file'
        multiple={allowMultiple}
      />
      {(!fileName || allowMultiple) && (
        <Button onClick={handleUpload} variant='outline-secondary'>
          {label}
        </Button>
      )}
      {(fileName && !allowMultiple) && (
        <Button className='fogi' onClick={handleUpload} variant='primary'>
          {reduceString(fileName)}
        </Button>
      )}
    </div>
  );
};

export default UploadButton;
