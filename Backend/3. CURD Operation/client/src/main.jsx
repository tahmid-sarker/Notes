import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import MainLayout from './layouts/MainLayout.jsx';
import Home from './components/Home.jsx';
import Details from './components/Details.jsx';
import UpdateProfile from './components/UpdateProfile.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/details/:id",
        loader: ({params}) => fetch(`http://localhost:3000/users/${params.id}`),
        Component: Details,
      },
      {
        path: "/update/:id",
        Component: UpdateProfile,
        loader: ({params}) => fetch(`http://localhost:3000/users/${params.id}`)
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
