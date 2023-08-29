import { styled } from 'styled-components';

const DetailPage = () => {
	return (
		<main>
			<TitleSection>
				<div>이미지</div>
				<div>
					<div>
						<div>이슈번호</div>
						<div>이슈제목</div>
					</div>
					<div>
						<div>작성자</div>
						<div>작성일</div>
					</div>
				</div>
				<div>코멘트</div>
			</TitleSection>
			<ContentSection>
				<div>마크다운으로 구성된 내용들...</div>
			</ContentSection>
		</main>
	);
};

const TitleSection = styled.section`
	position: relative;
`;
const ContentSection = styled.div`
	position: relative;
`;

export default DetailPage;
