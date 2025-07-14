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
import AppliedTrainer from "../pages/Dashboard/Admin/AppliedTrainer";
import Balance from "../pages/Dashboard/Admin/Balance";
import AddClass from "../pages/Dashboard/Admin/AddClass";
import BeATrainer from "../pages/BeATrainer/BeATrainer";
import AllTrainers from "../pages/Dashboard/Admin/AllTrainers";
import TrainerDetails from "../pages/TrainerDetails/TrainerDetails";
import BookedTrainer from "../pages/PaymentPages/BookedTrainer";
import Payment from "../pages/PaymentPages/Payment";
import AllNewsletter from "../pages/Dashboard/Admin/AllNewsletter";
import Loading from "../shared/Loading";
import PrivateRoute from "../routes/PrivateRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Forbidden from "../pages/ErrorPage/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import TrainerRoute from "../routes/TrainerRoute";
import SharedRoute from "../routes/SharedRoute";
import MemberRoute from "../routes/MemberRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    hydrateFallbackElement: <Loading></Loading>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "all-trainer",
        Component: AllTrainer,
      },
      {
        path: "all-classes",
        Component: AllClasses,
      },
      {
        path: "forums",
        Component: Forums,
      },
      {
        path: "be-a-trainer",
        element: (
          <PrivateRoute>
            <BeATrainer></BeATrainer>
          </PrivateRoute>
        ),
      },
      {
        path: "trainer-details/:id",
        element: <TrainerDetails></TrainerDetails>,
      },
      {
        path: "booked-trainer",
        element: (
          <PrivateRoute>
            <BookedTrainer></BookedTrainer>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "/forbidden",
        Component: Forbidden,
      },
    ],
  },
  {
    path: "sign-in",
    Component: SignIn,
  },
  {
    path: "sign-up",
    Component: SignUp,
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayouts></DashboardLayouts>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: ProfilePage,
      },
      {
        path: "booked-trainer",
        element: <MemberRoute>
            <BookedTrainerPage></BookedTrainerPage>
        </MemberRoute>
      },
      {
        path: "activity-log",
        element: <MemberRoute>
            <ActivityLogPage></ActivityLogPage>
        </MemberRoute>
      },

      // trainer routes

      {
        path: "manage-slots",
        element: <TrainerRoute>
            <ManageSlots></ManageSlots>
        </TrainerRoute>
      },
      {
        path: "add-new-slot",
        element: <TrainerRoute>
            <AddNewSlot></AddNewSlot>
        </TrainerRoute>
      },
      {
        path: "add-forum",
        element:<SharedRoute>
             <AddForum></AddForum>
        </SharedRoute>
      },

      // admin routes
      {
        path: "newsletter",
        element: <AdminRoute>
            <AllNewsletter></AllNewsletter>
        </AdminRoute>
      },
      {
        path: "all-trainers",
        element: <AdminRoute>
            <AllTrainers></AllTrainers>
        </AdminRoute>
      },
      {
        path: "applied-trainer",
        element: <AdminRoute>
            <AppliedTrainer></AppliedTrainer>
        </AdminRoute>
      },
      {
        path: "balance",
        element: <AdminRoute>
            <Balance></Balance>
        </AdminRoute>
      },
      {
        path: "add-class",
        element: <AdminRoute>
            <AddClass></AddClass>
        </AdminRoute>
      },
    ],
  },
]);
