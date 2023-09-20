import { Filters } from "@/components/Filters";
import { SearchForm } from "@/components/SearchForm";
import {
  getResources,
  getResourcesPlaylists,
} from "../../../../sanity/actions";
import { ResourceCard } from "@/components/ResourceCard";
import { Header } from "@/components/Header";

type Resource = {
  _id: string;
  slug: string;
  category: string;
  title: string;
  downloadLink: string;
  image: string;
  views: number;
};

type ResourcePlaylist = {
  _id: string;
  title: string;
  resources: Resource[];
};

export const revalidate = () => 900;

interface PageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

async function Page({ searchParams }: PageProps) {
  const resources = (await getResources({
    query: searchParams?.query ?? "",
    category: searchParams?.category ?? "",
    page: "1",
  })) as Resource[];

  const resourcesPlaylist = (await getResourcesPlaylists()) as ResourcePlaylist[];

  return (
    <main className="flex-center paddings mx-auto w-full max-w-screen-2xl flex-col">
      <section className="nav-padding w-full">
        <div className="flex-center relative min-h-[274px] w-full flex-col rounded-xl bg-banner bg-cover bg-center text-center">
          <h1 className="sm:heading1 heading2 mb-6 text-center text-white">
            JavaScript Mastery Resources
          </h1>
        </div>
        <SearchForm />
      </section>

      <Filters />

      {(searchParams?.query || searchParams?.category) && (
        <section className="flex-center mt-6 w-full flex-col sm:mt-20">
          <Header
            type="Resources"
            query={searchParams?.query ?? ""}
            category={searchParams?.category ?? ""}
          />
          <div className="mt-12 flex w-full flex-wrap justify-center gap-16 sm:justify-start">
            {resources?.length > 0 ? (
              resources.map((resource) => (
                <ResourceCard resource={resource} key={resource._id} />
              ))
            ) : (
              <p className="body-regular text-white-400">No resources found</p>
            )}
          </div>
        </section>
      )}

      {resourcesPlaylist.map((item) => (
        <section
          key={item._id}
          className="flex-center mt-6 w-full flex-col sm:mt-20"
        >
          <h1 className="heading3 self-start text-white-800">{item.title}</h1>
          <div className="mt-12 flex w-full flex-wrap justify-center gap-16 sm:justify-start">
            {item.resources.map((resource) => (
              <ResourceCard resource={resource} key={resource._id} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

export default Page;
