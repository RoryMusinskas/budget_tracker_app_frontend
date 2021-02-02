import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import DatePicker from 'react-date-picker';

export function NewExpenses({ history }) {
  // Hooks
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
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
      // Redirects back to expenses page
      history.push("/admin/expenses")
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <div className="form-div">
          <label htmlFor="expense-name">Expense: </label>
          <input
            type="text"
            name="spending-name"
            id="spending-name"
            value={title}
            placeholder="What did you spend it on? e.g. KFC, Coles, JB-HIFI"
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div className="form-div">
          <label htmlFor="expense-amount">Amount($): </label>
          <input
            type="number"
            name="expense-amount"
            id="expense-amount"
            placeholder="30"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          ></input>
        </div>
        <div className="form-div">
          <label htmlFor="expense-description">Description</label>
          <textarea
            name="expense-description"
            id="expense-description"
            placeholder="Describe your expense"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-div">
          <label htmlFor="category-select">Category</label>
          <select
            name="category-select"
            id="category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {/* Using value as numbers to reflect schema of taking bigint for now */}
            <option value="1">Grocery</option>
            <option value="2">Travel</option>
            <option value="3">Entertainment</option>
            <option value="4">Necessity</option>
            <option value="5">Others</option>
          </select>
        </div>
        <div className="form-div">
          <label htmlFor="date-select">Date:</label>
          <DatePicker name="date-select" id="date-select" onChange={setDate} value={date} />
        </div>
        <input type="submit" id="submit" value="Add Expense" />
      </form>
    </>
  );
}
