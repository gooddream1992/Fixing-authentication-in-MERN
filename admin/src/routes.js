
import Dashboard from "views/Dashboard/Dashboard.js";
import UsersList from "views/Users/UsersList.js";
import CoursesList from "views/Courses/CourseList.js";
import CreateCourse from "views/Courses/CourseCreate.js";
import CourseEditor from "views/Courses/CourseEditor.js";
import BatchTable from "views/BatchTable";
import LecturesList from "views/Lectures/LecturesList.js";
import LectureCreate from "views/Lectures/LectureCreate.js";
import LectureEditor from "views/Lectures/LectureEditor.js";
import LectureItemList from "views/LectureItems/LectureItemList.js";
import LectureItemCreate from "views/LectureItems/LectureItemCreate.js";
import LectureItemEditor from "views/LectureItems/LectureItemEditor.js";
import EventCreate from "views/Event/EventCreate.js";
import EventLists from 'views/Event/EventsList.js';
import EventEdit from 'views/Event/EventEdit.js';
import LoginPage from 'views/Pages/LoginPage.js';
import Register from 'views/Pages/RegisterPage.js';
import ProfilePage from 'views/Pages/UserProfile.js';
import Settings from 'views/Pages/Settings.js';
import DoubteList from 'views/DoubtList.js';
//import ChatRoom from 'views/DoubteChatting/App.js';
import SupportList from 'views/SupportChatList.js'
import SupportChat from 'views/SupportChat/App.js';
import FeedBackList from 'views/Feedbacks.js';
import PaymentList from 'views/PaymentList';
import BlogCreate from 'views/Blog/BlogCreate.jsx';
import BlogList from 'views/Blog/BlogList.js';
import BlogEdit from 'views/Blog/BlogEdit.js';

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
import EventIcon from '@material-ui/icons/Event';
import HelpIcon from '@material-ui/icons/Help';
import EventNoteIcon from '@material-ui/icons/EventNote';
import FeedbackIcon from '@material-ui/icons/Feedback';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import ChatIcon from '@material-ui/icons/Chat';
import PaymentIcon from '@material-ui/icons/Payment';
import FiberNewIcon from '@material-ui/icons/FiberNew';

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin",
    hidden: true
  },
  {
    path: "/users-list",
    name: "Users List",
    rtlName: "لوحة القيادة",
    icon: PermContactCalendarIcon,
    component: UsersList,
    layout: "/admin",
    hidden: true
  },
  {
    path: "/login",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: LoginPage,
    layout: "/auth",
    hidden: true
  },
  {
    path: "/register/:email",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Register,
    layout: "/auth",
    hidden: true
  },
  {
    path: "/profile",
    name: "User Profile",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: ProfilePage,
    layout: "/admin",
    hidden: true
  },
  {
    path: "/setting",
    name: "User Profile",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Settings,
    layout: "/admin",
    hidden: true
  },
  /*{
    path: "/chat/:id/:user_id",
    name: "Chatting Room",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: ChatRoom,
    layout: "/admin",
    hidden: true
  },*/
  {
    path: "/support_chat/:id/:user_id",
    name: "Chatting Room",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: SupportChat,
    layout: "/admin",
    hidden: true
  },
  {
    collapse: true,
    hidden: false,
    name: "Courses",
    rtlName: "صفحات",
    icon: CastForEducationIcon,
    state: "pageCollapse",
    views: [
      {
        path: "/courses-list",
        name: "Courses List",
        rtlName: "عالتسعير",
        mini: "CL",
        rtlMini: "ع",
        component: CoursesList,
        layout: "/admin",
        hidden: false
      },
      {
        path: "/courses-create",
        name: "Courses Create",
        rtlName: "عالتسعير",
        mini: "CC",
        rtlMini: "ع",
        component: CreateCourse,
        layout: "/admin",
        hidden: false
      },
      {
        path: "/courses-editor/:id",
        name: "Courses Edit",
        rtlName: "عالتسعير",
        mini: "CE",
        rtlMini: "ع",
        component: CourseEditor,
        layout: "/admin",
        hidden: true
      },
    ],
    
  },
  {
    collapse: true,
    hidden: true,
    name: "Lectures",
    rtlName: "صفحات",
    icon: Image,
    state: "lectureCollapse",
    views: [
      {
        path: "/lectures-list/:course_id",
        name: "Lectures List",
        rtlName: "عالتسعير",
        mini: "PP",
        rtlMini: "ع",
        component: LecturesList,
        layout: "/admin",
        hidden: false
      },
      {
        path: "/lectures-create/:course_id",
        name: "Lectures Create",
        rtlName: "عالتسعير",
        mini: "PP",
        rtlMini: "ع",
        component: LectureCreate,
        layout: "/admin",
        hidden: false
      },
      {
        path: "/lectures-edit/:id",
        name: "Lectures Edit",
        rtlName: "عالتسعير",
        mini: "PP",
        rtlMini: "ع",
        component: LectureEditor,
        layout: "/admin",
        hidden: true
      },
    ]
  },
  {
    collapse: true,
    hidden: true,
    name: "Lecture Contents",
    rtlName: "صفحات",
    icon: Image,
    state: "lectureItemCollapse",
    views: [
      {
        path: "/lectureitems-list/:course_id/:lecture_id",
        name: "Lecture Contents List",
        rtlName: "عالتسعير",
        mini: "PP",
        rtlMini: "ع",
        component: LectureItemList,
        layout: "/admin",
        hidden: false
      },
      {
        path: "/lectureitems-create/:course_id/:lecture_id",
        name: "Lecture Contents Create",
        rtlName: "عالتسعير",
        mini: "PP",
        rtlMini: "ع",
        component: LectureItemCreate,
        layout: "/admin",
        hidden: false
      },
      {
        path: "/lectureitems-edit/:id",
        name: "Lecture Contents Edit",
        rtlName: "عالتسعير",
        mini: "PP",
        rtlMini: "ع",
        component: LectureItemEditor,
        layout: "/admin",
        hidden: true
      },
    ]
  },
  {
    collapse: true,
    hidden: false,
    name: "Events",
    rtlName: "صفحات",
    icon: EventIcon,
    state: "eventCollapse",
    views: [
      {
        path: "/events-list",
        name: "Events List",
        rtlName: "عالتسعير",
        mini: "EL",
        rtlMini: "ع",
        component: EventLists,
        layout: "/admin",
        hidden: false
      },
      {
        path: "/event-create",
        name: "Event Create",
        rtlName: "عالتسعير",
        mini: "EC",
        rtlMini: "ع",
        component: EventCreate,
        layout: "/admin",
        hidden: false
      },
      {
        path: "/event-edit/:id",
        name: "Event Edit",
        rtlName: "عالتسعير",
        mini: "EE",
        rtlMini: "ع",
        component: EventEdit,
        layout: "/admin",
        hidden: true
      },
    ]
  },
  {
    collapse: true,
    hidden: false,
    name: "Blogs",
    rtlName: "صفحات",
    icon: FiberNewIcon,
    state: "blogCollapse",
    views: [
      {
        path: "/blog-list",
        name: "Blogs List",
        rtlName: "عالتسعير",
        mini: "EL",
        rtlMini: "ع",
        component: BlogList,
        layout: "/admin",
        hidden: false
      },
      {
        path: "/blog-create",
        name: "Blog Create",
        rtlName: "عالتسعير",
        mini: "EC",
        rtlMini: "ع",
        component: BlogCreate,
        layout: "/admin",
        hidden: false
      },
      {
        path: "/blog-edit/:id",
        name: "Event Edit",
        rtlName: "عالتسعير",
        mini: "EE",
        rtlMini: "ع",
        component: BlogEdit,
        layout: "/admin",
        hidden: true
      },
    ]
  },
  {
    path: "/batch_table/:id",
    name: "Batch table",
    rtlName: "لوحة القيادة",
    icon: EventNoteIcon,
    component: BatchTable,
    layout: "/admin",
    hidden: true
  },
  {
    path: "/doubte_list",
    name: "Doubt table",
    rtlName: "لوحة القيادة",
    icon: HelpIcon,
    component: DoubteList,
    layout: "/admin",
    hidden: false
  },
  {
    path: "/feedback_list",
    name: "FeedBack table",
    rtlName: "لوحة القيادة",
    icon: FeedbackIcon,
    component: FeedBackList,
    layout: "/admin",
    hidden: false
  },
  {
    path: "/support_chat_list",
    name: "Support Chat",
    rtlName: "لوحة القيادة",
    icon: ChatIcon,
    component: SupportList,
    layout: "/admin",
    hidden: false
  },
  {
    path: "/payment_list",
    name: "Transaction History",
    rtlName: "لوحة القيادة",
    icon: PaymentIcon,
    component: PaymentList,
    layout: "/admin",
    hidden: false
  },
];
export default dashRoutes;
