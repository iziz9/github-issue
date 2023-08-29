import ReactDOM from 'react-dom/client';
import GlobalStyles from './globalStyles.ts';
import { RouterProvider } from 'react-router-dom';
import router from './router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<>
		<GlobalStyles />
		<RouterProvider router={router} />
	</>,
);
