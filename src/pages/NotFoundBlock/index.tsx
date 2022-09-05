import React, {memo} from 'react';
import classes from './styles.module.scss';


const NotFoundBlock:React.FC = () => {
  return (
    <div className={classes.root}>
    {/*<div>*/}
      <span>😕</span>
      <br/>
      <h1>Ничего не найдено</h1>
      <p>Страница отсутствует</p>
    </div>
  );
};

export default memo(NotFoundBlock);