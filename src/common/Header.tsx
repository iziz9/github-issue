import { styled } from 'styled-components';

const Header = () => {
	return (
		<HeaderContainer>
			<div className="inner">
				<div className="title">organization name / repository name</div>
			</div>
		</HeaderContainer>
	);
};

const HeaderContainer = styled.header`
	position: relative;
	width: 100%;
	height: 60px;
	border-bottom: 1px solid olivedrab;

	.title {
		font-size: 36px;
		color: olivedrab;
		text-align: center;
		line-height: 60px;
	}
`;

export default Header;
