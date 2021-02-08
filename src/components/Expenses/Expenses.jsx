// Import React
import React, { useEffect } from "react";
// Import Auth0
import { useAuth0 } from "@auth0/auth0-react";
// Icon import from material ui
import { DeleteForever } from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import { makeStyles } from "@material-ui/core/styles";
import { EditExpenseModal } from "./EditExpenseModal";
// Style import
import styles from "../../assets/jss/material-dashboard-react/components/ExpensesComponent/expensesComponentStyle";

const useStyles = makeStyles(styles);

export function Expenses(props) {
  const {
    expenses,
    setExpenses,
    deletedOrUpdated,
    setDeletedOrUpdated,
  } = props;
  const classes = useStyles();
  // Auth0 Hook
  const { getAccessTokenSilently, user } = useAuth0();

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
      setExpenses(responseData); // Sets state for prop drilling/lifting state
    } catch (e) {
      console.error("Error: ", e.message);
    }
  }

  // useEffect mounts the API call
  useEffect(() => {
    fetchExpenses();
  }, [deletedOrUpdated]);

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
      {expenses.map((expense, index) => {
        // Switch statement to render category name instead of id
        switch (expense.category_id) {
          case 1:
            expense.category = "Grocery";
            break;
          case 2:
            expense.category = "Travel";
            break;
          case 3:
            expense.category = "Entertainment";
            break;
          case 4:
            expense.category = "Necessity";
            break;
          case 5:
            expense.category = "Others";
            break;
          default:
            expense.category = "Wrong category";
            break;
        }
        // EditExpenseModal component is propped drilled expense.id for
        // identifying each unique expense
        return (
          <Card
            key={`CardComponent${index}`}
            className={classes.card}
            variant="outlined"
          >
            <CardHeader
              key={`CardHeader${index}`}
              className={classes.expenseCardHeader}
            >
              <DeleteForever
                key={`DeleteIcon${index}`}
                style={{ color: "black" }}
                onClick={(e) => onClickDelete(e, expense)}
                className={classes.expenseDeleteButton}
              ></DeleteForever>
              <EditExpenseModal
                key={`EditIcon${index}`}
                expenseId={expense.id}
                deletedOrUpdated={deletedOrUpdated}
                setDeletedOrUpdated={setDeletedOrUpdated}
                expenses={expenses}
              ></EditExpenseModal>
              <h3 key={`${expense.title}${index}`}>
                <strong>{expense.title}</strong>
              </h3>
              <p key={`${expense.date}${index}`}>{expense.date}</p>
            </CardHeader>
            <CardBody key={`CardBody${index}`}>
              <p key={`${expense.amount}${index}`}>
                <strong>Amount:</strong> ${expense.amount}
              </p>
              <p key={`${expense.category}${index}`}>
                <strong>Category</strong>: {expense.category}
              </p>
              <p key={`${expense.description.charAt(0)}${index}`}>
                <strong>Description</strong>:
              </p>
              <div
                key={`div${index}`}
                style={{ maxHeight: "100px", overflowY: "scroll" }}
              >
                <Box
                  key={`description${expense.description.charAt(0)}${index}`}
                  component="div"
                >
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
