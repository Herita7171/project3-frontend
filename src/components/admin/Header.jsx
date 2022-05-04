import React, { useEffect, useRef, useState } from 'react';

export default function Header({onAddShopClick, onAddBrandClick}) {
    const [displayOptions, setDisplayOptions] = useState(false);
    const options = [{title: "Add a Brand", onClick: onAddBrandClick}];
  return (
    <div className='flex justify-end relative pr-2'>
        <button onClick={() => setDisplayOptions(true)} className='flex space-x-2 bg-red-300 text-white hover:opacity-80 
        transition font-semibold border-2 border-red-200 rounded text-base px-3 py-1'>
            <div>
                Create
            </div>
        </button>
        <CreateOptions visible={displayOptions} onClose={() => setDisplayOptions(false)} options={options}/>
    </div>
  );
}

const CreateOptions = ({options, visible, onClose}) => {
    const container = useRef();
    const containerId = "option-container";
    useEffect(() => {
        const handleClose = (e) => {
            if (!visible) {
                return;
            }
            const {parentElement, id} = e.target;
            if (parentElement.id === containerId || id === containerId) {
                return;
            }
            container.current.classList.remove('animate-scale');
            container.current.classList.add('reverse');
        }
        document.addEventListener("click", handleClose);
        return () => {
            document.removeEventListener("click", handleClose);
        };
    }, [visible]);

    const handleAnimationEnd = (e) => {
        if (e.target.classList.contains("reverse")) {
            onClose();
        }
        e.target.classList.remove("animate-scale");
    }

    const handleClick = (fn) => {
        fn();
        onClose();
    }

    if (!visible) {
        return null;
    }
    return (
        <div id={containerId} ref={container} className='absolute right-0 top-12 flex flex-col space-y-3 p-5 text-white bg-red-300 z-50 
        border-1 border-gray-200 rounded drop-shadow-lg animate-scale' onAnimationEnd={handleAnimationEnd}>
            {options.map(({title, onClick}) => {
                return (<Option key={title} onClick={() => handleClick(onClick)}>{title}</Option>);
            })}
        </div>
    );
}

const Option = ({children, onClick}) => {
    return(
        <button onClick={onClick} className='hover:opacity-60 transition'>
            {children}
        </button>
    );
}
