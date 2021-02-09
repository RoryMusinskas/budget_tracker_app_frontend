import {
  successColor,
  whiteColor,
  grayColor,
  hexToRgb
} from "assets/jss/material-dashboard-react.js";

const incomesStyle = {
  successText: {
    color: successColor[0]
  },
  upArrowCardCategory: {
    width: "16px",
    height: "16px"
  },
  stats: {
    color: grayColor[0],
    display: "inline-flex",
    fontSize: "12px",
    lineHeight: "22px",
    "& svg": {
      top: "4px",
      width: "16px",
      height: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      top: "4px",
      fontSize: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px"
    }
  },
  cardCategory: {
    color: grayColor[0],
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0"
  },
  cardCategoryWhite: {
    color: "rgba(" + hexToRgb(whiteColor) + ",.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitle: {
    color: grayColor[2],
    marginTop: "20px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "40px",
    marginBottom: "3px",
    textAlign: "center",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  cardTitleWhite: {
    color: whiteColor,
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  // user styles
  incomesContainer: {
    display: "flex",
    minHeight: "80vh",
    justifyContent: "center",
  },
  incomesAnalysisContainer: {
    height: "80vh",
  },
  incomesAnalysisCard: {
    height: "80vh",
  },
  incomesHistoryContainer: {
    height: "80vh",
  },
  incomesHistoryCard: {
    height: "80vh",
    maxWidth: "100%",
  },
  incomesHistoryCardHeader:{
    position: "relative",
  },
  incomesHistoryCardBody: {
    overflowY: "scroll",
    maxHeight: "80vh",
    maxWidth: "95%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  sortButton: {
    position: "absolute",
    bottom: "20px",
    right: "20px",
  },
  addIncomesButton: {
    margin: "20px",
  }
};

export default incomesStyle;