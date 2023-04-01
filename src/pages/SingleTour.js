import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBContainer, MDBIcon } from 'mdb-react-ui-kit';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getRelatedTours, getTour } from '../features/tour/tourSlice';
import moment from "moment";
import RelatedTours from '../components/RelatedTours';
import DisqusThread from '../components/DisqusThread';

const SingleTour = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {tour, relatedTours} = useSelector((state) => ({...state.tour}));
    const tags = tour?.tags;

    useEffect(() => {
      console.log(tags);
      tags && dispatch(getRelatedTours({tags}));
    }, [tags, dispatch]);
    
    useEffect(() => {
      id && dispatch(getTour(id));
      
    }, [id, dispatch]);
    
    
  return (
    <> 
      <MDBContainer>
        <MDBCard className="mb-3 mt-2">
          <MDBCardImage position="top" style={{ width: "100%", maxHeight: "600px" }} src={tour.imageFile} alt={tour.title}/>
          <MDBCardBody>
            <MDBBtn tag="a" color="none" style={{ float: "left", color: "#000" }} onClick={() => navigate("/")} >
              <MDBIcon fas size="lg" icon="long-arrow-alt-left" style={{ float: "left" }} />
            </MDBBtn>
            <h3>{tour.title}</h3>
            <span>
              <p className="text-start tourName">Created By: {tour.name}</p>
            </span>
            <div style={{ float: "left" }}>
              <span className="text-start">
                {tour && tour.tags && tour.tags.map((item) => `#${item} `)}
              </span>
            </div>
            <br />
            <MDBCardText className="text-start mt-2">
              <MDBIcon style={{ float: "left", margin: "5px" }} far icon="calendar-alt" size="lg" />
              <small className="text-muted">
                {moment(tour.createdAt).fromNow()}
              </small>
            </MDBCardText>
            <MDBCardText className="lead mb-0 text-start">
              {tour.description}
            </MDBCardText>
          </MDBCardBody>
          <RelatedTours relatedTours={relatedTours} tourId={id} />
        </MDBCard>
        <DisqusThread id={id} title={tour.title} path={`/tour/${id}`} />
      </MDBContainer>
    </>
  )
}

export default SingleTour