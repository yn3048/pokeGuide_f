import React from 'react'
import Header from '../components/main/Header'
import '../styles/default.scss';


const DefaultLayout = ({children}) => {
  return (
    <div className="Wrap">
      <Header/>
      <main>
            {children}
      </main>
    </div>
  )
}

export default DefaultLayout
