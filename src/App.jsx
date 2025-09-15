import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import MasterLayout from "./components/MasterLayout/MasterLayout";
import NotFound from "./components/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "post-details/:id", element: <PostDetails /> },
        { path: "create-post", element: <CreatePost /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes}>
        <App />
      </RouterProvider>
      <ToastContainer
        position="bottom-right" // 👈 هنا التغيير
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </>
  );
}

export default App;
