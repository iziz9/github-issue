import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorPage from './errorPage/ErrorPage.tsx';
import MainPage from './mainPage/MainPage.tsx';
import DetailPage from './detailPage/DetailPage.tsx';

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

export default router;
