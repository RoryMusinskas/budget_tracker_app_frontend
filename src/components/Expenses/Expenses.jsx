// Import React
import React, { useEffect } from "react";
// Import Auth0
import { useAuth0 } from "@auth0/auth0-react";
// Import from react-router-dom
import { Link } from "react-router-dom";
// Icon import from material ui
import { DeleteForever } from "@material-ui/icons";
import EditIcon from "@material-ui/icons/Edit";
import Box from '@material-ui/core/Box';
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import { makeStyles } from "@material-ui/core/styles";
// Style import
import styles from "../../assets/jss/material-dashboard-react/components/ExpensesComponent/expensesComponentStyle"

const useStyles = makeStyles(styles);

export function Expenses(props) {
  // Auth0 Hook
  const { getAccessTokenSilently, user } = useAuth0();
  const classes = useStyles();

  // Fetching data from backend
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
      props.setExpenses(responseData); // Sets state for prop drilling/lifting state
    } catch (e) {
      console.error("Error: ", e.message);
    }
  }

  // useEffect mounts the API call
  useEffect(() => {
    fetchExpenses();
  }, []);

  // Onclick delete function
  async function onClickDelete(e, expense) {
    try {
      // Prevent default page reload on submit
      e.preventDefault();
      // Confirmation to delete expense
      if (window.confirm(`Delete expense: ${expense.title}?`)) {
        const token = await getAccessTokenSilently();
        await fetch(
          `${process.env.REACT_APP_RAILS_API_URL}/expenses/${expense.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${token}`,
            },
            body: JSON.stringify({
              expense: {
                title: expense.title, // title for expense
                description: expense.description,
                category_id: expense.category,
                amount: expense.amount,
                user_sub: user.sub, // user_sub for identifying each unique user
                date: expense.date,
              },
            }),
          }
        );
        fetchExpenses();
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      {props.expenses.map((expense) => {
        // Switch statement to render category name instead of id
        switch(expense.category_id) {
          case 1:
            expense.category = "Grocery"
            break
          case 2:
            expense.category = "Travel"
            break
          case 3:
            expense.category = "Entertainment"
            break
          case 4:
            expense.category = "Necessity"
            break
          case 5:
            expense.category = "Others"
            break
          default:
            expense.category = "Wrong category"
            break
        }
        return (
          <Card className={classes.card} variant="outlined">
            <CardHeader className={classes.expenseCardHeader}>
              <Link onClick={(e) => onClickDelete(e, expense)} to="/expenses">
              <DeleteForever style={{color: "black"}} className={classes.expenseDeleteButton}></DeleteForever>
            </Link>
            <Link to={`expenses/${expense.id}/edit`}>
              <EditIcon style={{color: "black"}} className={classes.expenseEditButton}></EditIcon>
            </Link>
              <h3><strong>{expense.title}</strong></h3>
              <p>{expense.date}</p>
            </CardHeader>
            <CardBody>
              <p><strong>Amount:</strong> ${expense.amount}</p>
              <p><strong>Category</strong>: {expense.category}</p>
              <p><strong>Description</strong>:</p> 
              <div style={{maxHeight: "100px", overflowY: "scroll"}}>
                <Box component="div">
                  {expense.description}
                </Box>
              </div>
            </CardBody>
        </Card>
        );
      })}
    </>
  );
}