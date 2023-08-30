import { Octokit } from 'octokit';

const octokit = new Octokit({
	auth: import.meta.env.VITE_ACCESS_TOKEN,
});

export const getGithubResponse = async ({ issues = '', state = '', issueNumber = '', sort = '' }: RequestArgsType) => {
	const res = await octokit.request('GET /repos/facebook/react' + issues + issueNumber, {
		owner: 'facebook',
		repo: 'react',
		headers: {
			'X-GitHub-Api-Version': '2022-11-28',
		},
		state: state,
		sort: sort,
	});
	return res;
};
