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
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import Assessment from "@material-ui/icons/Assessment";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard";
import UserProfile from "views/UserProfile/UserProfile";
import TableList from "views/TableList/TableList";
import Typography from "views/Typography/Typography";
import Icons from "views/Icons/Icons";
import Maps from "views/Maps/Maps";
import NotificationsPage from "views/Notifications/Notifications";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro";
import SharesPage from "views/SharesPage/SharesPage";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage";
import { AttachMoney } from "@material-ui/icons";
import { Expenses } from "views/Expenses/Expenses";
import { NewExpenses } from "views/Expenses/NewExpenses";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/shares",
    name: "Shares",
    rtlName: "لوحة القيادة",
    icon: Assessment,
    component: SharesPage,
    layout: "/admin",
  },
  {
    path: "/expenses",
    name: "Expenses",
    rtlName: "ملف تعريفي للمستخدم",
    icon: AttachMoney,
    component: Expenses,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin",
  },
  {
    path: "/rtl-page",
    name: "RTL Support",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Language,
    component: RTLPage,
    layout: "/rtl",
  },
  {
    path: "/expenses/new",
    name: "New Expense",
    rtlName: "",
    icon: Language,
    component: NewExpenses,
    layout: "/admin",
    invisible: true, // invisible: true to hide from navbar. can use this as routing as they all go thorugh protected routes
  }
];

export default dashboardRoutes;
