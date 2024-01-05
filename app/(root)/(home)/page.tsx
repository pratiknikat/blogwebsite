import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HomeFilters from "@/components/home/HomeFilters";
import NoResult from "@/components/shared/NoResult";

import { getBlogs } from "@/lib/actions/blog.action";
import { auth } from "@clerk/nextjs";
import BlogCard from "@/components/cards/BlogCard";

const Home = async () => {
  const { userId } = auth();

  const result = await getBlogs({});

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Blogs</h1>
        <Link href="/write-blog" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Write Blog
          </Button>
        </Link>
      </div>

      {/* <HomeFilters /> */}
      <div className="mt-10 flex flex-col gap-6 w-full sm:w-1/2">
        {result.length > 0 ? (
          result.map((blog) => (
            <BlogCard
              key={blog._id}
              _id={blog._id}
              title={blog.title}
              tags={blog.tags}
              // author={question.author}
              upvotes={blog.upvotes}
              views={blog.views}
              createdAt={blog.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There's no blog to show"
            description="Be the first to break the silence! 🚀 Write a Blog and kickstart the
            discussion. our query could be the next big thing others learn from. Get
            involved! 💡"
            link="/write-blog"
            linkTitle="Write a Blog"
          />
        )}
      </div>
    </>
  );
};

export default Home;
