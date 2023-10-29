import React, { useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Success from '../components/Success'
import Swal from 'sweetalert2'

function Registerscreen() {
    const [name,setName]= useState('')
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const [cpassword,setCpassword]= useState('')
    const [type,setType] =useState('')
const [secretkey,setSecretkey]= useState('')
    const [loading,setLoading]= useState(false)
     const [error,setError]=useState()
     const [success,setSuccess] = useState()

 async function Register(){

  if(type == 'admin' && secretkey != 'i am admin'){
    alert('secretkey does not match')
    return
  }
   if(password==cpassword){
    const user ={name,email,password,cpassword,type}
    try {
      setLoading(true)
      const result = await axios.post('api/users/register',user).data
      setLoading(false)
      setSuccess(true)
      setName('')
      setEmail('')
      setPassword('')
      setCpassword('')
 Swal.fire('congrats','Registration Successfully','success').then(e=>{
  window.location.href ='/login'
 })
    } catch (error) {
      console.log(error)
      setLoading(false)
      setError(true)
    }
    console.log(user)
   }else{
    alert('Password does not match')
   }
 }
  return (
    <div>
      {loading && (<Loader/>)}
      {error && (<Error/>)}
     
<div className='row mt-5 justify-content-center '>
      
      <div className="col-md-5 m-5 ">
      {success && (<Success message={'Registration successfully'}/>)}
         <div className="bs">
         <h2>Register</h2>
        {/* radio button */}
    <div>
  <div className="form-check">
    <input className="form-check-input" type="radio" value='user' onChange={(e)=>setType(e.target.value)} name="flexRadioDefault" id="flexRadioDefault1" />
    <label className="form-check-label" htmlFor="flexRadioDefault1">
      User
    </label>
  </div>
  <div className="form-check">
    <input className="form-check-input" type="radio" value='admin' onChange={(e)=>setType(e.target.value)} name="flexRadioDefault" id="flexRadioDefault2"  />
    <label className="form-check-label" htmlFor="flexRadioDefault2">
     Admin
    </label>
  </div>
</div>

{type == 'admin' ? (<div>
   <div className="mb-3">
   
    <input type="text" value={secretkey} placeholder='Enter Secret Key' onChange={(e)=>setSecretkey(e.target.value)} />
   </div>
  </div>):null}
  

          <input type="text" className='form-control' placeholder='name' value={name} onChange={(e)=>setName(e.target.value)}/>
          <input type="text" className='form-control' placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" className='form-control' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <input type="password" className='form-control' placeholder='Confirm password' value={cpassword} onChange={(e)=>setCpassword(e.target.value)}/>
          
<button className='btn btn-dark mt-3'  onClick={Register}>Register</button>
         </div>
      </div>
    

  </div>

    </div>
  )
}

export default Registerscreen