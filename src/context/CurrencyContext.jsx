import React from 'react'
import { createContext, useState } from 'react'

export const CurrencyContext = createContext();

const CurrencyProvider = ({ children }) => {
    const [fromCurrency, setFromCurrency] = useState('🇷🇺 RUB - Russia');
    const [toCurrency, setToCurrency] = useState('🇺🇸 USD - United States');

    const [firstAmount, setFirstAmount] = useState("");

    const value = {
        fromCurrency,
        setFromCurrency,
        toCurrency,
        setToCurrency,
        firstAmount,
        setFirstAmount,
    };

    return (
        <CurrencyContext.Provider value={value}
        >{ children }</CurrencyContext.Provider>
    )
}

export default CurrencyProvider