import {
  successColor,
  whiteColor,
  grayColor,
  hexToRgb,
} from "assets/jss/material-dashboard-react";

const landingPageStyle = {
  landingPageContainer: {
    minHeight: "100vh",
  },
  headerContainer: {
    height: "70%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {},
  buttonContainer: {
    height: "30%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  successText: {
    color: successColor[0],
  },
  aboutPageContainer: {
    textAlign: "center",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  aboutHeaderContainer: {
    height: "10vh",
  },
  aboutContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  aboutInfoContainer: {
    minHeight: "30vh",
    display: "flex",
    justifyContent: "space-between",
  },
  aboutImageContainer: {
    height: "60vh",
  },
  aboutImage: {
    height: "100%",
    objectFit: "cover",
    width: "100%",
  },
  featuresPageContainer: {
    minHeight: "100vh",
    textAlign: "center",
  },
  featuresHeaderContainer: {
    height: "10%",
  },
  featuresContainer: {
    height: "90%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  featuresIncomeImage: {
    height: "30%",
    maxHeight: "350px",
    objectFit: "cover",
    width: "100%",
  },
  featuresExpenseImage: {
    height: "30%",
    maxHeight: "350px",
    objectFit: "cover",
    width: "100%",
  },
  featuresSharesImage: {
    height: "30%",
    maxHeight: "350px",
    objectFit: "cover",
    width: "100%",
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
};

export default landingPageStyle;
