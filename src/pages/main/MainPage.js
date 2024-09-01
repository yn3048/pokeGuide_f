import React from 'react'
import '../../styles/main.scss';
import DefaultLayout from '../../layouts/DefaultLayout';
import Dashboard from '../../components/main/Dashboard';

const MainPage = () => {
  return (
    <DefaultLayout>  
      <Dashboard/>
    </DefaultLayout>
  )
}
export default MainPage
