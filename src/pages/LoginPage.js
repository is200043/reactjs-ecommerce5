import React, { Component } from 'react'
import LoginForm from '../components/LoginForm';
import { Box } from 'grommet'

class LoginPage extends Component {
  render() {
    return (
      <Box align='center'
        justify='between'
        pad={{
          left: 'medium',
          right: 'medium',
          vertical: 'small'
        }}>
        <LoginForm />
      </Box>
    )
  }
}
export default LoginPage