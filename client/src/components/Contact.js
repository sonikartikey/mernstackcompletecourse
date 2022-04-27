import React, { useEffect, useState } from 'react'



const Contact = () => {

  const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" });

  const userContact = async () => {
    try {
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      const data = await res.json()

      setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone })
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
    userContact();
  }, [])

  // we are storingg message

  const handleInputs = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUserData({ ...userData, [name]: value })
  }

  //send the data to backend
  const sendMessage = async (e) => {
    e.preventDefault()
    const { name, email, phone, message } = userData
    const res = await fetch('/contact', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ name, email, phone, message  })
    })
    //givinf syntax error
    // const data = res.json();
    const data = await res.text();

    if ( !data) {
      window.alert("Message not sent ")
      console.log("Message not sent ")

    } else {
      window.alert("message sent succesfully")
      console.log("message sent succesfully")
      setUserData({...userData, message:""})
    }
  }

  return (
    <>
      <div className='contact_info'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-10 offset-lg-1 d-flex justify-content-between'>
              <div className='contact_info_item d-flex justify-content-start align-item-center'>
                <img src='' alt='' />
                <div className='contact_info_content'>
                  <div className='contact_info_title'>
                    Phone
                  </div>
                  <div className='contact_info_text'>
                    +919045004177
                  </div>
                </div>
              </div>

              <div className='contact_info_item d-flex justify-content-start align-item-center'>
                <img src='' alt='' />
                <div className='contact_info_content'>
                  <div className='contact_info_title'>
                    Email
                  </div>
                  <div className='contact_info_text'>
                    sonikartikey@gmailcom
                  </div>
                </div>
              </div>

              <div className='contact_info_item d-flex justify-content-start align-item-center'>
                <img src='' alt='' />
                <div className='contact_info_content'>
                  <div className='contact_info_title'>
                    Address
                  </div>
                  <div className='contact_info_text'>
                    +Modinagar
                  </div>
                </div>
              </div>


            </div>

          </div>
        </div>
      </div>

      <br /><br /><br /><br /><br />
      <div class="signup-form">
        <h2 class="form-title">Get In Touch</h2>

        <form method="POST" class="register-form" id="register-form">
          <div class="form-group">
            <label htmlFor="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
            <input type="text" name="name" id="name" value={userData.name} onChange={handleInputs}
              placeholder="Your Name" />
          </div>
          <div class="form-group">
            <label htmlFor="email"><i class="zmdi zmdi-email"></i></label>
            <input type="email" name="email" id="email" value={userData.email} onChange={handleInputs}
              placeholder="Your Email" />
          </div>

          <div class="form-group">
            <label htmlFor="phone"><i class="zmdi zmdi-phone-in-talk"></i></label>
            <input type="text" name="phone" id="phone" value={userData.phone} onChange={handleInputs}
              placeholder="Your Profession" />
          </div>

          <div class="form-group">
            <label htmlFor="message"><i class="zmdi zmdi-slideshow"></i></label>
            <input type="text" name="message" id="message"
              value={userData.message}
              onChange={handleInputs} placeholder="Your Message" />
          </div>

          <div class="form-group form-button">
            <input type="submit" name="signup" id="signup" onClick={sendMessage} class="form-submit" value="Send Message" />
          </div>
        </form>
      </div>


    </>
  )
}

export default Contact