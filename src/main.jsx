import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home/Home.jsx';
import App from './App.jsx';
import Login from './components/Login/Login.jsx';
import Merchant from './components/Merchant/Merchant.jsx';
import AddProduct from './components/Product/AddProduct.jsx';
import AllProduct from './components/Product/AllProduct.jsx';
import AddCategory from './components/Category/AddCategory.jsx';
import AllCategory from './components/Category/AllCategory.jsx';
import AddSubCategory from './components/SubCategory.jsx/AddSubCategory.jsx';
import AllSubCategory from './components/SubCategory.jsx/AllSubCategory.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/merchant",
        element: <Merchant />,
      },
      {
        path: "/product",
        element: <AddProduct />,
      },
      {
        path: "/allProducts",
        element: <AllProduct />,
      },
      {
        path: "/category",
        element: <AddCategory/>,
      },
      {
        path: "/allCategory",
        element: <AllCategory />,
      },
      {
        path: "/subcategory",
        element: <AddSubCategory />,
      },
      {
        path: "/allSubCategory",
        element: <AllSubCategory />,
      },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
