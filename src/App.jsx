import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';

import Layer from './components/Layout/Layout';
import Home from './components/Home/Home';
import Login from './components/Login/Login'
import Notfound from './components/Notfound/Notfound'
import Products from './components/Products/Products'
import Register from './components/Register/Register'
import Brand from './components/Brand/Brand'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import About from './components/About/About'
import Logout from './components/Logout/Logout'
import CounterContextProvider from '../context/counterContext'
import ProtectedRouter from './components/ProtectedRouter/ProtectedRouter'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CartContextProvider from '../context/cartContext'
import WishListContextProvider from '../context/wishContext';  // ✅ Import Wishlist Context
import { Toaster } from 'react-hot-toast';
import CheckOut from'./components/CheckOut/CheckOut'

function App() {
  let query= new QueryClient();
  const [count, setCount] = useState(0)

  let x = createBrowserRouter([
    {path:'',element:<Layer/>,children:[
      {path:'home',element:<ProtectedRouter><Home/></ProtectedRouter>},
      {path:'brand',element:<ProtectedRouter><Brand/></ProtectedRouter>},
      {path:'about',element:<ProtectedRouter><About/></ProtectedRouter>},
      {path:'checkout',element:<ProtectedRouter><CheckOut/></ProtectedRouter>},
      {path:'cart',element:<ProtectedRouter><Cart/></ProtectedRouter>},
      {path:'categories',element:<ProtectedRouter><Categories/></ProtectedRouter>},
      {path:'products',element:<ProtectedRouter><Products/></ProtectedRouter>},
      {path:'productdetails/:id',element:<ProtectedRouter><ProductDetails/></ProtectedRouter>},
      {path:'login',element:<Login/>},
      {index:true,element:<Login/>},
      {path:'register',element:<Register/>},
      {path:'*',element:<Notfound/>},
    ]}
  ])

  return (
    <WishListContextProvider>  
      <CartContextProvider>
        <QueryClientProvider client={query}>
          <CounterContextProvider>
            <RouterProvider router={x}></RouterProvider>
            <Toaster/>
          </CounterContextProvider>
          <ReactQueryDevtools  />
        </QueryClientProvider>
      </CartContextProvider>
    </WishListContextProvider>  
  )
}

export default App;
