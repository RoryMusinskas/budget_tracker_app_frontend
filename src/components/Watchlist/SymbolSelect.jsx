/* -------- Import React core ------------ */
import React, { useState, useEffect } from "react";

/* -------- Import MaterialUI core ------------ */
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ListSubheader from "@material-ui/core/ListSubheader";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

/* -------- Import Custom Components ---------- */
import Loading from "components/Loading";
import Listbox from "./Listbox";

// the styles for the listbox
const useStyles = makeStyles({
  listbox: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

// The logic to select the stock the user wants to add to watch list
export default function SymbolSearch(props) {
  const classes = useStyles();
  const [exchangeList, setExchangeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const selectedExchangeCode = props.selectedExchange.code;
  let tradingViewCode = props.selectedExchange.tradingViewCode;

  // on component load, run the fetch exchange list
  useEffect(() => {
    // fetch the exchange whole exchange the user is requesting
    const fetchExchangeList = async () => {
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/stock/symbol?exchange=${selectedExchangeCode}&token=c07ptg748v6retjapjdg`
        );
        const data = await response.json();
        setExchangeList(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchExchangeList();
  }, [selectedExchangeCode]);

  // set the state of the watchlist to the value of the share selected
  const handleSelectedShare = () => {
    return (event, share) => {
      // As the American markets are joined together in the api, we have to see which market it is from via the mic, then convert that to the same code as tradingView has
      if (selectedExchangeCode === "US") {
        // Check to see if its in NASDAQ
        if (share.mic === "XNGS") {
          tradingViewCode = "NASDAQ";
        }
      }
      // set the state of the watchlist selected share
      if (share !== null) {
        props.setSelectedShare({
          description: share.description,
          symbol: `${tradingViewCode}:${share.symbol.split(".")[0]}`,
        });
      }
    };
  };

  // render a group of items, based on grouping rule passed in
  const renderGroup = (params) => [
    <ListSubheader key={params.key} component="div">
      {params.group}
    </ListSubheader>,
    params.children,
  ];

  // return the material-ui autocomplete component (this is the search box)
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Autocomplete
          id="stock-list"
          style={{ width: 300 }}
          disableListWrap
          classes={classes}
          ListboxComponent={Listbox}
          renderGroup={renderGroup}
          getOptionLabel={(option) => {
            return `${option.description}`;
          }}
          options={exchangeList}
          groupBy={(option) => option.symbol.toUpperCase()}
          onChange={handleSelectedShare()}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label={`All listed ${selectedExchangeCode} shares`}
            />
          )}
          renderOption={(option) => {
            return <Typography noWrap>Select a stock</Typography>;
          }}
        />
      )}
    </>
  );
}
