import React ,{useState,useEffect} from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import {  useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import Success from '../components/Success';


function Bookingscreen({match}) {
  const [loading,setLoading]= useState(true)
  const [error,setError]= useState()
  const [success,setSuccess]= useState(false)
  const [room,setRoom]= useState([])
  const params = useParams()
  const {fromdate}= params;
  const {todate}= params;
  const {roomid}= params;
  const fdate = moment(params.fromdate,'DD-MM-YYYY') ;
  const ldate =moment( params.todate,'DD-MM-YYYY');
  
  

 const totaldays = moment.duration(ldate.diff(fdate)).asDays()+1
//  const totalamount = totaldays* room.rentperday
 const [totalamount,setTotalamount] = useState()


  useEffect(()=>{


    async function fetchingData(){
 if(!localStorage.getItem('currentUser')){
  window.location.href= '/login'
 }
      try {
  setLoading(true)
  // const data = await axios.get(`/api/rooms/getroombyid/${roomid}`).then(res=>{console.log(res)}).catch(e=>{console.log(e)})
  const data= (await axios.get(`/api/rooms/getroombyid/${roomid}`)).data;
  // console.log(data)
  //  const data =params;
  setRoom(data)
  
setTotalamount(data.rentperday * totaldays)

  setLoading(false)
} catch (error) {
  console.log(error)
  setError(true) 
  setLoading(false)
 
  
} 
    }
fetchingData();

  },[params]) 

   async function bookRoom(){
     const bookingDetails = {
      room,
      userid:JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate,
      todate,
      totalamount,
      totaldays
     }
     try {
      const result = await axios.post('/api/bookings/bookroom',bookingDetails)
      Swal.fire('congrats','Room Booked Successfully','success').then(e=>{
        window.location.href= '/profile'
      })

     } catch (error) {
      
     }
  }
 
 
  return (
    <div className='m-5'>
     
     <div>
      {
        loading ? (<h1><Loader/></h1>):room ?  (<div>
          <div className="row justify-content-center mt-5 bs">
           
            
            <div className="col-md-6">
            {success ? (<Success message={'Room Booked Successfully'}/>):('')}
              <h1>name:{room.name}</h1>
              <img src={room.imageurls[0]} alt="roomImg" className='bigimg'/>
              
            </div>
            <div className="col-md-6">
              <div style={{textAlign:'right'}}>
              <b> <h1>Booking Details</h1>
                <hr />
                <p>Name :{JSON.parse(localStorage.getItem('currentUser')).name}</p>
                <p>From Date : {fromdate}</p>
                <p>To Date : {todate}</p>
                <p>Max Count :</p></b>
              </div>
              <div style={{textAlign:'right'}}>
                <h1>Amount</h1>
                <hr />
               <b> <p>Total days :{totaldays}</p>
                <p>Rent per day :{room.rentperday}</p>
                <p>Total Amount :{totalamount}</p></b>
              </div>
              <div style={{float:'right'}}>
                <button className='btn btn-dark' onClick={bookRoom} >Confirm Booking</button>
              </div>
            </div>
          </div>
        </div>):(<Error/>)
      }
     </div>
      
      
      
    </div>
  )
}

export default Bookingscreen 