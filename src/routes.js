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
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Assessment from "@material-ui/icons/Assessment";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard";
import SharesPage from "views/SharesPage/SharesPage";
import GoalsPage from "views/GoalsPage/GoalsPage";
import { AttachMoney } from "@material-ui/icons";
import { ExpensesPage } from "views/ExpensesPage/ExpensesPage";
import { IncomesPage } from "views/IncomesPage/IncomesPage";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

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
    path: "/incomes",
    name: "Income",
    icon: AccountBalanceIcon,
    component: IncomesPage,
    layout: "/admin",
  },
  {
    path: "/goals",
    name: "Goals",
    icon: LibraryBooks,
    component: GoalsPage,
    layout: "/admin",
  },
];

export default dashboardRoutes;
