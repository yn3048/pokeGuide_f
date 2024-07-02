import React from 'react'
import Header from '../components/main/Header'
import Contents from '../components/main/Contents'

const DefaultLayout = ({children}) => {
  return (
    <div className="wrap">
      <Header/>
      <main>
        <Contents>{children}</Contents>
      </main>
      <Footer/>
    </div>
  )
}

export default DefaultLayout
