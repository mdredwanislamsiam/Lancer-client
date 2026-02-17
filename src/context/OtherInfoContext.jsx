import React, { createContext } from 'react';
import useOtherInfo from '../hooks/useOtherInfo';

const OtherInfoContext = createContext(); 

export const OtherInfoProvider = ({ children }) => {
    const allContext = useOtherInfo();
    return <OtherInfoContext.Provider value={allContext}>{children}</OtherInfoContext.Provider>
}; 

export default OtherInfoContext;