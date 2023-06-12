import type { APIRoute } from "astro";
import { Octokit, App } from "octokit";

const octokit = new Octokit({ auth: import.meta.env.GH_TOKEN });

export const get: APIRoute = async ({ params, request }) => {
  const { data } = await octokit.rest.repos.getContent({
    mediaType: {
      format: "raw",
    },
    owner: "marcjfj",
    repo: "fariasjones",
    path: params.path as string,
  });

  console.log(data);

  return {
    body: JSON.stringify(data),
  };
};
