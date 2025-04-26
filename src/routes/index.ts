import { Router } from "express";
import userRoutes from "./user";
import FollowRoutes from "./follow";

const router=Router();

router.use('/user',userRoutes);
router.use('/user',FollowRoutes);

export default router;