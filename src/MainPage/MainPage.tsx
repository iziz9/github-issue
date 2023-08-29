import { styled } from 'styled-components';
import IssueItem from './IssueItem';

const MainPage = () => {
	return (
		<main>
			<IssueListContainer>
				<IssueItem />
			</IssueListContainer>
		</main>
	);
};

const IssueListContainer = styled.ul`
	background-color: antiquewhite;
`;

export default MainPage;
