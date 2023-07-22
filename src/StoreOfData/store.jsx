import { createContext, useState } from "react";

export const StoreData = createContext();

export const Store = ({ children }) => {
    const [items, setItems] = useState([]);
    const addItemHandler = async (newItem) => {
        const data = await newItem;
        console.log('from store context ', data)
        setItems([...data]);
        console.log("items from Store Context",items)
    };

    const storeValues = {
        items: items,
        addItem: addItemHandler
    }

    return (<StoreData.Provider value={storeValues}>{children}</StoreData.Provider>)
}


