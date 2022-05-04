import React from 'react';

const commonImgUI =
  "flex justify-center items-center border-2 border-dashed border-gray-400 rounded aspect-video cursor-pointer";

export default function ImgSelector({name, accept, label, selectedImg, onChange, className}) {
  return (
    <div>
      <input
        accept={accept}
        onChange={onChange}
        name={name}
        id={name}
        type="file"
        hidden
      />
      <label htmlFor={name}>
        {selectedImg ? (
          <img
            className={commonImgUI + " object-cover " + className}
            src={selectedImg}
            alt=""
          />
        ) : (
          <ImgUI label={label} className={className} />
        )}
      </label>
    </div>
  );
}

const ImgUI = ({label, className}) => {
    return (
      <div className={commonImgUI + " " + className}>
        <span>
          {label}
        </span>
      </div>
    );
};
  