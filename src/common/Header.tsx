import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { owner, repo } from '../api/request';

const Header = () => {
	const navigate = useNavigate();
	return (
		<HeaderContainer>
			<div className="inner">
				<div className="title" onClick={() => navigate('/')}>
					{owner + '/' + repo}
				</div>
			</div>
		</HeaderContainer>
	);
};

const HeaderContainer = styled.header`
	position: relative;
	width: 100%;
	height: 60px;
	border-bottom: 1px solid gray;

	.title {
		font-size: 36px;
		font-weight: 700;
		color: olivedrab;
		text-align: center;
		line-height: 60px;
		cursor: pointer;
	}

	@media (max-width: 700px) {
		.title {
			font-size: 24px;
		}
	}
`;

export default Header;
