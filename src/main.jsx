import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './Components/firebaseConfig.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import LoginMain from './Pages/Login/LoginMain.jsx'
import RegisterMain from './Pages/Register/RegisterMain.jsx'
import TableMain from './Pages/Home/TableMain.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RegisterMain/>,
  },
  {
    path: "/Table",
    element: <TableMain/>,
  },
  {
    path: "/login",
    element: <LoginMain/>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
