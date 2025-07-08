import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import HomePage from "../pages/Home/HomePage";
import AllTrainer from "../pages/AllTrainer/AllTrainer";
import AllClasses from "../pages/AllClasses/AllClasses";
import Forums from "../pages/Forums/Forums";
 
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
        
    }
])