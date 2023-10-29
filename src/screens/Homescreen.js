import React , {useState,useEffect} from 'react';
import axios from 'axios';
import 'antd/dist/reset.css';
// import 'antd/dist/antd.css';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

function Homescreen() {
const [rooms,setRooms]= useState([])
const [loading,setLoading]= useState()
const [error,setError]=useState()
const [fromdate,setFromdate]= useState()
const [todate,setTodate]= useState()
const [duplicaterooms,setDuplicaterooms]= useState([])
const[searchkey,setSearchkey]= useState();
const [type,setType]=useState('All')
useEffect( () => {
    async function fetchingData(){
         try {
            setLoading(true)
    const data= (await axios.get('/api/rooms/getallrooms')).data
    setRooms(data)
    setDuplicaterooms(data)
    setLoading(false)
    console.log(data)  
  } catch (error) { 
    setError(true)
    console.log(error) 
    setLoading(false)
  }
    }
 
fetchingData();

  },[]) 

function filterByDate(dates){
  console.log(dates)
  // console.log(dates[0].$d)
// console.log(moment(dates[0].$d).format('DD-MM-YYYY'));
// console.log(moment(dates[1]).format('DD-MM-YYYY'));
setFromdate(moment(dates[0].$d).format('DD-MM-YYYY'))
setTodate(moment(dates[1].$d).format('DD-MM-YYYY'))

var temprooms = []
var availability = false
for(const room of duplicaterooms){

  if(room.currentbookings.length >0){
    for(const  booking of room.currentbookings){
   if(moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(booking.fromdate,booking.todate) &&
   moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(booking.fromdate,booking.todate)
   ){
if( moment(dates[0]).format('DD-MM-YYYY') !== booking.fromdate &&
moment(dates[0]).format('DD-MM-YYYY') !== booking.todate &&
moment(dates[1]).format('DD-MM-YYYY') !== booking.fromdate &&
moment(dates[1]).format('DD-MM-YYYY') !== booking.todate 
){
  availability = true;
}

   }
    }
  }
  if(availability = true || room.currentbookings.length ==0){
    temprooms.push(room)
  }
  setRooms(temprooms)
}
}
function filterBySearch(){
const temprooms = duplicaterooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()))
setRooms(temprooms)
}

function filterByType(e){
  setType(e)
if(e!=='All'){
  const temprooms = duplicaterooms.filter(room=>room.type.toLowerCase() == e.toLowerCase())
  setRooms(temprooms)
}else{ setRooms(duplicaterooms)}
}
  return (
    <div className='container'>
      <div className="row mt-5 bs">
        <div className="col-md-3">
        <RangePicker format='DD-MM-YYYY' onChange={filterByDate}/>
        </div>
        <div className="col-md-3">
          <input type="text" className='form-control' value={searchkey} onChange={(e)=>setSearchkey(e.target.value)} onKeyUp={filterBySearch} placeholder='Search Room' />
        </div>
       <div className="col-md-3">
       <select className='form-control'value={type} onChange={(e)=>filterByType(e.target.value)} >
          <option value="All">All</option>
          <option value="Delux">Delux</option>
          <option value="Non-Delux">Non-Delux</option>

        </select>
       </div>
      </div>
     <div className="row justify-content-center mt-5">

     {loading ? (<h1><Loader/></h1>):  (rooms.map((room)=>{
return <div className="col-md-9 mt-2"> 
    <Room room={room} fromdate= {fromdate} todate={todate}/> 
</div>
        }))}
     </div>
    </div>
  )
  }
export default Homescreen