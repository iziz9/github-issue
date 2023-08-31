import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorPage from './error/ErrorPage';
import MainPage from './main/MainPage';
import DetailPage from './detail/DetailPage';

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
