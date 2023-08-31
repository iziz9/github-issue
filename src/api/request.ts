import { Octokit } from 'octokit';

export const owner = 'facebook';
export const repo = 'react';

const octokit = new Octokit({
	auth: import.meta.env.VITE_ACCESS_TOKEN,
	owner,
	repo,
});

export const getGithubResponse = async ({
	issues = '',
	state = '',
	issueNumber = '',
	sort = '',
	page = 1,
	per_page = 10,
}: RequestArgsType) => {
	const res = await octokit.request(`GET /repos/${owner}/${repo}` + issues + issueNumber, {
		headers: {
			'X-GitHub-Api-Version': '2022-11-28',
		},
		state,
		sort,
		page,
		per_page,
	});
	return res;
};
