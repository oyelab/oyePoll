// `resources/js/Components/Loading.jsx`
import React from 'react';
import loading from '../images/loading.gif';

const Loading = () => {
    return (
        <div className="loading d-none">
			<img src={loading} alt="loading" />;
        </div>
    );
};

export default Loading;