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

export function EditIncomeForm(props) {
  const { incomeId, classes, handleClose, deletedOrUpdated, setDeletedOrUpdated, incomes } = props
  // Hooks
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [loaded, setLoaded] = useState(true);
  const id = incomeId;

  //Auth0 hooks
  const { getAccessTokenSilently, user } = useAuth0();

  // GET request to set state to pre-fill form inputs
  useEffect(() => {
    async function fetchIncome() {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(
          `${process.env.REACT_APP_RAILS_API_URL}/incomes/${id}`,
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
                if(loaded === true) {
          setLoaded(false)
        } else if(loaded === false) {
          setLoaded(true)
        }
        // buggy interaction with setting initial state after fetching data from API
        // setDate("")
      } catch (e) {
        console.error("Error: ", e.message);
      }
    }
    fetchIncome();
  }, []);

  // sets the current edited title 
  useEffect(() => {
    setEditedTitle(title)
  },[loaded])

  async function onFormSubmit(e) {
    try {
      // Prevent default page reload on submit
      e.preventDefault();
      // Validate if empty input or existing title
      validateInput(incomes)
      // On submit, closes modal
      handleClose(false);
      // token
      const token = await getAccessTokenSilently();
      await fetch(`${process.env.REACT_APP_RAILS_API_URL}/incomes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          income: {
            title: title, // title for income
            description: description,
            category_id: parseInt(category), // ParseInt to convert string to integer
            amount: amount,
            user_sub: user.sub, // user_sub for identifying each unique user
            date: date,
          },
        }),
      });
      // sets state to render everytime an edit is made
      if(deletedOrUpdated) {
        setDeletedOrUpdated(false)
      } else if(!deletedOrUpdated) {
        setDeletedOrUpdated(true)
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  // Validation function to not have duplicate titles
  function validateInput(array) {
    const sortedArray = array.filter(element => {
      return element.title !== editedTitle
    })

    sortedArray.forEach(item => {
    if (title === "" || amount === "" || category === "" || description === "" || date === "") {
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
        <h3>Edit Income</h3>
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
            placeholder="Description of your income"
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
            helperText="Please select the category for your income"
          >
            <MenuItem key={"grocery-select-key"} value={"6"}>
              Wages
            </MenuItem>
            <MenuItem key={"travel-select-key"} value={"7"}>
              Shares
            </MenuItem>
            <MenuItem key={"entertainment-select-key"} value={"8"}>
              Interest
            </MenuItem>
            <MenuItem key={"necessity-select-key"} value={"9"}>
              Investment
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
          Save Income
        </Button>
      </form>
    </>
  );
}
