export const state = () => ({
  // State
  cart: [],
  cartLength: 0
});

export const actions = {
  addProductToCart({ state, commit }, product) {
    const cartProduct = state.cart.find((prod) => prod._id === product._id);

    if (!cartProduct) {
      commit('pushProductToCart', product);
    } else {
      commit('incrementProductQty', cartProduct);
    }

    commit('incrementCartLength');
  }
};

export const mutations = {
  pushProductToCart(state, product) {
    product.quantity = 1;
    state.cart.push(product);
  },

  incrementProductQty(state, product) {
    product.quantity++;
    const productIndex = state.cart.indexOf(product);
    state.cart.splice(productIndex, 1, product);
  },

  incrementCartLength(state) {
    let cartLength = 0;

    if (state.cart.length > 0) {
      state.cart.map((product) => {
        cartLength += product.quantity;
      });
    }

    state.cartLength = cartLength;
  },

  /**
   * 1. Find the product in the cart
   * 2. Change the quantity of the product
   * 3. Update the length of the cart
   * 4. Replace the old product with the updated product
   **/
  changeQty(state, { product, qty }) {
    let cartLength = 0;
    const cartProduct = state.cart.find((prod) => prod._id === product._id);
    cartProduct.quantity = qty;

    if (state.cart.length > 0) {
      state.cart.map((product) => {
        cartLength += product.quantity;
      });
    }

    const productIndex = state.cart.indexOf(cartProduct);
    state.cart.splice(productIndex, 1, cartProduct);
    state.cartLength = cartLength;
  },

  /**
   * 1. Remove the product quantity from the cartLength
   * 2. Get the index of the product that we want to delete
   * 3. Remove that product by using splice
   **/
  removeProduct(state, product) {
    state.cartLength -= product.quantity;
    const indexOfProduct = state.cart.indexOf(product);
    state.cart.splice(indexOfProduct, 1);
  }
};

export const getters = {
  getCartLength(state) {
    return state.cartLength;
  },
  getCart(state) {
    return state.cart;
  },
  getCartTotalPrice(state) {
    let total = 0;

    state.cart.forEach((product) => {
      total += product.price * product.quantity;
    });

    return total;
  }
};
