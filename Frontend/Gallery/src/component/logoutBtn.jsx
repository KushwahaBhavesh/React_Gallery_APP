import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const logoutBtn = () => {

  const navigate = useNavigate();
  const handleLogoutBtn = async () => {
    try {
      const config = { Headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(`http://localhost:5000/api/auth/logout`, config);

      if (data && data.success) {
        toast.success(data.msg)
        setTimeout(()=>{navigate('/')},3000)
      }

    } catch (error) {
      toast.error(error);
    }
  }
  return <>
    <button className="btn btn-success" onClick={handleLogoutBtn}>Logout</button>
  </>
}

export default logoutBtn
