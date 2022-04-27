import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch('/about', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        credentials: "include"
      })
      const data = await res.json()
      setUserData(data)
      console.log(data)
      
      if(!res.status == 200){
        throw new Error(res.error)
      }
    }
    catch (err) {
      console.log("here error in front end")
      navigate("/login")
    }
  }

  useEffect(() => {
    callAboutPage();
  }, [])


  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-6 mb-4 mb-lg-0">
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4 gradient-custom text-center text-white">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="Avatar" className="img-fluid my-5" />
                    <h5>{userData.name}</h5>
                    <p>{userData.work}</p>
                    <i className="far fa-edit mb-5"></i>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h6>Information</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Name</h6>
                          <p className="text-muted">{userData.name}</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Email</h6>
                          <p className="text-muted">{userData.email}</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Phone</h6>
                          <p className="text-muted">{userData.phone}</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Profession</h6>
                          <p className="text-muted">{userData.work}</p>
                        </div>
                      </div>
                      <h6>Profile</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>User Id</h6>
                          <p className="text-muted">{userData._id}</p>
                        </div>
                        <div className="col-6 mb-3">
                          
                          <button className="btn btn-primary"> Edit Profile</button>
                        </div>
                      </div>
                      <div className="d-flex justify-content-start">
                        <a href="#!"><i className="fab fa-facebook-f fa-lg me-3"></i></a>
                        <a href="#!"><i className="fab fa-twitter fa-lg me-3"></i></a>
                        <a href="#!"><i className="fab fa-instagram fa-lg"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About