import App from "../../App";
import Register from "../Register/Register";
import Login from "../Login/Login";
import ErrorPage from "../ErrorPage/Errorpage";
import NewPost from "../NewPost/NewPost";
import PostList from "../PostList/PostList";
import FullPost from "../FullPost/FullPost";

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <PostList />,
      },
      {
        path: 'posts',
        children: [
          // {
          //   path: 'new',
          //   element: <NewPost />, // Route: /posts/new
          // },
          {
            path: ':postId',
            element: <FullPost />, // Route: /posts/123
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