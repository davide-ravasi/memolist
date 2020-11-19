import React from 'react';

const Header = () => {
    const menuItemsCss = 'px-6 py-1 text-white font-medium text-base hover:bg-gray-600 rounded-md';
    return (
        <div className="containe bg-gray-800 shadow-md">
            <div className="mx-auto max-w-screen-lg flex h-16 flex items-center justify-between h-16">
                <div>
                    <a className="logo px-2">Logo</a>
                    <a href="#" className={menuItemsCss}>Home</a>
                    <a href="#" className={menuItemsCss}>All Lists</a>
                    <a href="#" className={menuItemsCss}>Categories</a>
                </div>
                <div>
                    <span className={menuItemsCss}>User: Davide</span>
                    <a href="#" className={menuItemsCss}>Logout</a>
                </div>
            </div>
        </div>
    )
}

export default Header;