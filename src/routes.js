/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Assessment from "@material-ui/icons/Assessment";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard";
import UserProfile from "views/UserProfile/UserProfile";
import SharesPage from "views/SharesPage/SharesPage";
import GoalsPage from "views/GoalsPage/GoalsPage";
import { AttachMoney } from "@material-ui/icons";
import { ExpensesPage } from "views/ExpensesPage/ExpensesPage";
import { NewExpenses } from "components/Expenses/NewExpenses";
import { EditExpense } from "components/Expenses/EditExpense";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/shares",
    name: "Shares",
    icon: Assessment,
    component: SharesPage,
    layout: "/admin",
  },
  {
    path: "/expenses",
    name: "Expenses",
    icon: AttachMoney,
    component: ExpensesPage,
    layout: "/admin",
  },
  {
    path: "/goals",
    name: "Goals",
    icon: LibraryBooks,
    component: GoalsPage,
    layout: "/admin",
  },
  {
    path: "/expenses/new",
    name: "New Expense",
    icon: Language,
    component: NewExpenses,
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
    invisible: true, // invisible: true to hide from navbar. can use this as routing as they all go through protected routes
  },
  {
    path: "/expenses/:id/edit",
    name: "Edit Expense",
    icon: Language,
    component: EditExpense,
    layout: "/admin",
    invisible: true, // invisible: true to hide from navbar. can use this as routing as they all go through protected routes
  },
];

export default dashboardRoutes;
