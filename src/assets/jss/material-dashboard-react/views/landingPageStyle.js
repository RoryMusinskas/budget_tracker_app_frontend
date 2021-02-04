import { successColor } from "assets/jss/material-dashboard-react";

const landingPageStyle = {
  landingPageContainer: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    background: `linear-gradient(125deg, #ECFCFF 0%, #ECFCFF 40%, #B2FCFF calc(40% + 1px), #B2FCFF 60%, #5EDFFF calc(60% + 1px), #5EDFFF 72%, #3E64FF calc(72% + 1px), #3E64FF 100%)`,
  },
  loginContainer: {
    display: "flex",
    justifyContent: "flex-end",
    height: "3vh",
  },
  buttons: {
    padding: "20px 20px 0px 0px",
    cursor: "pointer",
    color: "black",
  },
  headerContainer: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  headerFooterContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dropDownArrow: {
    fontSize: "100px",
    textDecoration: "none",
  },
  buttonContainer: {
    height: "30%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  successText: {
    color: successColor[0],
  },
  featurePageContainer: {
    textAlign: "center",
    minHeight: "100vh",
    display: "flex",
    alignItems: "space-around",
    justifyContent: "center",
    backgroundColor: "white",
  },
  featureContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "40px",
  },
  featureImage: {
    height: "20vh",
  },
  featuresPageContainer: {
    minHeight: "100vh",
    textAlign: "center",
  },
  featuresHeaderContainer: {
    height: "10%",
  },
  featuresContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  upArrowCardCategory: {
    width: "16px",
    height: "16px",
  },
};

export default landingPageStyle;
