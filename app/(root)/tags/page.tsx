import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import {
  FILTER_SEARCH_PARAMS_KEY,
  PAGE_NUMBER_SEARCH_PARAMS_KEY,
  QUERY_SEARCH_PARAMS_KEY,
} from "@/constants";
import { TagFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.action";
import { SearchParamsProps } from "@/types";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tags | Dev Overflow",
  description:
    "View the tags used on Dev Overflow - A community-driven platform for asking and answering programming questions. Get help, share knowledge and collaborate with developers from around the world. Explore topics in web developments, mobile app development, algorithms, data structures and more...",
};

const Page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllTags({});
  // console.log(result);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Tags</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Filter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {result.length > 0 ? (
          result.map((tag) => (
            <Link
              href={`/tags/${tag._id}`}
              key={tag._id}
              className="shadow-light100_darknone"
            >
              <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
                <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
                  <p className="paragraph-semibold text-dark300_light900">
                    {tag.name}
                  </p>
                </div>
                <p className="small-medium text-dark400_light500 mt-3.5">
                  <span className="body-semibold primary-text-gradient mr-2.5">
                    {tag?.questions?.length}+
                  </span>{" "}
                  Blogs
                </p>
              </article>
            </Link>
          ))
        ) : (
          <NoResult
            title="No Tags Found"
            description="It looks like no tags are found."
            link="/ask-question"
            linkTitle="Write a Blog"
          />
        )}
      </section>
    </>
  );
};

export default Page;
