import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const ErrorPage = () => {
	const navigate = useNavigate();

	return (
		<main>
			<ErrorContainer>
				<div>문제가 발생했습니다.</div>
				<button onClick={() => navigate(-1)}>이전 페이지로</button>
			</ErrorContainer>
		</main>
	);
};

const ErrorContainer = styled.main`
	position: relative;
	width: 300px;
	margin: 50px auto;
	display: flex;
	flex-direction: column;
	gap: 60px;
	text-align: center;

	button {
		background-color: olivedrab;
		width: 100px;
		height: 40px;
		margin: auto;
	}
`;

export default ErrorPage;
