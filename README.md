# 2주차 개인과제
## 배포 링크

[배포 링크]()

## 설치 및 실행방법

```
$ git clone https://github.com/iziz9/pre-onboarding-week2

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
// todoItem 컴포넌트
 const [content, setContent] = useState('')
  const [isModifying, setIsModifying] = useState(false)

  useEffect(() => {
    setContent(itemData.todo || '')
  }, [itemData])

  const handleContentUpdate = async () => {
    await requestUpdateTodo({
      id: itemData.id,
      todo: content,
      userId: itemData.userId,
      isCompleted: itemData.isCompleted,
    })
    setIsModifying(false)
    await getTodoData()
  }

  const handleDelete = async () => {
    await requestDeleteTodo(itemData.id)
    await getTodoData()
  }

  const handleCheckComplete = async (e) => {
    await requestUpdateTodo({
      id: itemData.id,
      todo: content,
      userId: itemData.userId,
      isCompleted: e.target.checked,
    })
    await getTodoData()
  }

  return ( ...)

```

- Todo 페이지 / Todo list / Todo Item 컴포넌트로 구성되어 있습니다.
- 1. Todo 페이지 컴포넌트에서는 get api로 저장된 전체 리스트를 받고, 새로운 할 일을 추가할 수 있습니다.
- 2. Todo list 컴포넌트에서는 할 일 목록이 존재할 경우 todoItem 컴포넌트의 props로 각각의 할 일을 전달해줍니다.
- 3. Todo Item 컴포넌트에서는 전달받은 하나의 할 일 내용을 출력하고, 수정/삭제할 수 있습니다.
- 4. 할 일을 수정, 삭제한 후 화면에 변경된 상태를 반영하기 위해 api로 할일 목록을 다시 불러옵니다.

### 라우터 설정

```js
// private route - 1 (로그인 완료 상태)
export const MembersRoute = ({ children }) => {
  if (!localStorage.getItem('accessToken')) {
    alert('로그인 후 이용 가능합니다.')
    return <Navigate to="/signin" replace={true} />
  }
  return children
}
// private route - 2 (로그인 하지 않은 상태)
export const NonMembersRoute = ({ children }) => {
  if (localStorage.getItem('accessToken')) {
    return <Navigate to="/todo" replace={true} />
  }
  return children
}

// 라우터 설정
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, path: '/', element: <Main /> },
      {
        path: '/signin',
        element: (
          <NonMembersRoute>
            <SignIn />
          </NonMembersRoute>
        ),
      },
      {
        path: '/signup',
        element: (
          <NonMembersRoute>
            <SignUp />
          </NonMembersRoute>
        ),
      },
      {
        path: '/todo',
        element: (
          <MembersRoute>
            <Todo />
          </MembersRoute>
        ),
      },
    ],
  },
])
```

- 지정 조건 충족시에만 경로에 접근할 수 있도록 private route 를 만들어 요소를 감싸주었습니다.
- 이번 과제에서 로그인/비로그인 사용자 양 쪽이 모두 접근할 수 있는 경로는 '/' 뿐이었기 때문에, 페이지별 접근 가능한 사용자를 router.js파일에서 바로 유추할 수 있도록 private route를 로그인 상태에 따라 두개로 나눴습니다. (Members, NonMembers)

### fetch

```js
// fetch instance
const fetchInstance = async ({ path, method, data = '', auth = '', id = '' }) => {
  try {
    const res = await fetch(baseURL + path + id, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth,
      },
      body: data || null,
    })

    if (method === 'DELETE' && res.status === 204) {
      return 204
    }

    if (!res.ok) {
      const failResult = await res.json()
      alert(failResult.message)
      return false
    }

    if (method === 'GET' || path === '/auth/signin') {
      return await res.json()
    }

    return true
  } catch (err) {
    alert('에러가 발생했습니다. 잠시 후 다시 시도해주세요.')
  }
}

// request
export const requestUpdateTodo = async ({ id, todo, isCompleted }) => {
  const auth = 'Bearer ' + localStorage.getItem('accessToken')
  const res = await fetchInstance({
    path: '/todos/',
    id,
    method: 'PUT',
    data: JSON.stringify({ todo, isCompleted }),
    auth,
  })

  res && alert('할 일 수정이 완료되었습니다.')
  return res
}
```

- request.js 파일에 fetch instance를 만들어 api호출 시 실행할 기본 동작들을 지정하고, crud 기능별로 나눈 request 함수에서 instance를 호출하여 그 결과에 따라 에러 발생을 알리거나 값을 리턴합니다.
