import { useState } from 'react'
import './App.css'

function App() {
  const [form, setForm] = useState({name: '', email: '', password: ''});
  const [error, setError] = useState({passwordMessage: '', emailMessage: ''});
  const [submit, setSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((form) => (
      {...form, [name]: value}
    ))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setError((prev) => ({ ...prev, passwordMessage: '' }));

    if (form.password.trim().length <= 6) {
      setError((prev) => ({...prev, passwordMessage: "Password must be 6 atleast character long"}));
      return;
    }
    
    setSubmit((prev) => (!prev));
    setForm(() => ({name: '', email: '', password: ''}));
  }

  const handleNavigate = () => {
    setSubmit((prev) => (!prev))
  }

  const handleViewPassword = () => {
    setShowPassword((prev) => (!prev));
  }

  const handleEmailBlur = (event) => {
    if(!form.email.includes('@')){
      setError((prev) => ({...prev, emailMessage: "Please enter a valid Email"}));
    }else{
      setError((prev) => ({...prev, emailMessage: ''}));
    }
  }

  if(submit){
    return(
      <div>
          <h1>Data Submitted</h1>
          <button type='button' onClick={handleNavigate}>Back</button>
      </div>
    )
  }

  return (
    <>
      <form className='form-container' autoComplete='on' onSubmit={handleSubmit}>
        <div className='input-container'>
            <label htmlFor='name'>Name</label>
            <input 
              className='form-input'
              type='text'
              id='name'
              name='name'
              value={form.name}
              onChange={handleChange}
              required
            />
        </div>
        
        <div className='input-container'>
            <label htmlFor='email'>Email</label>
            <input 
              className='form-input'
              type='email'
              id='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              onBlur={handleEmailBlur}
              required
            />
            {error.emailMessage && <h4 className='input-error'>{error.emailMessage}</h4>}
        </div>
        
        <div className='input-container'>
            <label htmlFor='password'>Password</label>
            <div className='password-container'>
              <input
                className='form-input'
                type={showPassword ? 'text' : 'password'}
                id='password'
                name='password'
                value={form.password}
                onChange={handleChange}
                required
              />
              <button type='button' onClick={handleViewPassword}>View Password</button>
            </div>
            
            {error.passwordMessage && <h4 className='input-error'>{error.passwordMessage}</h4>}
        </div>
        <button className='form-button' type='submit'>Submit</button>
      </form>
    </>
  )
}

export default App
