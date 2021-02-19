import React from 'react';

const ButtonIcon = ({children, clickEvent, bgColor, title }) => (
    <button className={`mr-2 rounded-full py-0.5 px-3 text-white cursor-pointer ${bgColor} transition duration-500 ease-in-out`} onClick={clickEvent} title={title}>
        {children}
    </button>
)

export default ButtonIcon;