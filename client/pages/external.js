import React, { useEffect, useState } from "react";
import { Label } from "reactstrap";
import apiService from "../services/apiService";
import styles from "../styles/Home.module.css";
import { Form, FormGroup, Button, Input, FormFeedback } from "reactstrap";
import { useMutateTransferUserExternal } from "../adapters/user";
import axios from "axios";

export default function ExternalTransfer() {
  //properties
  const [recieverBankid, setrecieverBankid] = useState("");
  const [recieverAccountid, setrecieverAccountid] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [account, setAccount] = useState("");

  //states
  const [recieverBankidState, setrecieverBankidState] = useState("");
  const [recieverAccountidState, setrecieverAccountidState] = useState("");
  const [amountState, setAmountState] = useState("");
  const [descriptionState, setDescriptionState] = useState("");

  const useTransferMutationExternal = useMutateTransferUserExternal();
  const defaultrecieverAccountid = 12345678910;

  const validateAccountId = async (value) => {
    

    let recieverAccountidState;


    if (value.length === 12) {

      recieverAccountidState = "has-success";
      

    } else {
      recieverAccountidState = "has-danger";
    }
    setrecieverAccountidState(recieverAccountidState);
  };
  
  const validateBankId = async (value) => {

    let recieverBankidState;


    if (value.length === 4 || value.length === 5 || value.length === 6) {

        recieverBankidState = "has-success";

    } else {
        recieverBankidState = "has-danger";
    }
    setrecieverBankidState(recieverBankidState);
  };

  const validateDescriptionState = (value) => {
    let descriptionState;
    if (Object.keys(value).length >= 2) {
      descriptionState = "has-success";
    } else {
      descriptionState = "has-danger";
    }
    setDescriptionState(descriptionState);
  };

  /* if isNan() to  check its a number */
  const validateAmountState = async (value) => {
    let amountState;
    // const balance = await apiService.get(
    //   `http://localhost:5000/accounts/user/balance/${account.data.id}`
    // ); 
    if (value > 0) {
      amountState = "has-success";
    } else {
      amountState = "has-danger";
    }
    setAmountState(amountState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "accountid") {
      validateAccountId(value);
      setrecieverAccountid(value);
    } else if (name === "amount") {
      validateAmountState(value);
      setAmount(value);
    } else if (name === "description") {
      validateDescriptionState(value);
      setDescription(value);
    }
    else if (name === "bankid") {
        validateBankId(value);
        setrecieverBankid(value);
      }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateBankId(recieverBankid);
    validateAccountId(recieverAccountid);
    validateAmountState(amount);
    validateDescriptionState(description);

    if (recieverBankid ==="has-success"&&recieverAccountidState === "has-success" && amountState === "has-success" && descriptionState === "has-success") {
      // Call User Transfer Adapter
      useTransferMutationExternal.mutate({
        "from_To": recieverAccountid,
        "Display_date": new Date().toDateString(),
        "description": description,
        "debit": 1,
        "credit": 0,
        "amount": Number(amount),
        "accountid": window.localStorage.getItem("accountid"),
        "bankid": window.localStorage.getItem("bankid"),
      });
    }
  };

  return (
    <div className={styles.App}>
      <button
        color="outline-secondary"
        onClick={() => {
          window.location.replace("http://localhost:3000");
        }}
      >
        Back to Dashboard
      </button>
      <h2>External Transfer</h2>
      <Form className={styles.form} onSubmit={handleSubmit}>
      <FormGroup>
          <Label className={styles.label} for="bankid">
            Bank id:
          </Label>
          <Input
            type="text"
            name="bankid"
            id="bankid"
            placeholder="Enter bank id (4~6 numbers)"
            onChange={handleChange}
            valid={recieverBankidState === "has-success"}
            invalid={recieverBankidState === "has-danger"}
          />
          <FormFeedback>bank id not found.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label className={styles.label} for="accountid">
            Account id:
          </Label>
          <Input
            type="text"
            name="accountid"
            id="accountid"
            placeholder="Enter account id (12 numbers)"
            onChange={handleChange}
            valid={recieverAccountidState === "has-success"}
            invalid={recieverAccountidState === "has-danger"}
          />
          <FormFeedback>Account id not found.</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label className={styles.label} for="amount">
            Amount:
          </Label>
          <Input
            type="Number"
            name="amount"
            id="amount"
            placeholder="Enter amount"
            onChange={handleChange}
            valid={amountState === "has-success"}
            invalid={amountState === "has-danger"}
          />
          <FormFeedback>This is an invalid amount</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label className={styles.label} for="description">
            Description:
          </Label>
          <Input
            type="text"
            name="description"
            id="description"
            placeholder="Enter description"
            onChange={handleChange}
            valid={descriptionState === "has-success"}
            invalid={descriptionState === "has-danger"}
          />
          <FormFeedback>Please don't leave it empty</FormFeedback>
        </FormGroup>

        <Button color="primary">Submit</Button>
      </Form>
    </div>
  );
}