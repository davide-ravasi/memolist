import React from 'react';
import Spinner from './Spinner';

const WithSpinner = WrappedComponent => ({isLoading, bgColor, text, ...props}) => {
        {return isLoading ? 
            <Spinner bgColor={bgColor} text={text} />  : <WrappedComponent {...props} /> : 
            <Wrappedcomponent />
        }    
}

export default WithSpinner;