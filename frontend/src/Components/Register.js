import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('')

  // fnc register

  const createUser = async (events) => {
    //  agar tidak reload saat diclick / saat ada events
    events.preventDefault();

    try {
      await axios.post("http://localhost:5005/users", {
        name: name,
        email: email,
        password: password,
        confirmPass: confirmPassword
      });
      navigate('/')
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message)
      }
    }
  }

  return (
      <section className='hero has-background-grey-light is-fullheight is-fullwidth'>
          <div className='hero-body'>
              <div className='container'>
                  <div className='columns is-centered'>
                      <div className='column is-4-desktop'>
                          <form onSubmit={createUser} className='box'> 
                              <p className='has-text-centered has-text-danger mb-5'>{message}</p>
                              {/* register form */}
                              <div className='field mt-5'>
                                <label className='label'>Name</label>
                                <div className='controls'>
                                  <input type='text' className='input' placeholder='name.....' value={name} onChange={(e) => setName(e.target.value)}/>
                                </div>
                              </div>
                              <div className='field mt-5'>
                                <label className='label'>Email</label>
                                <div className='controls'>
                                  <input type='text' className='input' placeholder='email.....' value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                              </div>
                              <div className='field mt-5'>
                                <label className='label'>Password</label>
                                <div className='controls'>
                                  <input type='password' className='input' placeholder='*********' value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                              </div>
                              <div className='field mt-5'>
                                <label className='label'>Confirm Password</label>
                                <div className='controls'>
                                  <input type='password' className='input' placeholder='*********' value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)}/>
                                </div>
                              </div>
                              <div className='field mt-5'>
                                <button className='button is-success is-fullwidth'>Register</button>
                              </div>
                              {/* end register form */}
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </section>
  )
}


export {
  Register
}
