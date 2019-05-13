import React, { Component } from 'react';
import { Box, TextInput } from 'grommet';
import ProductList from '../components/ProductList';
import { connect } from 'react-redux';

class ProductListPage extends Component {
  componentDidMount() {
    this.props.getCartItems();
  }
  state = {
    query: ''
  }
  render() {
    return (
      <Box
        direction="row"
        pad="medium"
        fill
      >
        <Box width="medium">
          <TextInput onChange={(e) => this.setState({ query: e.target.value })} />
        </Box>
        <Box flex>
          <ProductList search={this.state.query} />
        </Box>
      </Box >
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
    getCartItems: dispatch.cart.getCartItemsAsync
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);