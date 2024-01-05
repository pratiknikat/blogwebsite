import { Schema } from "mongoose";

import { IUser } from "@/database/user.model";

export interface CreateBlogParams {
  title: string;
  content: string;
  tags: string[]; // Assuming tags is an array of strings
  author: string;
  path: string;
}

// export interface GetAnswersParams {
//   questionId: string;
//   sortBy?: string;
//   page?: number;
//   pageSize?: number;
// }

// export interface AnswerVoteParams {
//   answerId: string;
//   userId: string;
//   hasAlreadyUpvoted: boolean;
//   hasAlreadyDownvoted: boolean;
//   path: string;
// }

// export interface DeleteAnswerParams {
//   answerId: string;
//   path: string;
// }

export interface SearchParams {
  query?: string | null;
  type?: string | null;
}

export interface RecommendedParams {
  userId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}

export interface ViewBlogParams {
  blogId: string;
  userId: string | undefined;
}

export interface JobFilterParams {
  query: string;
  page?: number;
}

export interface GetBlogsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}

export interface CreateBlogParams {
  title: string;
  content: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
}

export interface GetBlogByIdParams {
  blogId: string;
}

export interface BlogVoteParams {
  blogId: string;
  userId: string;
  hasAlreadyUpvoted: boolean;
  hasAlreadyDownvoted: boolean;
  path: string;
}

export interface DeleteBlogParams {
  blogId: string;
  path: string;
}

export interface EditBlogParams {
  blogId: string;
  title: string;
  content: string;
  path: string;
}

export interface GetAllTagsParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface GetBlogsByTagIdParams {
  tagId: string;
  // page?: number;
  // pageSize?: number;
  // searchQuery?: string;
}

export interface GetTopInteractedTagsParams {
  userId: string;
  limit?: number;
}

export interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}

export interface GetUserByIdParams {
  userId: string;
}

export interface GetAllUsersParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string; // Add searchQuery parameter
}

export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}

// export interface ToggleSaveQuestionParams {
//   userId: string;
//   questionId: string;
//   path: string;
// }

// export interface GetSavedQuestionsParams {
//   clerkId: string;
//   page?: number;
//   pageSize?: number;
//   filter?: string;
//   searchQuery?: string;
// }

export interface GetUserStatsParams {
  userId: string;
  page?: number;
  pageSize?: number;
}

export interface DeleteUserParams {
  clerkId: string;
}
