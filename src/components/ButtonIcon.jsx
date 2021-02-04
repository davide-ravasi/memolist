import React from 'react';

const ButtonIcon = ({children, faIcon, clickEvent, bgColor }) => (
    <div className={`mr-2 rounded-full py-0.5 px-3 text-white cursor-pointer ${bgColor} transition duration-500 ease-in-out`} onClick={clickEvent}>
        {children}
    </div>
)

export default ButtonIcon;