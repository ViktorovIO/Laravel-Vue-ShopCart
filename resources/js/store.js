let cart = window.localStorage.getItem('cart');
let cartCount = window.localStorage.getItem('cartCount');

let store = {
    state: {
        cart: cart ? JSON.parse(cart) : [],
        cartCount: cartCount ? parseInt(cartCount) : 0,
    },

    mutations: {
        addToCart(state, item) {
            let found = state.cart.find(product => product.id == item.id);

            if(found) {
                found.quantity++;
                found.totalPrice = found.quantity * (found.price / 1000 * found.min_quantity);
            } else {
                state.cart.push(item);

                Vue.set(item, 'quantity', 1);
                Vue.set(item, 'totalPrice', item.price);
            }
            state.cartCount++;
            this.commit('saveCart');
        },
        minusFromCart(state, item) {
            let found = state.cart.find(product => product.id == item.id);

            if(found) {
                if(found.quantity > 1) {
                    found.quantity--;
                    found.totalPrice = found.quantity * (found.price / 1000 * found.min_quantity);
                }
            } else {
                state.cart.push(item);

                Vue.set(item, 'quantity', 1);
                Vue.set(item, 'totalPrice', item.price);
            }
            state.cartCount--;
            this.commit('saveCart');
        },
        removeFromCart(state, item) {
            let index = state.cart.indexOf(item);

            if(index > -1) {
                let product = state.cart[index];
                state.cartCount -= product.quantity;

                state.cart.splice(index, 1);
            }
            this.commit('saveCart');
        },
        saveCart(state) {
            window.localStorage.setItem('cart', JSON.stringify(state.cart));
            window.localStorage.setItem('cartCount', state.cartCount);
        },
        sendOrder: function(cart) {
            axios({
                method: 'post',
                url: 'http://localhost/handler/',
                data: {
                    id: cart.id,
                    title: cart.title,
                    quantity: cart.quantity,
                    price: cart.price,
                    min_quantity: cart.min_quantity,
                    totalPrice: cart.totalPrice,
                    cart: store.state.cart
                }
                    .then((response) => {
                        this.response.data;
                    })
                    .catch(error => {
                        console.log('ЭТО ФИАСКО, БРАТАН!');
                        console.log(error);
                        this.errored = true;
                    })
            })
        }
    }
};

export default store;
