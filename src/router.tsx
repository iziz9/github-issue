import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorPage from './ErrorPage/ErrorPage';
import MainPage from './MainPage/MainPage';
import DetailPage from './DetailPage/DetailPage';

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
