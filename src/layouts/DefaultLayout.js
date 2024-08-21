import React from 'react'
import Header from '../components/main/Header'
import Contents from '../components/main/Contents'
import '../styles/default.scss';

const DefaultLayout = ({children}) => {
  return (
    <div className="wrap">
      <Header/>
      <div className='main'>
        <Contents>{children}</Contents>
      </div>
    </div>
  )
}

export default DefaultLayout
