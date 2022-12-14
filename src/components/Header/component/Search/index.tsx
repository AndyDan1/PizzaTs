import React, {memo, useCallback, useContext, useEffect, useRef, useState} from 'react';
import debounce from 'lodash.debounce'
import classes from './styles.module.scss';
import {useDispatch} from "react-redux";
import {setSearchValue} from "../../../../redux/slice/filterSlice";

const Search:React.FC = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // const onClickClear = (e:React.MouseEvent<SVGSVGElement>) => {
  const onClickClear = () => {
    setValue('')
    dispatch(setSearchValue(''))
    inputRef.current?.focus()
  }

  const updateSearchValue = useCallback(
    debounce((str:string) => {
      // dispatch(setSearchValue(''))
      dispatch(setSearchValue(str))
    }, 300),
    []
  )
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    updateSearchValue(e.target.value)
  }

  return (
    <div className={classes.root}>
      <svg className={classes.icon}
           enableBackground="new 0 0 50 50" height="50px" id="Layer_1" version="1.1" viewBox="0 0 50 50" width="50px"
           xmlns="http://www.w3.org/2000/svg">
        <rect fill="none" height="50" width="50"/>
        <circle cx="21" cy="20" fill="none" r="16" stroke="#000000" strokeLinecap="round" strokeMiterlimit="10"
                strokeWidth="2"/>
        <line fill="none" stroke="#000000" strokeMiterlimit="10" strokeWidth="4" x1="32.229" x2="45.5" y1="32.229"
              y2="45.5"/>
      </svg>
      <input
        ref={inputRef}
        type="text"
        placeholder="Пошук піци...."
        value={value}
        onChange={onChangeInput}
      />

      {
        value
        &&
        <svg className={classes.close}
             onClick={onClickClear}
             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
        </svg>
      }

    </div>
  );
};

export default memo(Search);