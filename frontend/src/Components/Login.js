import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  return (
      <section className='hero has-background-grey-light is-fullheight is-fullwidth'>
          <div className='hero-body'>
              <div className='container'>
                  <div className='columns is-centered'>
                      <div className='column is-4-desktop'>
                          <form className='box'> 
                              {/* login form */}
                              <div className='field mt-5'>
                                <label className='label'>Email or Username</label>
                                <div className='controls'>
                                  <input type='text' className='input' placeholder='username or email'/>
                                </div>
                              </div>
                              <div className='field mt-5'>
                                <label className='label'>Password</label>
                                <div className='controls'>
                                  <input type='password' className='input' placeholder='*********'/>
                                </div>
                              </div>
                              <div className='field mt-5'>
                                <button className='button is-success is-fullwidth'>Login</button>
                              </div>
                              {/* end login form */}
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </section>
  )
}


export {
  Login
}
