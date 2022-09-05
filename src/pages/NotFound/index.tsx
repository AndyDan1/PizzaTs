import React, {memo} from 'react';
import NotFoundBlock from "../NotFoundBlock";
// import classes from './styles.module.scss';

const NotFound:React.FC = () => {
  return (
    <>
      <NotFoundBlock/>
    </>
  );
};

export default memo(NotFound);