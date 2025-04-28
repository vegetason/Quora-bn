import { Router } from "express";
import userRoutes from "./user";
import FollowRoutes from "./follow";
import TopicRoutes from "./topicRoutes";

const router=Router();

router.use('/user',userRoutes);
router.use('/user',FollowRoutes);
router.use('/topics', TopicRoutes)

export default router;