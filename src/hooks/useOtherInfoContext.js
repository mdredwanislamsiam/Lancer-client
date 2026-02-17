import React, { useContext } from 'react';
import OtherInfoContext from '../context/OtherInfoContext';

const useOtherInfoContext = () => {
    return useContext(OtherInfoContext); 
};

export default useOtherInfoContext;