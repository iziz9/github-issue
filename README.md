# 2주차 개인과제
## 배포 링크

[배포 링크](https://iziz9-github-issue.netlify.app)

## 설치 및 실행방법

```
$ git clone https://github.com/iziz9/github-issue.git

$ npm install

$ npm run dev
```

---

## 설명

### api 관리

```js
// request.ts
const owner = 'facebook';
const repo = 'react';

const octokit = new Octokit({
	auth: import.meta.env.VITE_ACCESS_TOKEN,
	owner,
	repo,
});

export const getGithubResponse = async ({
	issues = '',
	state = '',
	issueNumber = '',
	sort = '',
	page = 1,
	per_page = 10,
}: RequestArgsType) => {
	const res = await octokit.request(`GET /repos/${owner}/${repo}` + issues + issueNumber, {
		headers: {
			'X-GitHub-Api-Version': '2022-11-28',
		},
		state,
		sort,
		page,
		per_page,
	});
	return res;
};

// 사용 예시
		const requestGetIssueDetail = async () => {
			setIsLoading(true);
			try {
				const { data } = await getGithubResponse({ issues: '/issues', issueNumber: '/' + issueInfo.number });
				console.log(data);
				setIssueData(data);
			} catch (err) {
				alert(err);
			} finally {
				setIsLoading(false);
			}
		};
		requestGetIssueDetail();
```

- 간편한 api 통신을 위해 github에서 제공하는 octokit 라이브러리를 사용하였습니다. 
- 해당 프로젝트에서는 `GET` 메서드만 사용하고, 요청 주소도 종류에 따라 뒷부분만 변경되기 때문에 하나의 request 함수에 옵셔널로 설정된 인자만 바꿔 넣는 방식으로 구현했습니다.


### 데이터 요청 중 로딩 표시

```js
		const requestGetIssueDetail = async () => {
			setIsLoading(true);
			try {
				const { data } = await getGithubResponse({ issues: '/issues', issueNumber: '/' + issueInfo.number });
				console.log(data);
				setIssueData(data);
			} catch (err) {
				alert(err);
			} finally {
				setIsLoading(false);
			}
		};
		requestGetIssueDetail();

.
.

    	return (
		<>
			{isLoading && <Loading />}
      .
      .
    </>
  )
```

- api response를 기다리는 동안 로딩 아이콘을 띄우기 위해 request함수가 실행될 때 로딩중인지를 나타내는 상태를 true로 설정하고, 응답이 돌아오면 (성공이든 실패든) finally 구문에서 false로 변경합니다.
- setIsLoading 상태가 true일 경우 아이콘이 표시됩니다.


### 에러 화면 구현

```js
// router.tsx
const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				path: '/',
				element: <MainPage />,
			},
			{
				path: '/detail/:issueNumber',
				element: <DetailPage />,
			},
		],
	},
]);
```

- 라우터의 errorElement 속성을 이용해 지정되지 않은 path에 접근하거나 통신 오류가 발생했을 때 에러 컴포넌트를 보여줍니다.


### 이슈 아이템 컴포넌트 재사용

```js
const location = useLocation();
const issueInfo = location.state as ResponseIssueDataType;
return (
    <main>
      <TitleSection>
        <div className="profile">
          <img src={issueData.user.avatar_url} alt={'프로필이미지'} />
        </div>
        <IssueItem issue={issueInfo} />
      </TitleSection>
      <ContentSection data-color-mode="light">
        <MDEditor.Markdown style={{ padding: 10 }} source={issueData.body} />
      </ContentSection>
    </main>
)
```

- 이슈 리스트의 아이템(하나의 이슈 정보)과 상세페이지의 타이틀 부분 와이어프레임이 프로필사진이 추가된 것을 제외하고는 동일했기 때문에 재사용하였습니다.
- 재사용 과정에서 이슈 정보에 들어가야 할 데이터는 메인페이지에서 상세페이지로 넘어올 때 useNavigate의 두 번째 인자로 전달한 state를 그대로 사용했습니다.

### 광고 이미지 출력

```js
{issueList.map((issue, index) => (
  <li key={issue.id}>
    <IssueItem issue={issue} />
    {(index + 1) % 4 === 0 && <AdBannder />}
  </li>
))}

```

- api로 받아온 데이터를 반복문으로 IssueItem 컴포넌트로 넣어주며 지정된 인덱스에 해당할 경우 광고 이미지를 출력하도록 작성했습니다.

### 무한스크롤

```js
// 2페이지 이상 불러와지지 않는 문제가 있어 해결중입니다.

```

- 