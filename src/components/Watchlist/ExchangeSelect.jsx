import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import allExchanges from "variables/exchanges";

// get the exchanges from the imported exchange variable file
const exchanges = allExchanges.allExchanges;

// styles for the select
const useStyles = makeStyles({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

// get the countryCode and convert it to a flag
function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
}

// The logic to select the exchange the person wants to pick a stock from
export default function ExchangeSelect(props) {
  const classes = useStyles();

  return (
    <>
      {
        // use the autocompleted module, this will suggest based on what the user types
      }
      <Autocomplete
        id="exchange-select"
        style={{ width: 300 }}
        options={exchanges}
        classes={{
          option: classes.option,
        }}
        autoHighlight
        // this is what is diplayed after a user clicks an option
        getOptionLabel={(option) => {
          return `${option.code} (${option.name})`;
        }}
        onChange={(event, exchange) => props.setSelectedExchange(exchange)}
        // what to show for each exchange
        renderOption={(option) => (
          <>
            <span>{countryToFlag(option.countryCode)}</span>
            {option.name} {`(${option.code})`}
          </>
        )}
        // render the input for the user to type into
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose an exchange"
            variant="outlined"
            inputProps={{
              ...params.inputProps,
            }}
          />
        )}
      />
    </>
  );
}
