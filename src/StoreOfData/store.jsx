import { createContext, useState } from "react";

export const StoreData = createContext();

export const Store = ({ children }) => {
    const [items, setItems] = useState([]);
    const addItemHandler = (newItem) => {
        setItems((prev) => [...prev, newItem]); // Add the newItem to the existing array using spread operator
    };

    const storeValues = {
        items: items,
        addItem: addItemHandler
    }

    return (<StoreData.Provider value={storeValues}>{children}</StoreData.Provider>)
}


