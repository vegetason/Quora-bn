// @ts-nocheck
import { Router } from "express";
import * as followControllers from "../controllers/follow"
import { authenticate } from "../middlewares/user";

const FollowRoutes=Router();

FollowRoutes.post("/follow", authenticate, followControllers.followUser);
FollowRoutes.delete("/unfollow/:followedId", authenticate, followControllers.unfollowUser);
FollowRoutes.get("/followers",authenticate, followControllers.getFollowers);
FollowRoutes.get("/following",authenticate, followControllers.getFollowing);
FollowRoutes.get("/status/:targetId",authenticate, followControllers.checkFollowStatus);

export default FollowRoutes;