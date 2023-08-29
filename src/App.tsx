import { Outlet } from 'react-router-dom';
import Header from './common/Header';

function App() {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
}

export default App;
