import BlogCard from "@/components/cards/BlogCard";
import NoResult from "@/components/shared/NoResult";
import { Button } from "@/components/ui/button";
import { getBlogById } from "@/lib/actions/blog.action";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const Page = async ({ params }: any) => {
  const { userId } = auth();

  const result = await getBlogById({ blogId: params.id });

  //   console.log(result);
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900"></h1>
      </div>

      {/* <HomeFilters /> */}
      {/* <div className="mt-10 flex flex-col gap-6 w-full sm:w-1/2">
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
      </div> */}
    </>
  );
};

export default Page;
