import axios from "axios"
import { useContext, useEffect, useState } from 'react'
import { Box, Container, Grid, Typography } from "@mui/material"

import InputAmmount from './components/InputAmmount'
import SelectCountry from './components/SelectCountry'
import SwithCurrency from './components/SwithCurrency'
import { CurrencyContext } from "./context/CurrencyContext"
import { fontWeight } from "@mui/system"

function App() {

  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,    
  } = useContext(CurrencyContext)
  const [resultCurrency, setResultCurrency] = useState(0);
  const codeFromCurrency = fromCurrency.split(' ')[1];
  const codeToCurrency = toCurrency.split(' ')[1];

  useEffect(() => {
    if (firstAmount && +firstAmount > 0) {
      axios("https://api.freecurrencyapi.com/v1/latest", {
        params: {
          apikey: "uXb2cN3YGMociBrnRb7F3qC1ihdTgPnQOpjMz46q",
          base_currency: codeFromCurrency,
          currencies: codeToCurrency,
        }
      })
        .then(response => setResultCurrency(response.data.data[codeToCurrency] * firstAmount))
        .catch(error => console.log(error))
    }
  }, [firstAmount, fromCurrency, toCurrency])

  const boxStyles = {
    background: "#fdfdfd",
    marginTop: "5rem",
    textAlign: "center",
    color: "#222",
    minHeight: "20rem",
    borderRadius: 2,
    padding: "4rem 2rem",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    position: "relative"
  }

  const fixResult = function(num) {
    let zeros = -Math.floor( Math.log10(num % 1) + 1);
    console.log( zeros, num )
    if (zeros >= 0 && isFinite(zeros)) {
      return num.toFixed(zeros + 2);
    }
    return num
  }

  return (
    <Container maxWidth="md" sx={boxStyles}>
      <Typography variant='h5' sx={{ marginBottom: "2rem"}}>Stay Ahead with Accurate Conversions</Typography>
      <Grid container spacing={2}>
        <InputAmmount />
        <SelectCountry value={fromCurrency} setValue={setFromCurrency} label="From"/>
        <SwithCurrency />
        <SelectCountry value={toCurrency} setValue={setToCurrency} label="To"/>
      </Grid>

      { (firstAmount && +firstAmount > 0) ? (
        <Box sx={{textAlign: "left", marginTop: "1rem"}}>
          <Typography>{firstAmount} {fromCurrency} =</Typography>
          <Typography variant="h6" sx={{ marginTop: "5px", fontWeight: "bold"}}>{fixResult(resultCurrency)} {toCurrency}</Typography>
        </Box>
      ) : ""}
    </Container>
  )
}

export default App
