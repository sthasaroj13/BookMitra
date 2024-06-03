import { createBrowserRouter } from "react-router-dom";
import Loginpage from "./pages/Loginpage";
import HomePage from "./pages/HomePage";
import Register from "./pages/RegisterPage";
import DashboardLayout from "./layouts/DashboardLayout";
import BooksPage from "./pages/BooksPage";
import Authlayout from "./layouts/Authlayout";
import CreateBook from "./pages/CreateBook";

import SingleBook from "./pages/SingleBook";
import LandinngPage from "./pages/LandingPage";


const router = createBrowserRouter([

    {

        path: '/',
        element: <LandinngPage />,
        children: [
            {
                path: 'books/:bookId',
                element: <SingleBook />
            }
        ]

    },
    {

        path: "dashboard",
        element: <DashboardLayout />,
        children: [
            {
                path: 'home',
                element: <HomePage />

            },
            {
                path: 'books',
                element: <BooksPage />

            },
            {
                path: 'books/create',
                element: <CreateBook />
            },
            {
                path: 'books/:bookId',
                element: <SingleBook />
            }




        ]

    }, {
        path: 'auth',
        element: <Authlayout />,
        children: [
            {
                path: 'login',
                element: <Loginpage />
            },
            {
                path: 'sign-up',
                element: <Register />
            }


        ]

    },

])
export default router