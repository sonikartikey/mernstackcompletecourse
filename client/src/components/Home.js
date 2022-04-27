import React, { useEffect, useState } from 'react'

const Home = () => {

  const [userName, setUserName] = useState('');
  const [show, setShow] = useState(false);

  const userHomePage = async () => {
    try {
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      const data = await res.json()

      setUserName(data.name)
      setShow(true)
      console.log(data)
      if (!res.status == 200) {
        throw new Error(res.error)
      }
    }
    catch (err) {
      console.log("here error in front end")
    }
  }

  useEffect(() => {
    userHomePage();
  }, [])

  return (
    <>
      <div class="split left">
        <div class="centered">

          <h2>{userName}</h2>
          <p>{show ? ' Happy to seee you Back':'we are the MERN Developer'}</p>
        </div>
      </div>

      <div class="split right">
        <div class="centered">

          <h2>John Doe</h2>
          <p>Some text here too.</p>
        </div>
      </div>
    </>
  )
}

export default Home