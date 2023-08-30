import { styled } from 'styled-components';
import IssueItem from './IssueItem';
import { useEffect, useState } from 'react';
import { getGithubResponse } from '../api/request';
import AdBannder from './AdBannder';

const MainPage = () => {
	const [issueList, setIssueList] = useState<ResponseIssueDataType[]>([]);

	useEffect(() => {
		const requestGetIssues = async () => {
			try {
				const { data }: { data: ResponseIssueDataType[] } = await getGithubResponse({
					issues: '/issues',
					state: 'open',
					sort: 'comments',
				});
				setIssueList(data);
			} catch (err) {
				alert(err);
			}
		};
		requestGetIssues();
	}, []);

	return (
		<main>
			<IssueListContainer>
				{issueList.map((issue, index) => (
					<li key={issue.id}>
						<IssueItem issue={issue} />
						{(index + 1) % 4 === 0 && <AdBannder />}
					</li>
				))}
			</IssueListContainer>
		</main>
	);
};

const IssueListContainer = styled.ul`
	padding: 10px;
`;

export default MainPage;
