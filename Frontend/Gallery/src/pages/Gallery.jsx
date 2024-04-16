
import SideBar from "../component/SideBar";
import ImageContainer from '../component/ImageContainer/ImageContainer'
import axios from 'axios'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from "react";
import NotFound from "../component/NotFound/NotFound";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [image, setImage] = useState([])




  useEffect(() => {
    const jwtToken = Cookies.get('accessToken');
    const decoded = jwtDecode(jwtToken);
    const userId = decoded.userId
    const fetchImage = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/image/user/${userId}`, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true
        });
        setImage(data)

      } catch (error) {
        console.log("error while featching image", error);
      }
    }
    fetchImage();
  }, [])



  return (<>
    <div className="container-fluid bg-light ">
      <div className="row row-cols-auto vh-100 ">
        <div className="col py-5 d-flex justify-content-center">
          <SideBar selectedTab={"gallery"} />
        </div>
        <div className="col-lg-10">
          <ImageContainer image={image} />
        </div>
      </div>
    </div>

  </>)

};

export default Gallery;
