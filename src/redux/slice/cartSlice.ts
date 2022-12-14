import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
}

export interface ICartSlice {
  totalPrice: number;
  items: CartItem[];
}

const initialState: ICartSlice = {
  totalPrice: 0,
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(obj => obj.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }
      state.totalPrice = state.items.reduce((acc, obj) => acc += obj.count * obj.price, 0)
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find(obj => obj.id === action.payload)
      if (findItem) {
        findItem.count--
      }
      state.totalPrice = state.items.reduce((acc, obj) => acc += obj.count * obj.price, 0)
    },
    plusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find(obj => obj.id === action.payload)
      if (findItem) {
        findItem.count++
      }
      state.totalPrice = state.items.reduce((acc, obj) => acc += obj.count * obj.price, 0)
    },

    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(obj => obj.id !== action.payload)
      state.totalPrice = state.items.reduce((acc, obj) => acc += obj.count * obj.price, 0)
    },
    clearItem(state) {
      state.items = []
      state.totalPrice = 0
    },
  },
})

// export const selectCart = (state:RootState) => state.cart
// export const selectCartItemById = (id: string)=>(state:RootState)=>
// state.cart.items.find((obj)=>obj.id===id)

export const {addItem, removeItem, clearItem, minusItem, plusItem} = cartSlice.actions

export default cartSlice.reducer