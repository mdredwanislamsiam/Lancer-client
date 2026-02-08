import { createContext } from "react";
import useCategories from "../hooks/useCategories";

const CategoriesContext = createContext(); 
export const CategoriesProvider = ({ children }) => {
    const allContext = useCategories(); 
    return <CategoriesContext.Provider value={allContext}> {children}</CategoriesContext.Provider>; 
}

export default CategoriesContext; 