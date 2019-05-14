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
    async addItemAsync(payload, rootState) {
      let headers = {
        'Content-Type': 'application/json',
      }
      let data = {
        "data": {
          "type": "cart_item",
          "id": payload,
          "quantity": 1
        }
      }
      const res = await request.post('/carts/123456/items', data, { headers: headers });
      console.log(res.data);
      dispatch.cart.getCartItemsAsync()
    },
    async deleteItemAsync(payload, rootState) {
      console.log(payload);
      const res = await request.delete('carts/123456/items/' + payload);
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
    async checkoutAsync(payload, rootState) {
      let headers = {
        'Content-Type': 'application/json',
      }
      let data = {
        "data": {
          "customer": {
            "email": payload.email,
            "name": payload.name
          },
          "billing_address": {
            "first_name": payload.first_name,
            "last_name": payload.last_name,
            "company_name": payload.company_name,
            "line_1": payload.line_1,
            "line_2": payload.line_2,
            "city": payload.city,
            "postcode": payload.postcode,
            "county": payload.county,
            "country": payload.country
          },
          "shipping_address": {
            "first_name": payload.first_name,
            "last_name": payload.last_name,
            "company_name": payload.company_name,
            "phone_number": payload.phone_number,
            "line_1": payload.line_1,
            "line_2": payload.line_2,
            "city": payload.city,
            "postcode": payload.postcode,
            "county": payload.county,
            "country": payload.country,
            "instructions": payload.instructions,
          }
        }
      }
      const res = await request.post('/carts/123456/checkout', data, { headers: headers });
      console.log(res.data);
    },
  })
}