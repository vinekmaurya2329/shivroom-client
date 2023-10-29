import React,{useState} from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Success from '../components/Success'
import { Navigate, useNavigate } from 'react-router-dom'
function Loginscreen() {
  const navigate = useNavigate()
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')

    const [loading,setLoading]= useState(false)
     const [error,setError]=useState()
     async function Login(){
        
         const user ={email,password}
         try {
          setLoading(true);
          const result = (await axios.post('api/users/login',user)).data
          console.log(result)
          setLoading(false);
          
          localStorage.setItem('currentUser',JSON.stringify(result));
          
          navigate('/home');
          window.location.reload()
        } catch (error) {
          console.log(error)
          setLoading(false)
          setError(true)
        }
         console.log(user)
      
        }
      
  return (
    <div>
        {loading && (<Loader/>)}
        <div className='row mt-5 justify-content-center '>
      
      <div className="col-md-5 m-5 ">
        {error && (<Error message ={'invalid credintial'}/>)}
         <div className="bs">
         <h2>Login</h2>
          
          <input type="text" className='form-control' placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" className='form-control' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          
<button className='btn btn-dark mt-3'  onClick={Login}>Login</button>
         </div>
      </div>
    

  </div>
    </div>
  )
}

export default Loginscreen