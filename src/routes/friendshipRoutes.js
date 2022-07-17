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

router.get("/", getFriendshipRequests);
router.get("/:senderId/:receiverId", sendFriendshipRequest);
router.get("/cancel/:senderId/:receiverId", cancelFriendshipRequest);
router.get("/check-friendship-status/:senderId/:receiverId", checkFriendship);
router.get("/response/:senderId/:receiverId/:response", friendshipResponse);
router.get("/remove/:senderId/:receiverId", removeFriendship);

module.exports = router;
