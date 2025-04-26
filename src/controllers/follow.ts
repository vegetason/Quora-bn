import { db } from "../database/models";
import { FollowAttributes } from "../database/models/followers";
import { UserAttributes } from "../database/models/user";
import { Request, Response } from "express";

const User = db.User;
const Follow = db.Follow;

export const followUser = async (req: Request, res: Response) => {
  try {
    const { followedId} = req.body;
    const followerId = (req.user as UserAttributes).id; 
    
    const [follower, followed] = await Promise.all([
      User.findByPk(followerId),
      User.findByPk(followedId)
    ]);
    
    if (!follower || !followed) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const existingFollow = await Follow.findOne({
      where: { followerId, followedId }
    });
    
    if (existingFollow) {
      return res.status(400).json({ message: "Already following this user" });
    }
    
    await Follow.create({ followerId, followedId }as FollowAttributes);
    
    return res.status(201).json({ message: "Successfully followed user" });
  } catch (error) {
    console.error("Error following user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const unfollowUser = async (req: Request, res: Response) => {
  try {
    const { followedId } = req.params;
    const followerId = (req.user as UserAttributes).id;
    
    const follow = await Follow.findOne({
      where: { followerId, followedId }
    });
    
    if (!follow) {
      return res.status(404).json({ message: "Follow relationship not found" });
    }
    
    await follow.destroy();
    
    return res.status(200).json({ message: "Successfully unfollowed user" ,unfollowedUser:follow});
  } catch (error) {
    console.error("Error unfollowing user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getFollowers = async (req: Request, res: Response) => {
  try {
    const userId  = (req.user as UserAttributes).id;
    
    const followers = await User.findByPk(userId, {
      include: [{
        model: User,
        as: "followers",
        through: { attributes: [] },
        attributes: ["id", "username", "email"],
      }]
    });
    
    if (!followers) {
      return res.status(404).json({ message: "User not found" });
    }
    
    return res.status(200).json(followers);
  } catch (error) {
    console.error("Error getting followers:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getFollowing = async (req: Request, res: Response) => {
    try {
      const userId  = (req.user as UserAttributes).id;;
      
      const following = await User.findByPk(userId, {
        include: [{
          model: User,
          as: "following",
          through: { attributes: [] },
          attributes: ["id", "username", "email"]
        }]
      });
      
      if (!following) {
        return res.status(404).json({ message: "User not found" });
      }
      
      return res.status(200).json(following);
    } catch (error) {
      console.error("Error getting following:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  

  export const checkFollowStatus = async (req: Request, res: Response) => {
    try {
      const userId=(req.user as UserAttributes).id;
      const {targetId } = req.params;
      
      const follow = await Follow.findOne({
        where: { followerId: userId, followedId: targetId }
      });
      
      return res.status(200).json({ isFollowing: !!follow });
    } catch (error) {
      console.error("Error checking follow status:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };