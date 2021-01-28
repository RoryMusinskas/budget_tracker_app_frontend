import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Grid from "@material-ui/core/Grid";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import { makeStyles } from "@material-ui/core/styles";

import { useAuth0 } from "@auth0/auth0-react";

import styles from "assets/jss/material-dashboard-react/views/expensesStyle";

const useStyles = makeStyles(styles);

export function Expenses() {
  const { getAccessTokenSilently } = useAuth0();
  const [expenses, setExpenses] = useState([]);
  const classes = useStyles();

  // A cleaner way to fetch with token
  async function fetchExpenses() {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(
        `${process.env.REACT_APP_RAILS_API_URL}/expenses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = await response.json();
      setExpenses(responseData);
    } catch (e) {
      console.error("Error: ", e.message);
    }
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <>
      <div className={classes.newButton}>
      <NavLink to="/admin/expenses/new">
        <Button variant="contained" color="primary">
          <Icon>add_circle</Icon> New Expense
        </Button>
      </NavLink>
      </div>

      <GridContainer className={classes.expensesContainer}>
        <Grid item xs={12} md={12} lg={12} xl={8}>
          <Grid className={classes.expenseAnalysisContainer}>
            <Grid item xs={12} md={12} lg={7} xl={7}>
              <Card></Card>
            </Grid>
          </Grid>
          <Grid className={classes.expensesHistoryContainer}>
            <Grid item xs={12} md={12} lg={5} xl={5}>
              <Card className={classes.expenseHistoryCard}>
                  <h3 className={classes.cardTitle}>Expenses History</h3>
                <CardBody>
                  <ol>
                    {expenses.map((expense, index) => {
                      return (
                        <>
                          <li key={index}>
                            <ul>
                              <li>Description: {expense.description}</li>
                              <li>Amount: ${expense.amount}</li>
                            </ul>
                          </li>
                        </>
                      );
                    })}
                  </ol>
                </CardBody>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </GridContainer>
    </>
  );
}
