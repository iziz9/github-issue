import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const IssueItem = ({ issue }: { issue: ResponseIssueDataType }) => {
	//issue data context로 저장해서 detail에서 같이 사용하기?
	const navigate = useNavigate();
	const createdData = new Date(issue.created_at).toLocaleDateString('ko-KR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
	return (
		<IssueItemContainer>
			<section className="issue-info-section">
				<div className="about-issue">
					<div className="issue-number">{'#' + issue.number}</div>
					<div className="issue-title" onClick={() => navigate('/detail/' + issue.number)}>
						{issue.title}
					</div>
				</div>
				<div className="about-record">
					<div className="issue-user">
						<span>작성자 : </span>
						<span>{issue.user.login},</span>
					</div>
					<div className="issue-date">{createdData}</div>
				</div>
			</section>
			<section className="issue-comments-section">
				<span>코멘트</span>
				<span>{issue.comments}</span>
			</section>
		</IssueItemContainer>
	);
};

export const IssueItemContainer = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 10px 20px;
	border-bottom: 1px solid #d3d3d3;
	margin: auto;

	.issue-info-section {
		display: flex;
		flex-direction: column;
		gap: 10px;

		.about-issue {
			display: flex;
			flex-direction: row;
			gap: 12px;

			.issue-number {
				font-weight: 700;
				color: darkgreen;
			}
			.issue-title {
				font-weight: 700;
				cursor: pointer;
				white-space: break-spaces;
			}
		}
		.about-record {
			display: flex;
			flex-direction: row;
			gap: 12px;
			color: #707070;

			.issue-user {
				display: flex;
				flex-direction: row;
				gap: 5px;
			}
		}
	}

	.issue-comments-section {
		width: 80px;
		margin: auto 0;
		display: flex;
		text-align: center;
		gap: 5px;
		color: #707070;
	}
`;

export default IssueItem;
