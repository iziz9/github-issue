/// <reference types="vite/client" />

type RequestArgsType = {
	issues?: string;
	state?: string;
	issueNumber?: string | '';
	sort?: string;
};

type ResponseIssueDataType = {
	comments: number;
	id: number;
	number: number;
	created_at: string;
	user: IUser;
	title: string;
};

interface IUser {
	avatar_url: string;
	id: number;
	login: string; // 이름
}

interface IIssueDetail {
	body: string;
	comments: number;
	created_at: string;
	state: string;
	number: number;
	user: { login: string; avatar_url: string };
	title: string;
}
