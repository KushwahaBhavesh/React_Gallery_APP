import axios from 'axios'
import React, { useEffect, useState } from 'react'

const protectedRoute = () => {
  const [msg,setMsg]= useState('');
  axios.defaults.withCredentials=true;
  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/protected')
    .then(res=>setMsg(res.data.msg))
    .catch(error=>console.log(error))
  }, [])

  return (
    <div>
      protected:::::{msg}
    </div>
  )
}

export default protectedRoute
