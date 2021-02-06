// React import
import React, { useState, useEffect } from "react";
// Auth0 import
import { useAuth0 } from "@auth0/auth0-react";
// react-date-picker import
import DatePicker from "react-date-picker";
// Material-ui import
import Button from "components/CustomButtons/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

export function EditExpenseForm(props) {
  const { expenseId, classes, handleClose, deletedOrUpdated, setDeletedOrUpdated, expenses } = props
  // Hooks
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState();
  const id = expenseId;

  //Auth0 hooks
  const { getAccessTokenSilently, user } = useAuth0();

  // GET request to set state to pre-fill form inputs
  useEffect(() => {
    async function fetchExpense() {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(
          `${process.env.REACT_APP_RAILS_API_URL}/expenses/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseData = await response.json();
        // Fills the form with data from fetch request
        setTitle(responseData.title);
        setAmount(responseData.amount);
        setDescription(responseData.description);
        setCategory(responseData.category_id);
        // buggy interaction with setting initial state after fetching data from API
        // setDate(responseData.date)
      } catch (e) {
        console.error("Error: ", e.message);
      }
    }
    fetchExpense();
  }, []);

  async function onFormSubmit(e) {
    try {
      // Prevent default page reload on submit
      e.preventDefault();
      // Validate if empty input or existing title
      validateInput(expenses, title)
      const token = await getAccessTokenSilently();
      await fetch(`${process.env.REACT_APP_RAILS_API_URL}/expenses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          expense: {
            title: title, // title for expense
            description: description,
            category_id: parseInt(category), // ParseInt to convert string to integer
            amount: amount,
            user_sub: user.sub, // user_sub for identifying each unique user
            date: date,
          },
        }),
      });
      // sets state to render every time an edit is made
      if(deletedOrUpdated) {
        setDeletedOrUpdated(false)
      } else if(!deletedOrUpdated) {
        setDeletedOrUpdated(true)
      }
      // On submit, closes modal
      handleClose(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  function validateInput(array) {
    const sortedArray = array.filter(element => {
      if(element.title !== title) {
        return element
      }
    })
    sortedArray.forEach(item => {
    if (title === undefined || amount === "" || category === "" || description === "" || date === "") {
      window.alert("One or more of your field is empty! Please fill them up and try again")
      throw new Error("Missing some input")
    }
    else if(item.title === title) {
      window.alert(`"${title}" is an existing expense. Please use another title`)
      throw new Error("Title already exist")
    }
    })
  }

  return (
    <>
      <form className={classes.root} onSubmit={onFormSubmit}>
        <h3>Edit Expense</h3>
        <div className="form-div">
          <TextField
            id="title-input"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></TextField>
        </div>
        <div className="form-div">
          <TextField
            id="amount-input"
            label="Amount($)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          ></TextField>
        </div>
        <div className={classes.formDescriptionDiv}>
          <TextField
            id="description-input"
            label="Description"
            value={description}
            multiline
            rows={4}
            placeholder="Description of your expense"
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
          ></TextField>
        </div>
        <div className="form-div">
          <TextField
            id="select-category"
            select
            label="Select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            helperText="Please select the category for your expense"
          >
            <MenuItem key={"grocery-select-key"} value={"1"}>
              Grocery
            </MenuItem>
            <MenuItem key={"travel-select-key"} value={"2"}>
              Travel
            </MenuItem>
            <MenuItem key={"entertainment-select-key"} value={"3"}>
              Entertainment
            </MenuItem>
            <MenuItem key={"necessity-select-key"} value={"4"}>
              Necessity
            </MenuItem>
            <MenuItem key={"others-select-key"} value={"5"}>
              Others
            </MenuItem>
          </TextField>
        </div>
        <div className="form-div">
          <DatePicker
            name="date-select"
            id="date-select"
            onChange={setDate}
            value={date}
          />
        </div>
        <Button type="submit" id="submit-button">
          Save Expense
        </Button>
      </form>
    </>
  );
}
