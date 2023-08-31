import { styled } from 'styled-components';
import IssueItem from './IssueItem';
import { useEffect, useRef, useState } from 'react';
import { getGithubResponse } from '../api/request';
import AdBannder from './AdBannder';
import Loading from '../common/Loading';

const MainPage = () => {
	const [issueList, setIssueList] = useState<ResponseIssueDataType[]>([]);
	const [page, setPage] = useState<number>(1);
	//더이상 페이지가 없으면 요청을 하지 않도록
	const observeRef = useRef<Element | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [target, setTarget] = useState(null);

	// const observer = new IntersectionObserver(
	// 	([entry]) => {
	// 		if (!entry.isIntersecting) return;

	// 		// observer.unobserve(entry.target);
	// 		setPage((page) => page + 1);
	// 	},
	// 	{
	// 		rootMargin: '50px 0px',
	// 		threshold: 0.3,
	// 	},
	// );
	// observeRef.current && observer.observe(observeRef.current);

	useEffect(() => {
		const requestGetIssues = async () => {
			setIsLoading(true);
			try {
				const { data }: { data: ResponseIssueDataType[] } = await getGithubResponse({
					issues: '/issues',
					state: 'open',
					sort: 'comments',
					page,
				});
				page === 1 ? setIssueList(data) : setIssueList((prev) => [...prev, ...data]);
			} catch (err) {
				alert(err);
			} finally {
				setIsLoading(false);
			}
		};
		requestGetIssues();
	}, [page]);

	// useEffect(() => {
	// 	if (isLoading) {
	// 		observeRef.current.unobserve()
	// 	}
	// }, [isLoading])

	return (
		<main>
			<IssueListContainer>
				{issueList.map((issue, index) => (
					<li key={issue.id}>
						<IssueItem issue={issue} />
						{(index + 1) % 4 === 0 && <AdBannder />}
						{/* <div ref={observeRef}>sdf</div> */}
					</li>
				))}
			</IssueListContainer>
			{isLoading ? <Loading /> : <div ref={observeRef}></div>}
		</main>
	);
};

const IssueListContainer = styled.ul`
	padding: 10px;
`;

export default MainPage;
