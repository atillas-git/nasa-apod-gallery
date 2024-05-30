import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import React, { Suspense } from "react";
import Theme from "./utils/theme/Theme";

const Gallerty = React.lazy(() => import("./fetures/gallery/Gallerty"));
const Application = React.lazy(() => import("./fetures/index/Application"));
const PictureOfTheyDay = React.lazy(
  () => import("./fetures/pictureOfTheDay/PictureOfTheDay"),
);
const Picture = React.lazy(() => import("./fetures/picture/Picture"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Application />
      </Layout>
    ),
  },
  {
    path: "/gallery",
    element: (
      <Layout>
        <Gallerty />
      </Layout>
    ),
  },
  {
    path: "/gallery/:page",
    element: (
      <Layout>
        <Gallerty />
      </Layout>
    ),
  },
  {
    path: "/picture-of-the-day",
    element: (
      <Layout>
        <PictureOfTheyDay />
      </Layout>
    ),
  },
  {
    path: "/picture/:date",
    element: (
      <Layout>
        <Picture />
      </Layout>
    ),
  },
]);

function App() {
  return (
    <Theme>
      <Suspense fallback>
        <RouterProvider router={router} />
      </Suspense>
    </Theme>
  );
}

export default App;
