import { Library } from './pages/Library'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import React from 'react'

import '@/styles/index.scss'
import { NotFound } from './pages/404'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Library />,
    },
    {
        path: '/*',
        element: <NotFound />,
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
