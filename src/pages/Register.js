import React, { useEffect, useState } from 'react'
import {MDBBtn, MDBCard, MDBCardBody, MDBCardFooter, MDBIcon, MDBInput, MDBSpinner, MDBValidation} from 'mdb-react-ui-kit'
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { register } from '../features/auth/authSlice';


const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = { firstName: "", lastName: "", email: '', password: '', password2: ""};
  const [formValue, setFormValue] = useState(initialState);
  const {firstName, lastName, email, password, password2} = formValue;
  const {isError, loading} = useSelector((state => state.auth));


  useEffect(() => {
    isError && toast.error(isError);
  }, [isError])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(password !== password2) {
      toast.error('Passwords do not match');
    };
    if (email && password && firstName && lastName && password2) {
        dispatch(register({ formValue, navigate, toast }));
    };
  };

  const onInputChange = (e) => {
    let {name, value} = e.target;
    setFormValue({...formValue, [name]: value})
  };


  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign Up</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-6">
              <MDBInput
                label="First Name"
                type="text"
                value={firstName}
                name="firstName"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide first name"
              />
            </div>
            <div className="col-md-6">
              <MDBInput
                label="Last Name"
                type="text"
                value={lastName}
                name="lastName"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide last name"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide email"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide password"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Password Confirm"
                type="password"
                value={password2}
                name="password2"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide confirm password"
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Register
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/login">
            <p>Already have an account ? Sign In</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
    // <div style={{margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center", marginTop: "120px",}}>
    //   <MDBCard alignment="center">
    //     <MDBIcon fas icon="user-circle" className="fa-2x" />
    //     <h5>Register</h5>
    //     <MDBCardBody>
    //       <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
    //         <MDBValidationItem feedback='Please enter your first name.' invalid className='col-md-6'>
    //           <MDBInput label="First name" type="text" value={firstName} name="firstName" onChange={onInputChange} required />
    //         </MDBValidationItem>
    //         <MDBValidationItem feedback='Please enter your last name.' invalid className='col-md-6'>
    //           <MDBInput label="Last name" type="text" value={lastName} name="lastName" onChange={onInputChange} required />
    //         </MDBValidationItem>
    //         <MDBValidationItem feedback='Please provide your email.' invalid className='col-md-12'>
    //           <MDBInput label="Email" type="email" value={email} name="email" onChange={onInputChange} required />
    //         </MDBValidationItem>
    //         <MDBValidationItem feedback='Please provide your password.' invalid className='col-md-12'>
    //           <MDBInput label="Password" type="password" value={password} name="password" onChange={onInputChange}required/>
    //         </MDBValidationItem>
    //         <MDBValidationItem feedback='Please provide your confirm password.' invalid className='col-md-12'>
    //           <MDBInput label="Confirm password" type="password" value={password2} name="password2" onChange={onInputChange}required/>
    //         </MDBValidationItem>
    //         <div className="col-12">
    //           <MDBBtn style={{width: '100%'}} className="mt-2">
    //             {loading && (
    //               <MDBSpinner size='sm' role="status" tag="span" className='me-2'/>
    //             )}
    //             Register
    //           </MDBBtn>
    //         </div>
    //       </MDBValidation>
    //     </MDBCardBody>
    //     <MDBCardFooter>
    //       <Link to="/login">
    //         <p>Already have an account ? Login</p>
    //       </Link>
    //     </MDBCardFooter>
    //   </MDBCard>
    // </div>
  )
}

export default Register