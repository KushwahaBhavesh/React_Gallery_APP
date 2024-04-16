import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../component/Layouts/Layout'

const index = () => {
  return <>
    <Layout>
      <section className='d-flex justify-content-center align-items-center vh-100 gap-5'>
        <Link to="/login" ><button className='btn btn-primary'>Login</button></Link>
        <Link to="/register"> <button className='btn btn-primary'>SignIn</button></Link>
      </section>
    </Layout>
  </>
}

export default index
