import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  useParams,
} from "react-router-dom";
import AuthLogin from "./components/AuthPages/AuthLogin.jsx";
import AuthRegister from "./components/AuthPages/AuthRegister.jsx";
import Header from "./components/Header/Header.jsx";
import Aside from "./components/Aside/Aside.jsx";
import VideoListingCardPage from "./components/VideoPage/VideoListingCardPage.jsx";
import VideoDetailPage from "./components/VideoPage/VideoDetailPage.jsx";
import ChannelVideoListPage from "./components/ChannelPage/ChannelVideoListPage.jsx";
import Channel from "./components/ChannelPage/Channel.jsx";
import ChannelPlayListPage from "./components/ChannelPage/ChannelPlayListPage.jsx";
import ChannelTweetPage from "./components/ChannelPage/ChannelTweetPage.jsx";
import ChannelSubscribedPage from "./components/ChannelPage/ChannelSubscribedPage.jsx";
import ChannelPlayListVideosPage from "./components/ChannelPage/ChannelPlayListVideosPage.jsx";
import MyChannel from "./components/MyChannel/MyChannel.jsx";
import MyChannelVideoPage from "./components/MyChannel/MyChannelVideoPage.jsx";
import MyChannelPlaylistPage from "./components/MyChannel/MyChannelPlaylistPage.jsx";
import MyChannelTweetPage from "./components/MyChannel/MyChannelTweetPage.jsx";
import MyChannelSubedPage from "./components/MyChannel/MyChannelSubedPage.jsx";
import UploadVideoPopout from "./components/MyChannel/UploadPopOut/UploadVideoPopout.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import EditPersonalPageInfo from "./components/MyChannel/EditMyChannel/EditPersonalPageInfo.jsx";
import Terms from "./components/ExtrasPage/Terms.jsx";
import PrivacyPolicy from "./components/ExtrasPage/PrivacyPolicy.jsx";
import Layout from "./Outlet/Layout.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashBoardPage from "./components/MyChannel/AdminPanel/AdminDashBoardPage.jsx";
import LikeDashboard from "./components/LikeDashBoard/LikeDashboard.jsx";
import Setting from "./components/ExtrasPage/Setting.jsx";

const router = createBrowserRouter([

  //home route
  {
    path: "/:username",
    element: (
      <>
        <Header />
        <div className="flex">
          <Aside />
          <VideoListingCardPage />
        </div>
      </>
    ),
  },

  //"/" route
  {
    path: "/",
    element: (
      <>
        <Header />
        <div className="flex">
          <Aside />
          <VideoListingCardPage />
        </div>
      </>
    ),
  },

  //perticular channel route
  {
    path: "/channel/:username",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Channel Compo={ChannelVideoListPage} />,
      },
      {
        path: "videos",
        element: <Channel Compo={ChannelVideoListPage} />,
      },
      {
        path: "subscribed",
        element: <Channel Compo={ChannelSubscribedPage} />,
      },
      {
        path: "tweet",
        element: <Channel Compo={ChannelTweetPage} />,
      },
      {
        path: "playlist",
        element: <Channel Compo={ChannelPlayListPage} />,
      },
    ],
  },
  //

  //user channel route (MY)
  {
    path: "/@/:username",
    element: <Layout />,
    children: [
      {
        path: "videos", // Matches "/@/:username/videos"
        element: <MyChannel Compo={MyChannelVideoPage} />,
      },
      {
        path: "", // Matches "/@/:username" (no additional path)
        element: <MyChannel Compo={MyChannelVideoPage} />,
      },
      {
        path: "subscribed",
        element: <MyChannel Compo={MyChannelSubedPage} />,
      },
      {
        path: "tweet",
        element: <MyChannel Compo={MyChannelTweetPage} />,
      },
      {
        path: "playlist",
        element: <MyChannel Compo={MyChannelPlaylistPage} />,
      },
      {
        path: "like",
        element: <MyChannel Compo={LikeDashboard} />,
      },
    ],
  },


  // VideoDetailPage
  {
    path: "/",
    element: <Layout />, // Apply Layout here
    children: [
      {
        path: "video/:id",
        element: <VideoDetailPage />, // VideoDetailPage rendered inside Layout's Outlet
      },
    ],
  },

  //admin dashboard
  {
    path: "/@/:username/dashboard",
    element: <AdminDashBoardPage />,
  },

  //settings
  {
    path: "/@/:username/setting",
    element: <Setting />,
  },

  //auth routes
  {
    path: "/login",
    element: <AuthLogin />,
  },
  {
    path: "/register",
    element: <AuthRegister />,
  },

  //
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={3}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </Provider>
  </React.StrictMode>
);
