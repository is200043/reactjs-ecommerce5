/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import {
    Box,
    Image,
    Heading,
    Text
} from 'grommet'
import CheckoutForm from '../components/CheckoutForm';

class CheckoutPage extends Component {
    componentDidMount() {
        this.props.getCartItems();
    }
    onSubmit = async (values) => {
        const { history, checkout } = this.props;
        // console.log('v', values);
        const ans = confirm('Are you sure ?');
        if (ans) {
            this.setState({ showModal: true });
            await checkout(values);
            // history.push('/payment');
        }
    }
    render() {
        const {
            cartItems
        } = this.props
        return (
            <Box direction="row" pad="small">
                <Box width="medium">
                    {
                        cartItems.map((product) => (
                            <Box
                                direction="row"
                                basis="medium"
                                pad="small"
                            >
                                <Box>
                                    <Box>
                                        <Box height="small">
                                            <Image fit="cover" src={product.image} />
                                        </Box>
                                    </Box>
                                    <Box align="center">
                                        <Heading textAlign="center" level={4} margin={{ vertical: 'xsmall' }}>
                                            {product.name}
                                        </Heading>
                                        <Text textAlign="center">
                                            {product.quantity} x {product.amount} = {product.totalPrice}
                                        </Text>
                                    </Box>
                                </Box>
                            </Box>
                        ))
                    }
                </Box>
                <Box flex>
                    <CheckoutForm onSubmit={this.onSubmit} />
                </Box>
            </Box>
        );
    }
}

const mapStateToProps = state => {
    return {
        cartItems: state.cart.cartItems
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCartItems: dispatch.cart.getCartItemsAsync,
        checkout: dispatch.cart.checkoutAsync
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(CheckoutPage));