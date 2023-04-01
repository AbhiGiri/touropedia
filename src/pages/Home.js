import { MDBCol, MDBContainer, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import TourCard from '../components/TourCard';
import { getTours, setCurrentPage } from '../features/tour/tourSlice';

function useQuery() {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {tours, loading, currentPage, numberOfPages, } = useSelector((state) => ({...state.tour}));
  console.log(tours);
  const query = useQuery ();
  const searchQuery = query.get("searchQuery");
  const location = useLocation();

  useEffect(() => {
    currentPage && dispatch(getTours(currentPage));
    !searchQuery && navigate('/');
  }, [currentPage, dispatch])
  
  if(loading) {
    return <Spinner />
  };

  return (
    <div style={{margin: 'auto', padding: '15px', maxWidth: '1000px', alignContent: 'center'}}>
      <MDBRow className='mt-5'>
        {tours?.length === 0 && location.pathname ==="/" &&(
          <MDBTypography tag='h2' className='text-center mb-0'>
            No Tour Found!
          </MDBTypography>
        )}
        {tours?.length === 0 && location.pathname !=="/" &&(
          <MDBTypography tag='h2' className='text-center mb-0'>
            No Tour Found!
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
              {tours && tours?.map((tour, i) => (
                <TourCard key={i} {...tour} />
              ))}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>

      {tours.length > 0 && !searchQuery && (
        <Pagination setCurrentPage={setCurrentPage} numberOfPages={numberOfPages}
          currentPage={currentPage} dispatch={dispatch}
        />
      )}

    </div>
  )
}

export default Home