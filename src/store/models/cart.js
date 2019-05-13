import request from '../../utils/request'

export const cart = {
  state: {
    cartItems: [
      // {
      //   productId: 1,
      //   amount: 2
      // }
    ],
    totalPrice: 0
  },
  reducers: {
    setCartItems(state, payload) {
      return {
        ...state,
        cartItems: payload
      }
    },
    setTotalPrice(state, payload) {
      return {
        ...state,
        totalPrice: payload
      }
    }
  },
  effects: (dispatch) => ({
    async addItemAsync(id) {
      let headers = {
        'Content-Type': 'application/json',
      }
      let data = {
        "data": {
          "type": "cart_item",
          "id": id,
          "quantity": 1
        }
      }
      const res = await request.post('/carts/123456/items', data, { headers: headers });
      console.log(res.data);
      dispatch.cart.getCartItemsAsync()
    },
    async deleteItemAsync(id) {
      console.log(id);
      const res = await request.delete('carts/123456/items/' + id);
      console.log(res.data);
      dispatch.cart.getCartItemsAsync()
    },
    async getCartItemsAsync() {
      const res = await request.get('/carts/123456/items?include=product')
      console.log(res.data);
      const cleanData = res.data.data.map((item) => {
        return {
          id: item.id,
          productId: item.product_id,
          quantity: item.quantity,
          amount: item.meta.display_price.with_tax.unit.formatted,
          name: item.name,
          image: item.image.href,
          totalPrice: item.meta.display_price.with_tax.value.formatted,
          pricePerUnit: item.meta.display_price.with_tax.unit.formatted
        }
      })
      const totalPrice = res.data.meta.display_price.with_tax.amount / 100
      dispatch.cart.setCartItems(cleanData)
      dispatch.cart.setTotalPrice(totalPrice)
    },
    async checkoutAsync(state) {
      let headers = {
        'Content-Type': 'application/json',
      }
      let data = {
        "data": {
          "customer": {
            "email": state.email,
            "name": state.first_name + ' ' + state.last_name
          },
          "billing_address": {
            "first_name": state.first_name,
            "last_name": state.last_name,
            "company_name": state.company_name,
            "line_1": state.line_1,
            "line_2": state.line_2,
            "city": state.city,
            "postcode": state.postcode,
            "county": state.county,
            "country": state.country
          },
          "shipping_address": {
            "first_name": state.first_name,
            "last_name": state.last_name,
            "company_name": state.company_name,
            "phone_number": state.phone_number,
            "line_1": state.line_1,
            "line_2": state.line_2,
            "city": state.city,
            "postcode": state.postcode,
            "county": state.county,
            "country": state.country,
            "instructions": state.instructions,
          }
        }
      }
      const res = await request.post('/carts/123456/checkout', data, { headers: headers });
      console.log(res.data);
    },
  })
}