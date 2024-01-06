import { getUserBlogs } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import BlogCard from "../cards/BlogCard";
import NoResult from "./NoResult";
import { PAGE_NUMBER_SEARCH_PARAMS_KEY } from "@/constants";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const BlogTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserBlogs({ userId });
  return (
    <>
      {result.blogs.length === 0 ? (
        <NoResult
          title="There's no blog to show"
          description="Be the first to break the silence! 🚀 Ask a blog and kickstart the
            discussion. our query could be the next big thing others learn from. Get
            involved! 💡"
          link="/ask-blog"
          linkTitle="Ask a blog"
        />
      ) : (
        <>
          <p className="paragraph-semibold text-dark200_light900 px-2">
            {result.totalBlogs} blog
            {result.totalBlogs === 1 ? "" : "s"} asked
          </p>
          <div className="mt-10  flex justify-center flex-wrap gap-6 w-full ">
            {result.blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                _id={blog._id}
                title={blog.title}
                tags={blog.tags}
                upvotes={blog.upvotes}
                views={blog.views}
                createdAt={blog.createdAt}
              />
            ))}
          </div>
        </>
      )}
      {/* <div className="mt-10">
        <Pagination
          pageNumber={
            searchParams && searchParams[PAGE_NUMBER_SEARCH_PARAMS_KEY]
              ? +searchParams[PAGE_NUMBER_SEARCH_PARAMS_KEY]
              : 1
          }
          isNext={result.isNextblogs}
        />
      </div> */}
    </>
  );
};

export default BlogTab;
