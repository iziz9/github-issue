import PulseLoader from 'react-spinners/PulseLoader';
import { styled } from 'styled-components';

const Loading = () => {
	return (
		<LoadingContainer>
			<PulseLoader color="#6b8e23" size={38} />
		</LoadingContainer>
	);
};

const LoadingContainer = styled.div`
	position: absolute;
	z-index: 100;
	width: 100%;
	text-align: center;
	margin: 20px 0;
`;

export default Loading;
