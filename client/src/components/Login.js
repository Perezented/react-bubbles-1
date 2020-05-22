// make a post request to retrieve a token from the api
// when you have handled the token, navigate to the BubblePage route
import React from 'react';
import { authenticatedAxios } from '../utils/authenticatedAxios';

class Login extends React.Component {
    state = {
        credentials: {
            username: '',
            password: '',
        },
    };

    handleChange = (e) => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value,
            },
        });
    };

    login = (e) => {
        e.preventDefault();
        authenticatedAxios()
            .post('/api/login', this.state.credentials)
            .then((res) => {
                // res.data.payload
                localStorage.setItem('token', res.data.payload);
                this.props.history.push('/dashboard');
            })
            .catch((err) => console.log(err));
    };

    render() {
        return (
            <div>
                <br />
                <form onSubmit={this.login}>
                    <input
                        type="text"
                        name="username"
                        value={this.state.credentials.username}
                        onChange={this.handleChange}
                        placeholder={'User Name'}
                    />
                    <input
                        type="password"
                        name="password"
                        value={this.state.credentials.password}
                        onChange={this.handleChange}
                        placeholder={'Password'}
                    />
                    <button>Log in</button>
                </form>
            </div>
        );
    }
}

export default Login;
