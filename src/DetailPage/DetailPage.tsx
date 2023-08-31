import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { getGithubResponse } from '../api/request';
import IssueItem from '../mainPage/IssueItem';
import MDEditor from '@uiw/react-md-editor';
import Loading from '../common/Loading';

const DetailPage = () => {
	const location = useLocation();
	const issueInfo = location.state as ResponseIssueDataType;
	const [issueData, setIssueData] = useState<IIssueDetail>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const requestGetIssueDetail = async () => {
			setIsLoading(true);
			try {
				const { data } = await getGithubResponse({ issues: '/issues', issueNumber: '/' + issueInfo.number });
				console.log(data);
				setIssueData(data);
			} catch (err) {
				alert(err);
			} finally {
				setIsLoading(false);
			}
		};
		requestGetIssueDetail();
	}, [issueInfo.number]);

	return (
		<>
			{isLoading && <Loading />}
			{issueData && (
				<main>
					<TitleSection>
						<div className="profile">
							<img src={issueData.user.avatar_url} alt={'프로필이미지'} />
						</div>
						<IssueItem issue={issueInfo} />
					</TitleSection>
					<ContentSection data-color-mode="light">
						<MDEditor.Markdown style={{ padding: 10 }} source={issueData.body} />
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
