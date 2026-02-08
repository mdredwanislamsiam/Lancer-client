import { Children, createContext } from "react";
import useService from "../hooks/useService";

const ServiceContext = createContext(); 

export const ServiceProvider = ({ children }) => {
    const allContext = useService()
    return <ServiceContext.Provider value={allContext}>{children}</ServiceContext.Provider>
}

export default ServiceContext; 