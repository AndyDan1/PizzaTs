import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {filterSlice} from "./filterSlice";
import {RootState} from "../store";
import {CartItem} from "./cartSlice";

type Pizza = {
  price: number;
  title: string;
  imageUrl: string;
  sizes: number[];
  types: number[];
  id: string;
  // currentPage:number
}

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface IPizzaSlice {
  items: Pizza[];
  status: Status
}


const initialState: IPizzaSlice = {
  items: [],
  status: Status.LOADING, //loading success error
}

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
  'pizzas/fetchPizzasStatus',
  async (params) => {
    const {order, sortBy, category, search, currentPage} = params
    const {data} = await axios.get<Pizza[]>(
      `https://62f69b45a3bce3eed7c4bf4f.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
    return data
  }
)

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    // setItems(state, action) {
    // state.items = action.payload
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action:PayloadAction<Pizza[]>) => {
      state.items = action.payload
      state.status = Status.SUCCESS
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
  },
})

export const selectPizzaData = (state: RootState) => state.pizzas

export const {} = pizzasSlice.actions

export default pizzasSlice.reducer