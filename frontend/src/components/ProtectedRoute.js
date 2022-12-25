import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, ...props }) => {
	return <>{props.authorize.loggedIn ? <Component {...props} /> : <Navigate to='/sign-in' />}</>;
};
