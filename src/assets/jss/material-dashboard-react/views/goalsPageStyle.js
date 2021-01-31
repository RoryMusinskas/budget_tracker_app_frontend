import {
  successColor,
  whiteColor,
  grayColor,
  hexToRgb,
} from "assets/jss/material-dashboard-react";

const goalsPageStyle = {
  successText: {
    color: successColor[0],
  },
  goalsContainer: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "space-around",
  },

  upArrowCardCategory: {
    width: "16px",
    height: "16px",
  },
  cardCategory: {
    color: grayColor[0],
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0",
  },
  cardCategoryWhite: {
    color: "rgba(" + hexToRgb(whiteColor) + ",.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitle: {
    color: grayColor[2],
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1",
    },
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
      lineHeight: "1",
    },
  },
  editGrid: {
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
    cursor: "pointer",
  },
  goalTitle: {
    width: "100%",
  },
};

export default goalsPageStyle;
