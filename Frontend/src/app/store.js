import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import videoReducer from "./slices/videoSlice";
import likeReducer from "./slices/likeSlice";
import tweetReducer from "./slices/tweetSlice";
import subscriptionReducer from "./slices/subscriptionSlice";
import playlistReducer from "./slices/playlistSlice";
import myChannelReducer from "./slices/myChannelSlice";
import commentReducer from './slices/commentSlice'
import authReducer from './slices/authSlice'
import channelReducer from './slices/channelSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    video: videoReducer,
    like: likeReducer,
    comment: commentReducer,
    tweet: tweetReducer,
    auth: authReducer,
    subscription: subscriptionReducer,
    playlist: playlistReducer,
    channel: channelReducer,
    myChannel: myChannelReducer,
  },
});
