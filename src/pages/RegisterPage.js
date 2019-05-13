import React, { Component } from 'react'
import RegisterForm from '../components/RegisterForm';
import { Box } from 'grommet'

class RegisterPage extends Component {
  render() {
    return (
      <Box align='center'
        justify='between'
        pad={{
          left: 'medium',
          right: 'medium',
          vertical: 'small'
        }}>
        <RegisterForm />
      </Box>
    )
  }
}
export default RegisterPage