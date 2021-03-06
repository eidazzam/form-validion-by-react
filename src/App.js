import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  let [loading, setLoading]= useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setFormErrors(validate(formValues));
   
    setIsSubmit(true);
    setLoading(true)
    

  };

  useEffect(() => {
    console.log(formErrors);
    setTimeout(() => {
      setLoading(false)
    }, 1000);
    
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
      
    }else if(values.username.length < 5) {
      errors.username = "username must be more than 5 characters";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 8 characters and numbers";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  
  };

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? ( 
        <div className="ui message success alert alert-primary">Signed in successfully</div>
   
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )}

      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Username</label>
            <input
            className="form-control"
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
          <div className="field">
            <label>Email</label>
            <input
            className="form-control"

              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Password</label>
            <input
            className="form-control"

              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <button type="submit"className=" my-2 btn btn-info" >
          {loading ?  <i className="fas fa-spinner fa-span" ></i> : 'Register'}</button>
        </div>
      </form>
    </div>
  );
}

export default App;