import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import Main from './components/Main.jsx';
import Phones from './components/Phones.jsx';
import Phone from './components/Phone.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Main,
    children: [
      {
        path: "/phones",
        Component: Phones,
        loader: () => fetch("http://localhost:3000/phones")
      },
      {
        path: "/phones/:id",
        Component: Phone,
        loader: ({params}) => fetch(`http://localhost:3000/phones/${params.id}`)
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)