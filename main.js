import "./style.css";
import { Octokit } from "octokit";
import { isPopular, debounce } from "./utils";

const octokit = new Octokit({
  auth: "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",
});

const queryGitHub = debounce(async (search) => {
  const [owner, repo] = search.split("/");

  try {
    const { data } = await octokit.request(`GET /repos/${owner}/${repo}`);

    const {
      name,
      stargazers_count: stars,
      forks_count: forks,
      owner: { avatar_url: avatar, login },
    } = data;
    console.log({ name, stars, forks, avatar, login });
    setRepositoryData({ name, stars, forks, avatar, login });
  } catch (ex) {
    if (ex.status === 404) {
      alert(ex.message);
    } else {
      alert("Something went wrong.");
    }
  }
});

const search = (e) => {
  e.preventDefault();
  const { value } = e.target;

  if (!value) return;

  queryGitHub(value);
};

const setRepositoryData = ({ name, stars, forks, avatar, login }) => {
  document.getElementById("repo_avatar").src = avatar;
  document.getElementById("repo_name").innerHTML = name;
  document.getElementById("repo_login").innerHTML = login;
  document.getElementById("repo_stars").innerText = stars;
  document.getElementById("repo_forks").innerText = forks;
  document.getElementById("repo_popularity").innerText = isPopular(
    stars,
    forks
  );
  document.getElementById("repo_container").style.display = "block";
};

document.getElementById("search").addEventListener("input", search);
