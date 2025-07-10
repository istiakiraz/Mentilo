import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import HomePage from "../pages/Home/HomePage";
import AllTrainer from "../pages/AllTrainer/AllTrainer";
import AllClasses from "../pages/AllClasses/AllClasses";
import Forums from "../pages/Forums/Forums";
import SignIn from "../pages/AuthPages/SignIn";
import SignUp from "../pages/AuthPages/SignUp";
import DashboardLayouts from "../layouts/DashboardLayouts";
import ProfilePage from "../pages/Dashboard/User/ProfilePage";
import BookedTrainerPage from "../pages/Dashboard/User/BookedTrainerPage";
import ActivityLogPage from "../pages/Dashboard/User/ActivityLogPage";
import ManageSlots from "../pages/Dashboard/Trainer/ManageSlots";
import AddNewSlot from "../pages/Dashboard/Trainer/AddNewSlot";
import AddForum from "../pages/Dashboard/Trainer/AddForum";
import Newsletter from "../pages/Dashboard/Admin/Newsletter";
import AppliedTrainer from "../pages/Dashboard/Admin/AppliedTrainer";
import Balance from "../pages/Dashboard/Admin/Balance";
import AddClass from "../pages/Dashboard/Admin/AddClass";
 
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
            },
            {
                path: 'booked-trainer',
                element: <BookedTrainerPage></BookedTrainerPage>
            },
            {
                path: 'activity-log',
                element: <ActivityLogPage></ActivityLogPage>
            },

            // trainer routes

            {
                path: 'manage-slots',
                element: <ManageSlots></ManageSlots>
            },
            {
                path: 'add-new-slot',
                element: <AddNewSlot></AddNewSlot>
            },
            {
                path: 'add-forum',
                element: <AddForum></AddForum>
            },

            // admin routes
            {
                path: 'newsletter',
                element: <Newsletter></Newsletter>
            } ,
            {
                path: "all-trainers",
                element: <AllTrainer></AllTrainer>
            },
            {
                path: "applied-trainer",
                element: <AppliedTrainer></AppliedTrainer>
            },
            {
                path: 'balance',
                element: <Balance></Balance>
            },
            {
                path: "add-class",
                element: <AddClass></AddClass>
            }
        ]
        
    }
])