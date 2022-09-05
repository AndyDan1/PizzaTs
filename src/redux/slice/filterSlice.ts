import { createSlice, PayloadAction} from '@reduxjs/toolkit'

export type Sortt={
  name: string,
  sortProperty: 'rating'|'price'|'title'|'-rating'|'-price'|'-title'
}

export interface IFilterSlice {
  searchValue:string,
  categoryId:number,
  currentPage:number,
  sort:Sortt,
}

const initialState:IFilterSlice = {
  searchValue:'',
  categoryId:0,
  currentPage:1,
  sort:{
    name: 'популярности(DESC)',
    sortProperty: 'rating'
  },
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
   setCategoryId(state, action:PayloadAction<number>){
     state.categoryId = action.payload
   },
   setSearchValue(state, action:PayloadAction<string>){
     state.searchValue = action.payload
   },
    changeTypeSort(state,action:PayloadAction<Sortt>){
      state.sort=action.payload
    },
    setPageCount(state,action:PayloadAction<number>){
      state.currentPage=action.payload
    },
    setFilters(state,action:PayloadAction<IFilterSlice>){
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    }
  },
})

export const { setCategoryId,changeTypeSort,setPageCount,setFilters,setSearchValue } = filterSlice.actions

export default filterSlice.reducer