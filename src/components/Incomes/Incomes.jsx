// Import React
import React, { useEffect } from "react";
// Import Auth0
import { useAuth0 } from "@auth0/auth0-react";
// Icon import from material ui
import { DeleteForever } from "@material-ui/icons";
import Box from '@material-ui/core/Box';
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import { makeStyles } from "@material-ui/core/styles";
import { EditIncomeModal } from "./EditIncomeModal";
import Grid from "@material-ui/core/Grid";
// Style import
import styles from "../../assets/jss/material-dashboard-react/components/IncomesComponent/incomesComponentStyle"

const useStyles = makeStyles(styles);

export function Incomes(props) {
  const { incomes, setIncomes, deletedOrUpdated, setDeletedOrUpdated } = props
  const classes = useStyles();
  // Auth0 Hook
  const { getAccessTokenSilently, user } = useAuth0();

  // Fetching data from backend
  async function fetchIncomes() {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(
        `${process.env.REACT_APP_RAILS_API_URL}/incomes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = await response.json();
      setIncomes(responseData); // Sets state for prop drilling/lifting state
    } catch (e) {
      console.error("Error: ", e.message);
    }
  }

  // useEffect mounts the API call
  useEffect(() => {
    fetchIncomes();
  }, [deletedOrUpdated]);

  // Onclick delete function
  async function onClickDelete(e, income) {
    try {
      // Prevent default page reload on submit
      e.preventDefault();
      // Confirmation to delete income
      if (window.confirm(`Delete income: ${income.title}?`)) {
        const token = await getAccessTokenSilently();
        await fetch(
          `${process.env.REACT_APP_RAILS_API_URL}/incomes/${income.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${token}`,
            },
            body: JSON.stringify({
              income: {
                title: income.title, // title for income
                description: income.description,
                category_id: income.category,
                amount: income.amount,
                user_sub: user.sub, // user_sub for identifying each unique user
                date: income.date,
              },
            }),
          }
        );
        fetchIncomes();
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      {incomes.map((income, index) => {
        // Switch statement to render category name instead of id
        switch(income.category_id) {
          case 6:
            income.category = "Wages"
            break
          case 7:
            income.category = "Shares"
            break
          case 8:
            income.category = "Interest"
            break
          case 9:
            income.category = "Investment"
            break
          case 5:
            income.category = "Others"
            break
          default:
            income.category = "Wrong category"
            break
        }
        // EditIncomeModal component is propped drilled income.id for
        // identifying each unique income
        return (
        <Grid item xs={11} md={11} lg={5} xl={5} key={`IncomesComponentGrid${index}`} className={classes.incomesGrid}>
          <Card key={`IncomeCardComponent${index}`} className={classes.card} variant="outlined">
            <CardHeader key={`IncomeCardHeader${index}`} className={classes.incomeCardHeader}>
            <DeleteForever key={`IncomeDeleteIcon${index}`} style={{color: "black"}} onClick={(e) => onClickDelete(e, income)} className={classes.incomeDeleteButton} ></DeleteForever>
            <EditIncomeModal key={`IncomeEditIcon${index}`} incomeId={income.id} deletedOrUpdated={deletedOrUpdated} setDeletedOrUpdated={setDeletedOrUpdated} incomes={incomes}></EditIncomeModal>
              <h3 key={`${income.title}${index}`}><strong>{income.title}</strong></h3>
              <p key={`${income.date}${index}`}>{income.date}</p>
            </CardHeader>
            <CardBody key={`IncomeCardBody${index}`}>
              <p key={`${income.amount}${index}`}><strong>Amount</strong>: ${income.amount}</p>
              <p key={`${income.category}${index}`}><strong>Category</strong>: {income.category}</p>
              <p key={`${income.description.charAt(0)}${index}`}><strong>Description</strong>:</p> 
              <div key={`div${index}`} style={{maxHeight: "100px", overflowY: "scroll"}}>
                <Box key={`description${income.description.charAt(0)}${index}`}component="div">
                  {income.description}
                </Box>
              </div>
            </CardBody>
          </Card>
        </Grid>
        );
      })}
    </>
  );
}