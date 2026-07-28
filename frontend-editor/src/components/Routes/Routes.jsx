import App from "../../App";
import Register from "../Register/Register";
import Login from "../Login/Login";
import ErrorPage from "../ErrorPage/Errorpage";
import NewPost from "../NewPost/NewPost";
import PostList from "../PostList/PostList";
import FullPost from "../FullPost/FullPost";
import EditPost from "../EditPost/EditPost";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Unauthorized from "../Unauthorized/Unauthorized";

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <PostList />,
          },
          {
            path: 'posts',
            children: [ 
              {
                path: 'new',
                element: <NewPost />, // Route: /posts/new
              },
              {
                path: ':postId',
                element: <FullPost />, // Route: /posts/123
              },  
              {
                path: ':postId/edit',
                element: <EditPost /> // Route: /posts/25/edit
              },
            ],
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
  {
    path: '/unauthorized',
    element: <Unauthorized />,
    errorElement: <ErrorPage />,
  },
];

export default routes;