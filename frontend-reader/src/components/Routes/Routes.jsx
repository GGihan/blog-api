import App from "../../App";
import Register from "../Register/Register";

const routes = [
  {
    path: '/',
    element: <App />,
    // errorElement: < />,
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
    element: <Register />
  },
  {
    // path: '/login',
    // element: <Login />,
    // errorElement: < />,
  },
];

export default routes;