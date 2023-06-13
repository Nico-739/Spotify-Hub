import { login } from '../components/Authentication/AuthService';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
    const history = useHistory();

    const handleLogin = () => {
        login();
        history.push('/hub');
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Log in with Spotify</button>
        </div>
    );
};

export default LoginPage;
