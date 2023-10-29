import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2'
import { Badge, Tabs } from 'antd';
const { TabPane } = Tabs;
function Profilescreen() {
const user = JSON.parse(localStorage.getItem('currentUser'));

useEffect(()=>{
    if(!user){
        window.location.href='/login'
    }
},[])

  return (
    <div className='ml-3 mt-3'>
 <Tabs defaultActiveKey="1" >
    <TabPane tab="Profile" key="1">
      <div className='bs'>
      <h1>My Profile</h1><br />
      <h1>Name : {user.name}</h1>
      <h1>Email : {user.email}</h1>
      <h1>IsAdmin : {user.isAdmin ? 'yes':'No'}</h1>
      </div>


    </TabPane>
    <TabPane tab="Bookings" key="2">
<MyBookings/>
    </TabPane>
    
  </Tabs>
</div>
  )
}

export default Profilescreen

export function MyBookings(){
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [bookings,setBookings]=useState()
    const [loading,setLoading]= useState(false)
    const [error,setError]= useState()
    useEffect(()=>{
 async function fetchingData(){
    try {
        setLoading(true)
        const data = (await axios.post('/api/bookings/getbookingsbyuserid',{userid:user._id})).data
    console.log(data)
    setBookings(data)
    setLoading(false)
    
    } catch (error) {
        console.log(error)
        setLoading(false)
        setError(true)
       
    }
}
fetchingData();
    },[])

   async function cancelBooking(bookingid,roomid){
try {
    setLoading(true)
    const result = (await axios.post('/api/bookings/cancelbooking',{bookingid,roomid})).data
console.log(result)
setLoading(false)
Swal.fire('congrats','your booking cancelled successfully','success').then(result=>{
    window.location.reload()
})
} catch (error) {
    console.log(error)
setLoading(false)
Swal.fire('Opps','somwthing went wrong','error')

}
    }
return(
    <div>
      <div className="row">
        <div className="col-md-6">
 {loading && (<Loader/>)}
 {bookings && (bookings.map(booking=>{
     return <div className='bs'>
        <h1>{booking.room}</h1>
        <p><b>BookingId : </b> {booking._id}</p>
        <p><b>CheckIn : </b>{booking.fromdate}</p>
        <p><b>CheckOut : </b>{booking.todate}</p>
        <p><b>Amount :</b> {booking.totalamount}</p>
        <p><b>Status :</b> {booking.status == 'booked' ? (<Badge className='alert alert-success'>CONFIRMED</Badge>) : (<Badge className='alert alert-danger'>CANCELLED</Badge>)}</p>
        {booking.status !== 'CANCELLED' && (
            <div className='text-right'>
            <button className='btn btn-dark' onClick={()=> cancelBooking(booking._id,booking.roomid)}>Cancel Booking </button>
        </div>
        )}
    </div>
 }))}
        </div>
      </div>
    </div>
)
}