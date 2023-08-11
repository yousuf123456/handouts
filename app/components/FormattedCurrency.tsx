
import React from 'react'
import Currency from "react-currency-formatter"

interface FormattedCurrencyProps {
  quantity : number;
}

export const FormattedCurrency: React.FC<FormattedCurrencyProps> = ({
    quantity
}) => {
  return (
    <Currency 
      quantity={quantity}
      currency="PKR"
      pattern="##,### !"
    />
  )
}
