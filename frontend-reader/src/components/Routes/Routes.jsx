import App from "../../App";
import Register from "../Register/Register";
import Login from "../Login/Login";
import ErrorPage from "../ErrorPage/Errorpage";

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        // index: true,
        // element: < />,
      },
      {
        // path: ,
        // element: < />,
      },
    ],
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
];

export default routes;