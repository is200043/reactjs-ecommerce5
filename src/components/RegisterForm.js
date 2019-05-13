import React, { Component } from 'react'
import { Box, TextInput, Button } from 'grommet'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class RegisterForm extends Component {
    state = {
        name: "",
        username: "",
        password: ""
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleRegister = async () => {
        const {
            register
        } = this.props;
        try {
            await register(this.state);
            alert("Register Success");
            this.props.history.push('/login')
        } catch (error) {
            console.log(error)
            alert("Register Fail");
        }
    }
    render() {
        return (
            <Box width="medium"
                justify='between'>
                <Box direction="row" margin="xxsmall">
                    <TextInput
                        name="name"
                        placeholder="Name"
                        onChange={this.handleChange} />
                </Box>
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
                <Button label="Submit" primary onClick={this.handleRegister} />
            </Box>
        )
    }
}
const mapStateToProps = state => {
}
const mapDispatchToProps = dispatch => {
    return {
        register: dispatch.user.register
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegisterForm))
