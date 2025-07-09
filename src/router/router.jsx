import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import HomePage from "../pages/Home/HomePage";
import AllTrainer from "../pages/AllTrainer/AllTrainer";
import AllClasses from "../pages/AllClasses/AllClasses";
import Forums from "../pages/Forums/Forums";
import SignIn from "../pages/AuthPages/SignIn";
import SignUp from "../pages/AuthPages/SignUp";
import DashboardLayouts from "../layouts/DashboardLayouts";
import ProfilePage from "../pages/Dashboard/ProfilePage";
 
export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayouts,
        children: [
            {
                index: true,
                Component: HomePage,
            },
            {
                path: "all-trainer",
                Component: AllTrainer
            },
            {
                path: "all-classes",
                Component: AllClasses
            },
            {
                path: 'forums',
                Component: Forums
            }
        ]
        
    },
    {
        path: 'sign-in',
        Component: SignIn
    },
    {
        path: 'sign-up',
        Component : SignUp
    },
    {
        path: "/dashboard",
        element: <DashboardLayouts></DashboardLayouts>,
        children: [
            {
                index: true,
                Component: ProfilePage
            }
        ]
        
    }
])