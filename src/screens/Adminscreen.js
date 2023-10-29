import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";

const { TabPane } = Tabs;

function Adminscreen() {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  useEffect(() => {
    
    if (JSON.parse(localStorage.getItem("currentUser")).type !== 'admin') {
      Swal.fire("Opps", "You are not a admin", "error").then((e) => {
        window.location.href = "/home";
      });
    }
  }, []);
  return (
    <div className="mt-3 ml-3 mr-3 bs">
      <h2 className="text-center" style={{ fontSize: "30px" }}>
        <b>Admin Panel</b>
      </h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>
        <TabPane tab="Add Room" key="3">
     <Addroom/>
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;

export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchingData() {
      try {
        setLoading(true);
        const data = (await axios.get("/api/bookings/getallbookings")).data;
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    }
    fetchingData();
  }, []);
  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Bookings</h1>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Booking Id</th>
              <th>User Id</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length &&
              bookings.map((booking) => {
                return (
                  <tr>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.room}</td>
                    <td>{booking.fromdate}</td>
                    <td>{booking.todate}</td>
                    <td>{booking.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchingData() {
      try {
        setLoading(true);
        const data = (await axios.get("/api/rooms/getallrooms")).data;
        setRooms(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    }
    fetchingData();
  }, []);
  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Bookings</h1>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Room Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Rent per day</th>
              <th>Max count</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length &&
              rooms.map((room) => {
                return (
                  <tr>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.rentperday}</td>
                    <td>{room.maxcount}</td>
                    <td>{room.phonenumber}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchingData() {
      try {
        setLoading(true);
        const data = (await axios.get("/api/users/getallusers")).data;
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    }
    fetchingData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Users</h1>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Is Admin</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.type}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// add rooms 



 export function Addroom() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
  
const [name,setName] =useState('')
const [rentperday,setRentperday] = useState()
const [maxcount,setMaxcount]= useState()
const[description,setDescription]= useState()
const [phonenumber,setPhonenumber]= useState()
const[type,setType]= useState()
const [imageurl1,setImageurl1]= useState()
const [imageurl2,setImageurl2]= useState()
const [imageurl3,setImageurl3]= useState()

 async function addRoom(){
    const newroom = {
        name,
        rentperday,
        maxcount,
        description,
        phonenumber,
        type,
        imageurls:[imageurl1,imageurl2,imageurl3]
    }
    
    try {
        setLoading(true)
        const result = (await axios.post('/api/rooms/addroom',newroom)).data
        console.log(result)
        setLoading(false)
        Swal.fire('congrats','Your New Room Added Successfully','success').then(result=>{
            window.location.href = '/home'
        })
    } catch (error) {
        console.log(error)
        setLoading(false)
Swal.fire('Opps','Something went wrong','error')
    }
}

  return (
    <div className="row">
      
        <div className="col-md-5">
        {loading && (<Loader/>)}
<input type="text" className="form-control" placeholder="Room Name" value={name} onChange={(e)=>setName(e.target.value)} />
<input type="text" className="form-control" placeholder="Rent per day" value={rentperday}  onChange={(e)=>setRentperday(e.target.value)}/>
<input type="text" className="form-control" placeholder="Max Count " value={maxcount}  onChange={(e)=>setMaxcount(e.target.value)}/>
<input type="text" className="form-control" placeholder="Description " value={description} onChange={(e)=>setDescription(e.target.value)}/>
<input type="text" className="form-control" placeholder="Phone Number" value={phonenumber} onChange={(e)=>setPhonenumber(e.target.value)} />

        </div>
        <div className="col-md-5">
       <select value={type} onChange={(e)=>setType(e.target.value)} >
        <option value="delux">Delux</option>
        <option value="Non-Delux">Non-Delux</option>
       </select>
<input type="text" className="form-control" placeholder="Image URL 1 " value={imageurl1} onChange={(e)=>setImageurl1(e.target.value)} />
<input type="text" className="form-control" placeholder="Image URL 2" value={imageurl2} onChange={(e)=>setImageurl2(e.target.value)} />
<input type="text" className="form-control" placeholder="Image URL 3 " value={imageurl3} onChange={(e)=>setImageurl3(e.target.value)} />
<div className="text-right">
    <button className="btn btn-dark mt-2" onClick={addRoom}> Add Room</button>
</div>
</div>
    </div>
  )
}

