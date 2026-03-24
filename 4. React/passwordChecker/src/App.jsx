import React, { useState } from 'react';
import './App.css'

// ✅ Export this so it can be tested 
export const checkPasswordStrength = (password) => {
  let count = 0;
  let output = '';
  let userPassword = password.trim();
  const hasDigit = /\d/;
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;
  const hasSpecialChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~ ]/;

  if (!userPassword) {
    return 'Weak Password';
  }

  //check if password is 8 characters long.
  if (userPassword.length >= 8) {
    count += 1
  }

  //check if it has atleast one upper case.
  if (hasUpperCase.test(userPassword)) {
    count += 1
  }

  //check if it has atleast one lower case.
  if (hasLowerCase.test(userPassword)) {
    count += 1
  }

  //check if it has atleast one digit.
  if (hasDigit.test(userPassword)) {
    count += 1
  }

  //check if it has atleast one special character.
  if (hasSpecialChar.test(userPassword)) {
    count += 1
  }

  //Return based on the count
  if (count == 0) {
    output = "Weak Password";
  } else if (count == 1) {
    output = "Level 1";
  } else if (count == 2 || count == 3) {
    output = "Level 2";
  } else {
    output = "Level 3";
  }

  return output
};

const PasswordStrength = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState({});

  const handleChange = (event) => {
    setStrength(() => ({}));
    setPassword(() => (event.target.value));
  }

  const handleSubmit = (event) => {
    setStrength(() => ({}));
    event.preventDefault();
    result = checkPasswordStrength(password);
    console.log(result);
    setStrength(() => ({ message: result }));
    setPassword(() => (''));
  }

  return (
    <div className='container'>
      <h2>Password Strength Checker</h2>
      <form className='form-container' onSubmit={handleSubmit}>
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          placeholder='Enter Password'
          onChange={handleChange}
        />
        <button type='submit'>Check Strength</button>
      </form>
      <span>Strength: {strength ? strength.message : None}</span>
    </div>
  );
};

export default PasswordStrength;