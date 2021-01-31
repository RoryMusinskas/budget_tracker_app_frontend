import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export function NewExpenses() {
  // Hooks
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  //Auth0 hooks
  const { getAccessTokenSilently, user } = useAuth0();

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
            // name: name, add name/title for expense later
            description: description,
            category_id: parseInt(category), // ParseInt to convert string to integer
            amount: amount,
            user_sub: user.sub, // user_sub for idenitfying each unique user
          },
        }),
      });
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
            value={name}
            placeholder="What did you spend it on? e.g. KFC, Coles, JB-HIFI"
            onChange={(e) => setName(e.target.value)}
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
        <input type="submit" id="submit" value="Add Expense" />
      </form>
    </>
  );
}
