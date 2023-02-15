import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  UsersIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Notifications, Tables, Aircrafts, NewAircraft, MapaEngine, MapaCelula } from "./pages/dashboard";
import { SignIn, SignUp } from "./pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        visible: true,
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        visible: false,
        path: "/profile",
        element: <Profile />,
      },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "tables",
      //   visible: true,
      //   path: "/tables",
      //   element: <Tables />,
      // },
      // {
      //   icon: <BellIcon {...icon} />,
      //   name: "notifactions",
      //   visible: true,
      //   path: "/notifactions",
      //   element: <Notifications />,
      // },
    ],
  },
  {
    layout: "dashboard",
    pages: [
      {
        icon: <UsersIcon {...icon} />,
        name: "Aeronaves",
        visible: true,
        path: "/aircraft",
        element: <Aircrafts />,
      },
      {
        icon: <UsersIcon {...icon} />,
        name: "Aeronave",
        visible: false,
        path: "/aircraft/new",
        element: <NewAircraft />,
      },
      {
        icon: <UsersIcon {...icon} />,
        name: "Mapa Motor",
        visible: true,
        path: "/engineMap",
        element: <MapaEngine />,

      },
      {
        icon: <UsersIcon {...icon} />,
        name: "Mapa celula",
        visible: true,
        path: "/celulaMap",
        element: <MapaCelula />,

      }
    ]
  },
  {
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        visible: false,
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        visible: false,
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];



export default routes;