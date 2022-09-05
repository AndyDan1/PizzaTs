import React, {memo, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import classes from './styles.module.scss'

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>()

  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchPizza() {
      try {
        const {data} = await axios.get('https://62f69b45a3bce3eed7c4bf4f.mockapi.io/items/' + id)
        setPizza(data)
      } catch (error) {
        alert('ошибка при получении данних')
        navigate('/')
      }
    }

    fetchPizza();
  }, [])

  if (!pizza) {
    return <>Загрузка....</>
  }
  return (
    <div className="container">
      <div className={classes.root}>
        <div className={classes.img}>
          <img src={pizza.imageUrl} alt=""/>
        </div>
        <h2>{pizza.title}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, illum libero! Beatae obcaecati perferendis, qui quod sed sit tempora. Amet consequatur dolor iure natus omnis optio porro quasi recusandae rem.</p>
        <h4>{pizza.price}grn</h4>
      </div>
    </div>
  );
};

export default memo(FullPizza);