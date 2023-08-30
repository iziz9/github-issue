import { styled } from 'styled-components';

const AdBannder = () => {
	return (
		<BannerContainer>
			<a href="https://www.wanted.co.kr/" target="_blank">
				<img
					src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100"
					alt="광고"
				/>
			</a>
		</BannerContainer>
	);
};
const BannerContainer = styled.li`
	position: relative;
	width: 100%;
	height: 100%;
	border-bottom: 1px solid #d3d3d3;

	img {
		position: relative;
		width: 200px;
		display: block;
		margin: auto;
	}
`;

export default AdBannder;
