import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { getGithubResponse } from '../api/request';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { IssueItemContainer } from '../mainPage/IssueItem';

const DetailPage = () => {
	const { issueNumber } = useParams();
	const [issueData, setIssueData] = useState<IIssueDetail>();

	useEffect(() => {
		const requestGetIssueDetail = async () => {
			try {
				const { data } = await getGithubResponse({ issues: '/issues', issueNumber: '/' + issueNumber });
				console.log(data);
				setIssueData(data);
			} catch (err) {
				alert(err);
			}
		};
		requestGetIssueDetail();
	}, [issueNumber]);

	return (
		<>
			{issueData && (
				<main>
					<TitleSection>
						<div className="profile">
							<img src={issueData.user.avatar_url} alt={'프로필이미지'} />
						</div>
						<IssueItemContainer>
							<div className="issue-info-section">
								<div className="about-issue">
									<div>{'#' + issueData.number}</div>
									<div>{issueData.title}</div>
								</div>
								<div className="about-record">
									<div>{issueData.user.login}</div>
									<div>{issueData.created_at}</div>
								</div>
							</div>
							<div>{issueData.comments}</div>
						</IssueItemContainer>
					</TitleSection>
					<ContentSection>
						<ReactMarkdown>{issueData.body}</ReactMarkdown>
					</ContentSection>
				</main>
			)}
		</>
	);
};

const TitleSection = styled.section`
	position: relative;
	display: flex;
	flex-direction: row;
	margin: auto;

	.profile {
		img {
			width: 60px;
		}
	}
`;
const ContentSection = styled.div`
	position: relative;
	padding: 50px 20px;
`;

export default DetailPage;
