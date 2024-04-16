import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const UploadForm = () => {

  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [isToken, setToken] = useState(null);

  useEffect(() => {
    const jwtToken = Cookies.get('token');
    setToken(jwtToken)
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization':`Bearer ${isToken}`
        },
        withCredentials:true
       
      });


      if (response && response.data.success) {
        toast.success(response.data.msg);
        setTimeout(() => navigate('/gallery/dashboard'), 2000)
      } else {
        toast.error(response.data.msg)
      }

    } catch (error) {
      // custom error handling
      if (error.response.status === 401) {
        toast.error(error.response.data.msg)
        // setTimeout(() => navigate('/login'), 3000)
      } else if (error.response.status === 400) {
        toast.error(error.response.data.msg)
      }
    }




  };


  return <>
    <div className="container-fluid bg-light ">
      <div className="row row-cols-auto vh-100 ">
        <div className="col py-5 d-flex justify-content-center">
          <SideBar selectedTab={"upload"} />
        </div>
        <div className="col-lg-10">
          <div className='d-flex justify-content-center w-50 align-items-start flex-column mt-5'>
            <label htmlFor="formFileMultiple" className="form-label">Select image to upload</label>
            <input className="form-control" type="file" id="formFileMultiple" onChange={handleImageChange} />
            <button type='submit' className='btn btn-primary mt-2 float-end' onClick={handleUpload}>Upload</button>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default UploadForm

