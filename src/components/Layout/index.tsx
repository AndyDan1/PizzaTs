import React, {memo} from 'react';
// import classes from './styles.module.scss';
import Header from "../Header";
import {Outlet} from 'react-router-dom'

const Layout:React.FC = () => {
  return (
    <>
      <div className="wrapper">
        <Header/>
        <div className="content">

          <Outlet/>

        </div>
      </div>
    </>
  );
};

export default memo(Layout);