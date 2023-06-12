import type { APIRoute } from "astro";
import { Octokit } from "octokit";

const octokit = new Octokit({ auth: import.meta.env.GH_TOKEN });

export const get: APIRoute = async ({ params, request }) => {
  const { data } = await octokit.request(
    "GET /repos/{owner}/{repo}/git/trees/{tree_sha}",
    {
      owner: "marcjfj",
      repo: "fariasjones",
      tree_sha: "299893f837cd99931a860a2a90c5129782463337",
      recursive: "true",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  return {
    body: JSON.stringify(data),
  };
};
