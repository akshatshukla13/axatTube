import mongoose from 'mongoose';
import { Video } from '../Models/video.model.js';
import { Subscription } from '../Models/subscription.model.js';
import { Like } from '../Models/like.model.js';
import { ApiError } from '../utils/APIerror.js';
import { ApiResponse } from '../utils/APIresponse.js';
import { AsyncHandler } from '../utils/AsyncHandler.js';
import { User } from '../Models/user.model.js';

const getChannelStats = AsyncHandler(async (req, res) => {
  // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
  const { channelId } = req.params;
  console.log(channelId);

  if (!channelId) {
    throw new ApiError(400, 'Channel id is missing');
  }

  const totalVideos = await Video.find({ owner: channelId }).countDocuments();

  const totalViews = await Video.aggregate([
    {
      $match: { owner: new mongoose.Types.ObjectId(channelId) },
    },
    {
      $group: {
        _id: null,
        totalViews: { $sum: '$views' },
      },
    },
  ]);

  const totalSubscribers = await Subscription.find({
    channel: channelId,
  }).countDocuments();

  const totalLikes = await Like.aggregate([
    {
      $match: {
        $or: [
          { tweet: new mongoose.Types.ObjectId(channelId) },

          { video: new mongoose.Types.ObjectId(channelId) },
        ],
      },
    },
    {
      $group: {
        _id: null,
        totalLikes: { $sum: 1 },
      },
    },
    {
      $project: {
        totalLikes: 1,
      },
    },
  ]);

  const channelData = await User.findById(channelId);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        ChannelDetails: channelData,
        totalVideos,
        totalViews: totalViews[0]?.totalViews || 0,
        totalSubscribers,
        totalLikes: totalLikes[0]?.totalLikes || 0,
      },
      'Channel stats found successfully',
    ),
  );
});

const getChannelVideos = AsyncHandler(async (req, res) => {
  // TODO: Get all the videos uploaded by the channel

  const { channelId } = req.params;

  if (!channelId) {
    throw new ApiError(400, 'Channel id is missing');
  }

  const channel = await User.findById(channelId);

  if (!channel) {
    throw new ApiError(404, 'Channel not found');
  }

  // const videos = await Video.find({ owner: channelId }).populate("owner" , "username fullName avatar");

  const videos = await Video.aggregate([
    {
      $match: { owner: new mongoose.Types.ObjectId(channelId) },
    },
    {
      $lookup: {
        from: 'likes',
        let: { videoId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$video', '$$videoId'] },
                  { $eq: ['$isLiked', true] },
                ],
              },
            },
          },
        ],

        as: 'likes',
      },
    },
    {
      $lookup: {
        from: 'likes',
        let: { videoId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$video', '$$videoId'] },
                  { $eq: ['$isLiked', false] },
                ],
              },
            },
          },
        ],

        as: 'disLikes',
      },
    },
    {
      $addFields: {
        likes: { $size: '$likes' },
        disLikes: { $size: '$disLikes' },
      },
    },
    // {
    //     $lookup : {
    //         from : "likes",
    //         let: { videoId: '$_id' },
    //         pipeline : [{
    //             $match : {
    //                 $expr : {
    //                     $and : [
    //                         {
    //                             $eq : ["$video" , "$videoId"] ,
    //                             $eq : ["$isLiked" , false]
    //                         }
    //                     ]
    //                 }
    //             }
    //         }],

    //         as : "dislikes"
    //     }
    // },
    // {
    //     $addFields : {
    //         likes : { $size : "$likes" },
    //         dislikes : { $size : "$dislikes" }
    //     }
    // },
  ]);

  if (videos?.length < 0) {
    throw new ApiError(404, 'No videos found for this channel');
  }

  res
    .status(200)
    .json(new ApiResponse(200, videos, 'Videos found successfully'));
});

export { getChannelStats, getChannelVideos };
