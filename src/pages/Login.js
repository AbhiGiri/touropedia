import React, { useEffect, useState } from 'react'
import {MDBBtn, MDBCard, MDBCardBody, MDBCardFooter, MDBIcon, MDBInput, MDBSpinner, MDBValidation} from 'mdb-react-ui-kit'
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {GoogleLogin} from 'react-google-login';

import { googleSignIn, login } from '../features/auth/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = { email: '', password: ''};
  const [formValue, setFormValue] = useState(initialState);
  const {email, password} = formValue;
  const {isError, loading} = useSelector((state => state.auth));

  const devEnv = process.env.NODE_ENV !== "production";
  const clientId = devEnv 
    ? process.env.DEV_GOOGLE_CLIENTID 
    : process.env.PROD_GOOGLE_CLIENTID

  useEffect(() => {
    isError && toast.error(isError);
  }, [isError])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(email && password) {
      dispatch(login({ formValue, navigate, toast }));
    };
  };

  const onInputChange = (e) => {
    let {name, value} = e.target;
    setFormValue({...formValue, [name]: value})
    
  };

  const googleSuccess = (res) =>{
    const email = res?.profileObj?.email;
    const name = res?.profileObj?.name;
    const token = res?.tokenId;
    const googleId = res?.googleId;
    const result = {email, name, token, googleId}
    dispatch(googleSignIn({result, navigate, toast}))
  };

  const googleFailure = (err) =>{
    console.log(err);
  };

  return (
    <div style={{margin: "auto",  padding: "15px", maxWidth: "450px", alignContent: "center", marginTop: "120px",  }}>
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign In</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-12">
              <MDBInput label="Email" type="email"  value={email} name="email" onChange={onInputChange} required invalid validation="Please provide your email" />  
            </div>
            <div className="col-md-12">
              <MDBInput label="Password" type="password" value={password} name="password" onChange={onInputChange}
                required invalid validation="Please provide your password"
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
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <br />
          <GoogleLogin
            clientId="723952557123-qff0d898fvd5qallsf4qe1bfes25i7dj.apps.googleusercontent.com"
            render={(renderProps) => (
              <MDBBtn
                style={{ width: "100%" }}
                color="danger"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <MDBIcon className="me-2" fab icon="google" />
                Google Sign In
              </MDBBtn>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/register">
            <p>Don't have an account ? Sign Up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
    // <div style={{margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center", marginTop: "120px"}}>
    //   <MDBCard alignment="center">
    //     <MDBIcon fas icon="user-circle" className="fa-2x" />
    //     <h5>Sign In</h5>
    //     <MDBCardBody>
    //       <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
    //         <MDBValidationItem feedback='Please provide your email.' invalid className='col-md-12'>
    //           <MDBInput label="Email" type="email" value={email} name="email" onChange={onInputChange} required />
    //         </MDBValidationItem>
    //         <MDBValidationItem feedback='Please provide your password.' invalid className='col-md-12'>
    //           <MDBInput label="Password" type="password" value={password} name="password" onChange={onInputChange}required/>
    //         </MDBValidationItem>
    //         <div className="col-12">
    //           <MDBBtn style={{width: '100%'}} className="mt-2">
    //             {loading && (
    //               <MDBSpinner size='sm' role="status" tag="span" className='me-2'/>
    //             )}
    //             Login
    //           </MDBBtn>
    //         </div>
    //       </MDBValidation>
    //       <br />
    //       <GoogleLogin clientId="723952557123-04tkjr5uq38h5m6vhvsm15spi9o2u327.apps.googleusercontent.com"
    //         render={(renderProps) => (
    //           <MDBBtn style={{ width: "100%" }} color="danger" onClick={renderProps.onClick} disabled={renderProps.disabled} >
    //             <MDBIcon className="me-2" fab icon="google" /> Google Sign In
    //           </MDBBtn>
    //         )}
    //         onSuccess={googleSuccess}
    //         onFailure={googleFailure}
    //         cookiePolicy="single_host_origin"
    //       />
    //     </MDBCardBody>
    //     <MDBCardFooter>
    //       <Link to="/register">
    //         <p>Don't have an account ? Sign Up</p>
    //       </Link>
    //     </MDBCardFooter>
    //   </MDBCard>
    // </div>
  )
}

export default Login