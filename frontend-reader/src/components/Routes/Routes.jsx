import App from "../../App";
import Register from "../Register/Register";
import Login from "../Login/Login";
import ErrorPage from "../ErrorPage/Errorpage";
import NewPost from "../NewPost/NewPost";

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
        path: 'posts',
        children: [
          {
            path: 'new',
            element: <NewPost />, // Route: /posts/new
          },
          {
            // path: ':id',
            // element: < />, // Route: /posts/123
          },
        ],
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