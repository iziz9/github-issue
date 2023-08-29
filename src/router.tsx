import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorPage from './errorPage/ErrorPage';
import MainPage from './mainPage/MainPage';
import DetailPage from './detailPage/DetailPage';
import { Suspense } from 'react';
import Spinner from './common/Spinner';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, path: '/', element: <MainPage /> },
			{
				path: '/detail/:issueId',
				element: (
					<Suspense fallback={<Spinner />}>
						<DetailPage />
					</Suspense>
				),
			},
		],
	},
]);

export default router;
