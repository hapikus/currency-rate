import React from 'react'
import {useContext} from 'react'
import { Button, Grid } from "@mui/material"
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { CurrencyContext } from '../context/CurrencyContext';

const SwithCurrency = () => {

    const {
        fromCurrency,
        setFromCurrency,
        toCurrency,
        setToCurrency,
      } = useContext(CurrencyContext)

    function handleSwtich() {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    }

    return (
        <Grid item xs={12} md={1} sm={1.4}>
            <Button
                onClick={handleSwtich}
                sx={{
                    borderRadius: 1,
                    height: "100%",
                }
            }>
                <CompareArrowsIcon sx={{ fontSize: 30 }}/>
            </Button>
        </Grid>
    )
}

export default SwithCurrency