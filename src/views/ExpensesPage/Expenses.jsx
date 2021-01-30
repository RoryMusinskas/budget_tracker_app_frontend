import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Expenses } from "../../components/Expenses/Expenses"

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

export function ExpensesPage() {
  const classes = useStyles();

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
                  {/* Expenses component */}
                  <Expenses/> 
                </CardBody>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </GridContainer>
    </>
  );
}
