import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { VariableSizeList } from "react-window";
import { Typography } from "@material-ui/core";
import Loading from "components/Loading";

const LISTBOX_PADDING = 8; // px

// used to render each row in the dropdown
function renderRow(props) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
    },
  });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
// This is now imported as we need to visualise the list as some exchanges(etc. US) have 25000+ stocks, this was making the filtering exteremly slow
// With a virtulized list, it only shows a small number of list elements, which makes searching smooth
const ListboxComponent = React.forwardRef(function ListboxComponent(
  props,
  ref
) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};

const useStyles = makeStyles({
  listbox: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

const renderGroup = (params) => [
  <ListSubheader key={params.key} component="div">
    {params.group}
  </ListSubheader>,
  params.children,
];

// The logic to select the stock the user wants to add to watch list
export default function SymbolSelect(props) {
  const classes = useStyles();
  const [exchangeList, setExchangeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // on component load, run the fetch exchange list
  useEffect(() => {
    // fetchExchangeList(props.selectedExchange);
    fetchExchangeList(props.selectedExchange.code);
  }, []);

  // check to see if the fetch is still running and waiting for response
  useEffect(() => {
    if (exchangeList.length !== 0) {
      setIsLoading(false);
    }
  }, [exchangeList]);

  // fetch the exchange whole exchange the user is requesting
  const fetchExchangeList = async (exchange) => {
    try {
      await fetch(
        `https://finnhub.io/api/v1/stock/symbol?exchange=${exchange}&token=c07ptg748v6retjapjdg`
      )
        .then((response) => response.json())
        .then((data) => {
          setExchangeList(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectedShare = () => {
    return (event, share) => {
      if (props.selectedExchange.code === "US") {
        // Check to see if its in NASDAQ
        if (share.mic === "XNGS") {
          props.selectedExchange.tradingViewCode = "NASDAQ";
        }
      }
      if (share !== null) {
        props.setSelectedShare(
          `${props.selectedExchange.tradingViewCode}:${
            share.symbol.split(".")[0]
          }`
        );
      }
    };
  };

  // return the material-ui autocomplete component (this is the search box)
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Autocomplete
          id="virtualize-demo"
          style={{ width: 300 }}
          disableListWrap
          classes={classes}
          ListboxComponent={ListboxComponent}
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
              label={`All listed ${props.selectedExchange.code} shares`}
            />
          )}
          renderOption={(option) => {
            return <Typography noWrap>{option.description}</Typography>;
          }}
        />
      )}
    </>
  );
}
