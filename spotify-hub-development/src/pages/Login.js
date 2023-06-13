import { Loging, login } from '../components/Authentication/AuthService';

const LoginPage = () => {
    const handleLogin = () => {
        login();
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Log in with Spotify</button>
        </div>
    );
};

export default LoginPage;
