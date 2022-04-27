import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../App';


const Logout = () => {
  const {state, dispatch} = useContext(userContext)


  //this time conenct backend using using promise
  const navigate = useNavigate();
  useEffect(() => {
    fetch('/logout',{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      credentials: "include"
    }).then((res)=>{
      dispatch({type:'USER', payload :false}) 
      navigate('/login' ,{replace: true})
      if(!res.status == 200){
        throw new Error(res.error)
      }
    }).catch((err)=>{
      console.log(err);
    })
  })

  return (
    <></>
  )
}

export default Logout