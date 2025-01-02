// `resources/js/Components/SideArea.jsx`
import React from 'react';
import avatar from '../images/avatar.png';

const SideArea = () => {
    return (
        <div className="sideArea">
            <div className="avatarImg">
				<img src={avatar} alt="Avatar" />
				<div className="imgShape"></div>
            </div>
        </div>
    );
};

export default SideArea;