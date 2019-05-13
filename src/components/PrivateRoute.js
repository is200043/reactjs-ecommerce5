import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import store from '../store';

class PrivateRoute extends Component {
    render() {
        const {
            isAuthenticated,
            component: MyComponent,
            ...rest
        } = this.props;
        return (
            <Route {...rest} render={(props) => isAuthenticated ? <MyComponent {...props} /> : <Redirect to="/login" />} />
        )
    }
}
const mapStateToProps = state => {
    const isAuthenticated = store.select.user.isAuthenticated
    return {
      isAuthenticated: isAuthenticated(state)
    }
}
export default connect(mapStateToProps)(PrivateRoute)