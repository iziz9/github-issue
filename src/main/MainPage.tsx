import { styled } from 'styled-components';
import IssueItem from './IssueItem';
import { useEffect, useRef, useState } from 'react';
import { getGithubResponse } from '../api/request';
import AdBannder from './AdBannder';
import Loading from '../common/Loading';

const MainPage = () => {
	const [issueList, setIssueList] = useState<ResponseIssueDataType[]>([]);
	const [page, setPage] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isLastPage, setIsLastPage] = useState<boolean>(false); //더이상 페이지가 없으면 요청을 하지 않도록
	const observeRef = useRef<any>();

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
				if (data.length < 10) setIsLastPage(true);
			} catch (err) {
				alert(err);
			} finally {
				setIsLoading(false);
			}
		};

		isLastPage ? null : requestGetIssues();
	}, [page, isLastPage]);

	const observerCallback = (entries: any, observer: any) => {
		console.log(entries);
		if (entries[0].isIntersecting) {
			setPage((prev) => prev + 1);
			observer.unobserve(entries[0].target);
		}
	};

	useEffect(() => {
		const observer = new IntersectionObserver(observerCallback, { threshold: 0.3 });
		if (observeRef.current) {
			observer.observe(observeRef.current);
		}

		return () => {
			observer.disconnect();
		};
	}, [issueList]);

	return (
		<main>
			<IssueListContainer>
				{issueList.map((issue, index) => (
					<li key={issue.id}>
						<IssueItem issue={issue} />
						{(index + 1) % 4 === 0 && <AdBannder />}
						{index === issueList.length - 1 && <div ref={observeRef}></div>}
					</li>
				))}
			</IssueListContainer>
			{isLoading && <Loading />}
		</main>
	);
};

const IssueListContainer = styled.ul`
	padding: 10px;
`;

export default MainPage;
