import { groq } from "next-sanity";
import { readClient } from "./lib/client";
import { buildQuery } from "./utils";

interface GetResourcesParams {
  query: string;
  category: string;
  page: string;
}

export const getResourcesPlaylists = async () => {
  try {
    const resources = await readClient.fetch(groq`*[_type == "resourcePlaylist"]{
      _id,  
      title,
      resources[0...6]->{
        _id,
        title,
        downloadLink,
        "image": poster.asset->url,
        views,
        "slug": slug.current,
        category  
      }
    }`);

    return resources;
  } catch (e) {
    console.log(e);
  }
};

export const getResources = async (params: GetResourcesParams) => {
  const { category, page, query } = params;

  try {
    const resources = await readClient.fetch(groq`${buildQuery({
      type: "resource",
      query,
      category,
      page: parseInt(page),
    })}{
        title,
        _id,
        downloadLink,
        "image": poster.asset->url,
        views,
        "slug": slug.current,
        category  
    }`);

    return resources;
  } catch (e) {
    console.log(e);
  }
};
