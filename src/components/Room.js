import React ,{useState}from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import { Link, useParams } from 'react-router-dom';

function Room({room,fromdate,todate}) {

  const [show, setShow] = useState(false);
 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
   <div className="row bs">
    <div className="col-md-4">
<img src={room.imageurls[0]} alt="img" className='smallimg' />
    </div>
    <div className="col-md-7 details ">
<h1>{room.name}</h1>
<b><p>MaxCount:{room.maxcount}</p>
<p>Phone No.:{room.phonenumber}</p>
<p>Type:{room.type}</p></b>

<div style={{float:'right'}}>
  
  {
    (fromdate && todate) &&(
      <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
  <button className='btn btn-dark m-2'>Book Now</button>
  </Link>
    )
  }
  
  <button className='btn btn-dark' onClick={handleShow}>view details</button>
</div>
    </div>

    

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header >
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Carousel>
      {
        room.imageurls.map(url=>{
          return <Carousel.Item>
          <img
            className="d-block w-100 bigimg"
            src={url}
            alt="First slide"
          />
        
        </Carousel.Item>
        })
      }
      
    </Carousel>   
<p>{room.description}</p>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="light"className='btn btn-outline-dark' onClick={handleClose}>
            close
          </Button>
         
        </Modal.Footer>
      </Modal>

   </div>
  )
}

export default Room 