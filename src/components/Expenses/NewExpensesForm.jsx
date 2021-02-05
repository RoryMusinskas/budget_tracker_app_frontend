// React import
import React, { useState } from "react";
// Auth0 import
import { useAuth0 } from "@auth0/auth0-react";
// react-date-picker import
import DatePicker from "react-date-picker";
// Material-ui import
import Button from "components/CustomButtons/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

export function NewExpensesForm({ handleClose, classes }) {
  // Hooks
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(); // default choice is "Grocery", which is 1
  const [date, setDate] = useState(new Date());

  //Auth0 hooks
  const { getAccessTokenSilently, user } = useAuth0();

  // OnSubmit post request
  async function onFormSubmit(e) {
    try {
      // Prevent default page reload on submit
      e.preventDefault();
      const token = await getAccessTokenSilently();
      await fetch(`${process.env.REACT_APP_RAILS_API_URL}/expenses`, {
        method: "POST",
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
      handleClose(false); // On submit, closes modal
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <form className={classes.root} onSubmit={onFormSubmit}>
        <h3>Add Expense</h3>
        <div className="form-div">
          <TextField
            id="title-input"
            label="Title"
            onChange={(e) => setTitle(e.target.value)}
          ></TextField>
        </div>
        <div className="form-div">
          <TextField
            id="amount-input"
            label="Amount($)"
            type="number"
            onChange={(e) => setAmount(e.target.value)}
          ></TextField>
        </div>
        <div className={classes.formDescriptionDiv}>
          <TextField
            id="description-input"
            label="Description"
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
          Add Expense
        </Button>
      </form>
    </>
  );
}