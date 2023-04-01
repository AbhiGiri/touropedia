import React, { useState } from 'react'
import {MDBNavbar, MDBContainer, MDBNavbarBrand, MDBNavbarToggler, MDBIcon, MDBCollapse, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { searchTours } from '../features/tour/tourSlice';
import decode from 'jwt-decode';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState('');
    const { user } = useSelector((state) => ({...state.auth}));
    const token = user?.token;

    if(token) {
      const decodedToken = decode(token);
      if(decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(logout())
      }
    }

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if(search) {
        dispatch(searchTours(search));
        navigate(`/tours/search?searchQuery=${search}`);
      } else {
        setSearch('');
        navigate('/')
      }
    }

  return (
    <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#f0e6ea" }}>
    <MDBContainer>
      <MDBNavbarBrand href="/" style={{ color: "#606080", fontWeight: "600", fontSize: "22px" }}      >
        Touropedia
      </MDBNavbarBrand>
      <MDBNavbarToggler type="button"aria-expanded="false" aria-label="Toogle navigation" onClick={() => setShow(!show)} style={{ color: "#606080" }}   >
        <MDBIcon icon="bars" fas />
      </MDBNavbarToggler>
      <MDBCollapse show={show} navbar>
        <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
          {user?.result?._id && (
            <h5 style={{ marginRight: "30px", marginTop: "27px" }}>
              Logged in as: {user?.result?.name}
            </h5>
          )}
          <MDBNavbarItem>
            <MDBNavbarLink href="/">
              <p className="header-text">Home</p>
            </MDBNavbarLink>
          </MDBNavbarItem>
          {user?.result?._id && (
            <>
              <MDBNavbarItem>
                <MDBNavbarLink href="/addTour">
                  <p className="header-text">Add Tour</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/dashboard">
                  <p className="header-text">Dashboard</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            </>
          )}
          {user?.result?._id ? (
            <MDBNavbarItem>
              <MDBNavbarLink href="/login">
                <p className="header-text" onClick={() => handleLogout()}>
                  Logout
                </p>
              </MDBNavbarLink>
            </MDBNavbarItem>
          ) : (
            <MDBNavbarItem>
              <MDBNavbarLink href="/login">
                <p className="header-text">Login</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
          )}
        </MDBNavbarNav>
        <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
          <input type="text" className="form-control" placeholder="Search Tour" value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div style={{ marginTop: "5px", marginLeft: "5px" }}>
            <MDBIcon fas icon="search" />
          </div>
        </form>
      </MDBCollapse>
    </MDBContainer>
  </MDBNavbar>
    // <MDBNavbar fixed='top' expand="lg" style={{backgroundColor: '#53e3ea'}}>
    //     <MDBContainer>
    //         <MDBNavbarBrand href='/' style={{color: '#306380', fontWeight: '600', fontSize: '22px'}}>
    //             Touropedia
    //         </MDBNavbarBrand>
    //     </MDBContainer>
    //     <MDBNavbarToggler type='button' aria-expanded='false' aria-label='Toggle navigation' onClick={() => setShow(!show)} style={{color: '#606080'}}>
    //         <MDBIcon icon='bars' fas />
    //     </MDBNavbarToggler>
    //     <MDBCollapse show={show} navbar>
    //         <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
    //             {user?.result?._id && (
    //                 <h5 style={{marginRight: '30px', marginTop: '17px'}}>
    //                     Logged in as: {user?.result?.name}
    //                 </h5>
    //             )}
    //             <MDBNavbarItem>
    //                 <MDBNavbarLink href='/'>
    //                     <p className="header-text">Home</p>
    //                 </MDBNavbarLink>
    //             </MDBNavbarItem>
    //             {user?.result?._id && (
    //             <>
    //                 <MDBNavbarItem>
    //                     <MDBNavbarLink href='/addTour'>
    //                         <p className="header-text">Add Tour</p>
    //                     </MDBNavbarLink>
    //                 </MDBNavbarItem>
    //                 <MDBNavbarItem>
    //                     <MDBNavbarLink href='/dashboard'>
    //                         <p className="header-text">Dashboard</p>
    //                     </MDBNavbarLink>
    //                 </MDBNavbarItem>
    //             </>)}
    //             {user?.result?._id ? (
    //                  <MDBNavbarItem>
    //                     <MDBNavbarLink href='/login'>
    //                         <p className="header-text" onClick={handleLogout}>Logout</p>
    //                     </MDBNavbarLink>
    //                 </MDBNavbarItem>
    //             ) : (
    //             <MDBNavbarItem>
    //                 <MDBNavbarLink href='/login'>
    //                     <p className="header-text">Login</p>
    //                 </MDBNavbarLink>
    //             </MDBNavbarItem>
    //             )} 
    //         </MDBNavbarNav>
    //     </MDBCollapse>
    // </MDBNavbar>
  )
}

export default Header