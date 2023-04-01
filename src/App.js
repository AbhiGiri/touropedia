import React, { useEffect } from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { useDispatch } from 'react-redux';
import { setUser } from './features/auth/authSlice';
import AddEditTour from './components/AddEditTour';
import Header from './components/Header';
import SingleTour from './pages/SingleTour';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import PageNotFound from './pages/PageNotFound';
import TagTours from './pages/TagTours';

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  
  useEffect(() => {
    dispatch(setUser(user))
  }, [])
  
  return (
    <div className="App">
      <Routers>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/tours/search" element={<Home/>}/>
          <Route path="/tours/tag/:tag" element={<TagTours/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
          <Route path="/addTour" element={<PrivateRoute><AddEditTour/></PrivateRoute>}/>
          <Route path="/editTour/:id" element={<PrivateRoute><AddEditTour/></PrivateRoute>}/>
          <Route path="/tour/:id" element={<PrivateRoute><SingleTour/></PrivateRoute>}/>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Routers>
      </div>
  );
}

export default App;
