import PulseLoader from 'react-spinners/PulseLoader';
import { styled } from 'styled-components';

const Loading = () => {
	return (
		<LoadingContainer>
			<PulseLoader color="#6b8e23" />
		</LoadingContainer>
	);
};

const LoadingContainer = styled.div`
	position: relative;
	width: 100%;
	text-align: center;
	padding: 20px 0;
`;

export default Loading;
