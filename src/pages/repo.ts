import type { APIRoute } from "astro";
import { Octokit } from "octokit";

const octokit = new Octokit({ auth: import.meta.env.GH_TOKEN });

export const get: APIRoute = async ({ params, request }) => {

  // get tree shaw from most recent commit
  const { data: commit } = await octokit.request(
    "GET /repos/{owner}/{repo}/commits/{ref}",
    {
      owner: "marcjfj",
      repo: "fariasjones",
      ref: "main",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );


  
  const { data } = await octokit.request(
    "GET /repos/{owner}/{repo}/git/trees/{tree_sha}",
    {
      owner: "marcjfj",
      repo: "fariasjones",
      tree_sha: commit.commit.tree.sha,
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
