const Friendship = require("../models/Friendship");

const getFriendshipRequests = async (req, res) => {
  try {
    const friendships = await Friendship.find();
    res.status(200).json({
      success: true,
      data: friendships,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

const sendFriendshipRequest = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    await Friendship.findOneAndUpdate(
      {
        senderId,
        receiverId,
      },
      {
        status: "request sent",
      },
      {
        upsert: true,
        new: true,
      }
    );
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

const cancelFriendshipRequest = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    const friendship = await Friendship.findOneAndUpdate(
      {
        senderId,
        receiverId,
      },
      {
        status: "request canceled",
      },
      { upsert: true, new: true }
    );
    res.status(200).json({
      success: true,
      data: friendship,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

const checkFriendship = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    const sender = await Friendship.findOne({ senderId });

    if (sender) {
      return res.status(200).json({
        success: true,
        data: {
          ...sender._doc,
          isSender: true,
        },
      });
    }
    const receiver = await Friendship.findOne({ receiverId });

    if (receiver) {
      return res.status(200).json({
        success: true,
        data: {
          ...receiver._doc,
          isReceiver: true,
        },
      });
    }

    res.status(404).json({
      success: false,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

const friendshipResponse = async (req, res) => {
  try {
    const { senderId, receiverId, response } = req.params;

    const friendship = await Friendship.findOne({
      senderId,
      receiverId,
    });

    friendship.status = response;

    await friendship.save();

    res.status(200).json({ success: true, message: `Request ${response}ed` });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

const removeFriendship = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    await Friendship.findOneAndUpdate(
      {
        senderId,
        receiverId,
      },
      {
        status: "removed",
      },
      {
        upsert: true,
        new: true,
      }
    );
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

module.exports = {
  sendFriendshipRequest,
  cancelFriendshipRequest,
  getFriendshipRequests,
  checkFriendship,
  friendshipResponse,
  removeFriendship,
};
