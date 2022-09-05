import React from "react";
import {Routes, Route} from "react-router-dom";
import {books} from "./constans/books";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import FullPizza from "./components/FullPizza";
import Layout from "./components/Layout";


function App() {
  return (
    <Routes>
      <Route path={books.home} element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path={books.cart} element={<Cart/>}/>
        <Route path={books.pizzaItems} element={<FullPizza/>}/>
        <Route path={books.error} element={<NotFound/>}/>
      </Route>
    </Routes>
  );
}

export default App;
