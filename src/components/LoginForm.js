import React, { Component } from 'react'
import { Box, TextInput, Button } from 'grommet'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class LoginForm extends Component {
    state = {
        username: "",
        password: ""
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleLogin = async () => {
        const {
            login
        } = this.props;
        try {
            await login(this.state);
            alert("Login Success");
            this.props.history.push('/profile')
        } catch (error) {
            alert("Login Fail");
        }
    }
    render() {
        return (
            <Box width="medium"
                justify='between'>
                <Box direction="row" margin="xxsmall">
                    <TextInput
                        name="username"
                        placeholder="Username"
                        onChange={this.handleChange} />
                </Box>
                <Box direction="row" margin="xxsmall">
                    <TextInput
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={this.handleChange} />
                </Box>
                <Button label="Sign in" primary onClick={this.handleLogin} />
                <Box direction="row" margin="xxsmall">
                    <Button primary
                        pad="xxsmall"
                        margin="xxsmall"
                        label="Register"
                        onClick={() => this.props.history.push('/register')} />
                </Box>
            </Box>
        )
    }
}
const mapStateToProps = state => {
}
const mapDispatchToProps = dispatch => {
    return {
        login: dispatch.user.login
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm))
