import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
// import { motion } from 'framer-motion'  - not being used from what I see
import * as Yup from "yup";
import "../App.scss";
//imported axios with auth - fb
// import { axiosWithAuth } from "../utils/axiosWithAuth";
// import Axios from "axios"; //set up axios for R1
import { useLocalStorage } from "../utils/useLocalStorage"; // added local storage
//importing signup form schema
import formSchema from './formSchema';
import { connect } from "react-redux";
import { signupUser } from "../actions";
//setting up redux


// importing modal
import Modal from './Modal'

//added init state for form state
const initialState = {
  username: '',
  email: '',
  password: '',
}

function SignupForm({signupUser}) {

  // const [formValues, setFormValues] = useState(initialState)
  const [formState, setFormState] = useLocalStorage(`formValues`, initialState)
  // const [formState, setFormState] = useState(initialState)
  const [errors, setErrors] = useState(initialState);
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [showModal, setShowModal] = useState(false);

  //sigup button validation
  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  // Form Handlers
  const history = useHistory()

  const postNewUsername = (newUsername) => {
    signupUser(newUsername,  history)

  }

  //onSubmit
 
  const submitHandler = e => {
    e.preventDefault()
    const newUsername = {
      username: formState.username.trim(),
      email: formState.email.trim(),
      password: formState.password.trim(),
    }
    postNewUsername(newUsername)
    //pass in the function for axios call or useEffect
   
  }


  function changeHandler(e) {
    const { name, value } = e.target;

    Yup
    .reach(formSchema, name)
    .validate(value)
    .then(valid => {
      setErrors({
        ...errors,
        [name]: ""
      });
    })
    .catch(err => {
      setErrors({
        ...errors,
        [name]: err.errors[0]
      });
    });

    setFormState({
      ...formState,
      [name]: value,
    });
  }

  return (
    <>
    <Modal showModal={showModal} setShowModal={setShowModal} title='You have successfully created an acount'/>
    <div className='form-container'>
      <h1>Please create an account so we can save your secret recepies</h1>
      <form
        className='form'
        onSubmit={submitHandler}>
        <label className='form-label'>
          Set your username
          <input
            className='form-input'
            type="username"
            name="username"
            onChange={changeHandler}
            value={formState.username} 
          ></input>
          {errors.username ? (<p className="error">{errors.username}</p>) : null}
        </label>
        <label className='form-label'>
          Set your email
          <input
            className='form-input'
            type="email"
            name="email"
            onChange={changeHandler}
            value={formState.email} 
          ></input>
          {errors.email ? (<p className="error">{errors.email}</p>) : null}
        </label>

        <label className='form-label'>
          Set your password
          <input
            className='form-input'
            type="password"
            name="password"
            onChange={changeHandler}
            value={formState.password} 
          ></input>
          {errors.password ? (<p className="error">{errors.password}</p>) : null}
        </label>
        <button
          className='form-btn'
          type="submit"
          disabled={buttonDisabled}>
          Create Account
        </button>
      </form>
      <Link to='/'>Already have an account? Log In</Link>
    </div>
    </>
  );
}

// const MapStateToProps = state => {
//   return {
//     users: state.users
//   }
// }

export default connect(null, {signupUser})(SignupForm)
