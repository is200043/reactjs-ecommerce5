import React, { Component } from 'react';
import { Box, Button } from 'grommet';
import { connect } from 'react-redux';
import { Close } from 'grommet-icons';

class CartItemList extends Component {
  handleDeleteToCart = (id) => {
      console.log('Delete to cart')
      const {
          deleteItemAsync
      } = this.props;
      deleteItemAsync(id);
  }
  render() {
    const {
      cartItems,
    } = this.props
    return (
      <Box pad="small">
        {
          cartItems.map((product) => (
            <Box style={{ width: 350 }} pad="small" border="bottom" >
            <Box direction="row" >
                <Box pad="small">
                    {product.name} <br/>
                    {product.quantity} x {product.amount} = {product.totalPrice}
                </Box>
                <Button
                    icon={<Close />}
                    pad="small"
                    onClick={(e) => this.handleDeleteToCart(product.id)}></Button>
            </Box>
        </Box>
          ))
        }
      </Box>
    )
  }
}
const mapStateToProps = state => {
  return {
    cartItems: state.cart.cartItems
  }
}
const mapDispatchToProps = dispatch => {
  return {
      deleteItemAsync: dispatch.cart.deleteItemAsync
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartItemList)