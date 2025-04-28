// @ts-nocheck
import { Router } from "express";
import TopicController from "../controllers/topicController";


const TopicRoutes=Router();

TopicRoutes.post("/create", TopicController.create);


export default TopicRoutes;
