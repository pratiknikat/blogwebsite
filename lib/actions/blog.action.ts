"use server";

import Blog from "@/database/blog.model";
import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateBlogParams,
  DeleteBlogParams,
  EditBlogParams,
  GetBlogByIdParams,
  GetBlogsParams,
  BlogVoteParams,
} from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

import Interaction from "@/database/interaction.model";
import { FilterQuery } from "mongoose";

export async function getBlogs(params: GetBlogsParams) {
  try {
    connectToDatabase();

    const blogs = await Blog.find({}).populate({ path: "tags", model: Tag });
    // .populate({ path: "author", model: User });
    // const totalQuestions = await Blog.countDocuments(query);
    // const isNext = totalQuestions > skipAmount + questions.length;
    // return { questions, isNext };
    return blogs;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createBlog(params: CreateBlogParams) {
  try {
    connectToDatabase();

    const { title, content, tags, author, path } = params;

    // Create the blog
    const blog = await Blog.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: blog._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await Blog.findByIdAndUpdate(blog._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    await User.findByIdAndUpdate(author, { $inc: { reputation: 5 } });

    revalidatePath(path);
  } catch (error) {
    console.error("Error creating blog:", error);
  }
}

export async function getBlogById(params: GetBlogByIdParams) {
  try {
    connectToDatabase();
    const { blogId } = params;
    // const blog = await Blog.findById(blogId);
    const blog = await Blog.findById(blogId);
    // .populate({
    //   path: "tags",
    //   model: Tag,
    //   select: "_id name",
    // });
    // .populate({
    //   path: "author",
    //   model: User,
    //   select: "_id clerkId name ",
    // });
    return blog;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function upvoteBlog(params: BlogVoteParams) {
  try {
    connectToDatabase();
    const { blogId, userId, hasAlreadyUpvoted, hasAlreadyDownvoted, path } =
      params;
    let updateQuery = {};
    if (hasAlreadyUpvoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasAlreadyDownvoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }
    const question = await Blog.findByIdAndUpdate(blogId, updateQuery, {
      new: true,
    });
    if (!question) {
      throw new Error("Blog not found");
    }
    // Increment user's reputation by +1/-1 for upvoting/revoking an upvote to the question
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasAlreadyUpvoted ? -2 : 2 },
    });
    // Increment author's reputation by +10/-10 for recieving an upvote/downvote to the question
    await User.findByIdAndUpdate(question.author, {
      $inc: { reputation: hasAlreadyUpvoted ? -10 : 10 },
    });
    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteBlog(params: DeleteBlogParams) {
  try {
    connectToDatabase();
    const { blogId, path } = params;
    const question = await Blog.findById(blogId);
    await Blog.deleteOne({ _id: blogId });
    await Interaction.deleteMany({ question: blogId });
    await Tag.updateMany(
      { questions: blogId },
      { $pull: { questions: blogId } }
    );
    // Decrement author's reputation by 5 for deleting a question
    await User.findByIdAndUpdate(question.author, { $inc: { reputation: -5 } });
    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}

export async function editBlog(params: EditBlogParams) {
  try {
    connectToDatabase();
    const { blogId, title, content, path } = params;
    const question = await Blog.findById(blogId).populate("tags");
    if (!question) {
      throw new Error("Question not found");
    }
    question.title = title;
    question.content = content;
    await question.save();
    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}
