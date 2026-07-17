import App from "../../App";

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
    // path: '/login',
    // element: <Login />,
    // errorElement: < />,
  },
];

export default routes;