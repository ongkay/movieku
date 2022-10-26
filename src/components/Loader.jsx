import React from 'react';

const Loader = ({ className, children, ...others }) => {
    return (
        <div
            className={`${className} animate-pulse bg-dark-lighten rounded-md `}
            {...others}
        >
            {children}
        </div>
    );
};

export default Loader;
