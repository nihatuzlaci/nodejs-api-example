const express = require("express");

const router = express.Router();

const {
  sendFriendshipRequest,
  cancelFriendshipRequest,
  getFriendshipRequests,
  checkFriendship,
  friendshipResponse,
  removeFriendship,
} = require("../controllers/friendshipController");

const { verifyToken } = require("../middlewares/auth");

router.get("/", verifyToken, getFriendshipRequests);
router.get("/:senderId/:receiverId", verifyToken, sendFriendshipRequest);
router.get(
  "/cancel/:senderId/:receiverId",
  verifyToken,
  cancelFriendshipRequest
);
router.get(
  "/check-friendship-status/:senderId/:receiverId",
  verifyToken,
  checkFriendship
);
router.get(
  "/response/:senderId/:receiverId/:response",
  verifyToken,
  friendshipResponse
);
router.get("/remove/:senderId/:receiverId", verifyToken, removeFriendship);

module.exports = router;
