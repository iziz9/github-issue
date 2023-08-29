import { styled } from 'styled-components';

const IssueItem = () => {
	return (
		<IssueItemContainer>
			<IssueInfoSection>
				<div className="about-issue">
					<div>이슈번호</div>
					<div>이슈제목</div>
				</div>
				<div className="about-record">
					<div>작성자</div>
					<div>작성일</div>
				</div>
			</IssueInfoSection>
			<CommentSection>코멘트</CommentSection>
		</IssueItemContainer>
	);
};

const IssueItemContainer = styled.li`
	display: flex;
	justify-content: space-between;
	padding: 10px 20px;
`;

const IssueInfoSection = styled.section`
	.about-issue {
		display: flex;
		flex-direction: row;
		gap: 12px;
	}
	.about-record {
		display: flex;
		flex-direction: row;
		gap: 12px;
	}
`;
const CommentSection = styled.section`
	margin: auto 0;
`;

export default IssueItem;
