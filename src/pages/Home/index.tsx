import React, {memo, useEffect, useRef} from 'react';
import {useSelector} from "react-redux";
import qs from 'qs'
import {useNavigate} from 'react-router-dom'

import Categories from "../../components/Categories";
import Sort, {sortOption} from "../../components/Sort";
import Skeleton from "../../components/PizzaBlock/Skeleton";
import PizzaBlock from "../../components/PizzaBlock";
import Pagination from "../../components/Pagination";
import {setCategoryId, setPageCount, setFilters} from '../../redux/slice/filterSlice'
import {fetchPizzas} from "../../redux/slice/pizzasSlice";
import {RootState, useAppDispatch} from "../../redux/store";

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const categoryId = useSelector((state: RootState) => state.filters.categoryId)
  const sortType = useSelector((state: RootState) => state.filters.sort)
  const searchValue = useSelector((state: RootState) => state.filters.searchValue)
  const currentPage = useSelector((state: RootState) => state.filters.currentPage)
  const {items, status} = useSelector((state: RootState) => state.pizzas)

  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id))
  }

  const onChangePage = (number: number) => {
    dispatch(setPageCount(number))
  }

  const getPizzas = () => {
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sortType.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''
    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage)
      }))
  }

  //ЕСЛИ БЫЛ ПЕРВЫЙ РЕНДЕР, ТО ЗАПРАШИВАЕМ ПИЦЦЫ
  useEffect(() => {
    // window.scrollTo(0, 0)
    if (!isSearch.current) {
      getPizzas()
    }
    isSearch.current = false
  }, [categoryId, sortType, searchValue, currentPage])

  // ЕСЛИ ИЗМЕНИЛИ ПАРАМЕТРЫ И БЫЛ ПЕРВЫЙ РЕНДЕР
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sortType, searchValue, currentPage])

  //ЕСЛИ БЫЛ ПЕРВЫЙ РЕНДЕР, ТО ПРОВЕРЯЕМ URL-ПАРМЕТРЫ И СОХРАНЯЕМ В РЕДАКС
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = sortOption.find(obj => obj.sortProperty === params.sortProperty)
      //@ts-ignore
      dispatch(setFilters({...params, sort: sort || sortOption[0]}))
      isSearch.current = true
    }
  }, [])

  useEffect(() => {
    dispatch(fetchPizzas({}))
  }, [])

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickCategory={onClickCategory}
        />
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {
        status === 'error' ? <div className="content__error-info">
            <h2>Произошла ошибка</h2>
            <p>
              Не удалось получить пиццы. Попробуйте повторить попытку позже
            </p>
          </div>
          :
          <>
            <div className="content__items">
              {status === 'loading'
                ? [...new Array(8)].map((_, index) => <Skeleton key={index}/>)
                : items.filter((item: any) => (item.title.toLowerCase().includes(searchValue.toLowerCase())))
                  .map((item: any) => (
                    <PizzaBlock
                      key={item.id}
                      title={item.title}
                      price={item.price}
                      imageUrl={item.imageUrl}
                      sizes={item.sizes}
                      types={item.types}
                      id={item.id}
                    />
                  ))}
            </div>
            <Pagination
              onChangePage={onChangePage}
              currentPage={currentPage}
            />
          </>
      }
    </div>
  );
};

export default memo(Home);
