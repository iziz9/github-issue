import { styled } from 'styled-components';
import IssueItem from './IssueItem';
import { useEffect, useState } from 'react';
import { getGithubResponse } from '../api/request';
import AdBannder from './AdBannder';

const MainPage = () => {
	const [issueList, setIssueList] = useState<ResponseIssueDataType[]>([]);

	useEffect(() => {
		const requestGetIssues = async () => {
			const { data }: { data: ResponseIssueDataType[] } = await getGithubResponse({ issues: '/issues' });
			setIssueList([...data].sort((a, b) => b.comments - a.comments));
		};

		requestGetIssues();
	}, []);

	return (
		<main>
			<IssueListContainer>
				{issueList.map((issue, index) => (
					<>
						<IssueItem issue={issue} key={issue.id} />
						{(index + 1) % 4 === 0 && <AdBannder key={'banner' + issue.id} />}
					</>
				))}
			</IssueListContainer>
		</main>
	);
};

const IssueListContainer = styled.ul`
	padding: 10px;
`;

export default MainPage;
