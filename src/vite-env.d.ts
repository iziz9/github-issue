/// <reference types="vite/client" />

type RequestArgsType = {
	issues?: string;
	issueNumber?: number | '';
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
