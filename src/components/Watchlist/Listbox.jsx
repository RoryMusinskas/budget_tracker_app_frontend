/* -------- Import React core ------------ */
import React, {
  useEffect,
  useContext,
  createContext,
  forwardRef,
  useRef,
  Children,
  isValidElement,
} from "react";

/* -------- Import MaterialUI core ------------ */
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useTheme } from "@material-ui/core/styles";

/* -------- Import MaterialUI components ------ */

/* -------- Import Custom Components ---------- */
import { VariableSizeList } from "react-window";
import PropTypes from "prop-types";

// Adapter for react-window
// This is now imported as we need to visualise the list as some exchanges(etc. US) have 25000+ stocks, this was making the filtering exteremly slow
// With a virtulized list, it only shows a small number of list elements, which makes searching smooth
const ListboxComponent = forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  // set the amount of items that can be rendered
  const getChildSize = (child) => {
    if (isValidElement(child) && child.type === ListSubheader) {
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

  // return a list with the variable size, this allows faster searching as only a small number of the elements get rendered at a time
  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * 8}
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

// used to render each row in the dropdown
function renderRow(props) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + 8,
    },
  });
}

// creating context to use for the search box
const OuterElementContext = createContext({});

// passing the ref (the element created in the render) down to all child elements
// eslint-disable-next-line react/display-name
const OuterElementType = forwardRef((props, ref) => {
  const outerProps = useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

// reset the cache of the current ref
function useResetCache(data) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}
ListboxComponent.propTypes = {
  children: PropTypes.node,
};

export default ListboxComponent;
