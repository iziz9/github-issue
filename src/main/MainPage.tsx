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

	const ElementRef = (node: HTMLDivElement) => {
		if (observeRef.current) observeRef.current.disconnect();
		// 최근 observer를 갖기위해 이전 observer disconnect
		observeRef.current = new IntersectionObserver(([entry]) => {
			// entries는 아래 설명참조
			if (entry.isIntersecting) {
				setPage((prev) => prev + 1);
			}
		});
		if (node) observeRef.current.observe(node); // 노드가 있으면 observer.current를 observe
	};

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

		requestGetIssues();
	}, [page]);

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
			{isLoading ? <Loading /> : !isLastPage && <div ref={ElementRef}></div>}
		</main>
	);
};

const IssueListContainer = styled.ul`
	padding: 10px;
`;

export default MainPage;
