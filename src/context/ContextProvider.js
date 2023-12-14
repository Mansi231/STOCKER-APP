import React, { createContext, useContext, useEffect, useState } from 'react';

export const ValContext = createContext();

const ContextProvider = ({ children }) => {

    const [type,setType] = useState(null)
    const [userDetail,setUserDetail] = useState(null)

    return <ValContext.Provider value={{ type,setType,userDetail,setUserDetail}}>{children}</ValContext.Provider>
}
export default ContextProvider