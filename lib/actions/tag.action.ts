"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  GetAllTagsParams,
  GetBlogsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import Tag, { ITag } from "@/database/tag.model";
import Question from "@/database/blog.model";
import { FilterQuery } from "mongoose";
import Interaction from "@/database/interaction.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();
    const { userId, limit = 2 } = params;
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    const userInteractions = await Interaction.find({ user: userId }).populate({
      path: "tags",
      model: Tag,
      select: "_id name",
    });
    // Group interactions by tags
    const tagFreqMap: { [key: string]: number } = {};
    const tagNameToIdMap: { [key: string]: any } = {};
    for (const interaction of userInteractions) {
      if (interaction && interaction.tags) {
        for (const tag of interaction.tags) {
          if (!tagNameToIdMap[tag.name]) {
            tagNameToIdMap[tag.name] = tag._id;
          }
          if (!tagFreqMap[tag.name]) {
            tagFreqMap[tag.name] = 1;
          } else {
            tagFreqMap[tag.name]++;
          }
        }
      }
    }
    // Convert grouped tags object to an array of objects
    const topInteractedTags = Object.keys(tagFreqMap).map((tagName) => ({
      _id: tagNameToIdMap[tagName],
      name: tagName,
      count: tagFreqMap[tagName],
    }));
    // Sort the tags by count in descending order
    topInteractedTags.sort((a, b) => b.count - a.count);
    return topInteractedTags
      .filter((tag) => ({
        _id: tag._id,
        name: tag.name,
      }))
      .slice(0, limit);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();
    const tags = await Tag.find({});
    return tags;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getBlogsByTagIdParams(params: GetBlogsByTagIdParams) {
  try {
    connectToDatabase();
    const tagId = params;
    console.log(tagId);
    const blogs = await Tag.findById(tagId).populate("blogs");
    console.log(blogs);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getTopPopularTags() {
  try {
    connectToDatabase();
    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);
    return popularTags;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
