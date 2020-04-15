<template>
    <div class="navbar-item has-dropdown is-hoverable">

        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="">Корзина</a>
                            <modal></modal>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        computed: {
            totalPrice() {
                let total = 0;

                for (let item of this.$store.state.cart) {
                    total += item.totalPrice;
                }

                return total;
            }
        },
        methods: {
            removeFromCart(item) {
                this.$store.commit('removeFromCart', item);
            }
        }
    }
</script>

<style>
    .removeBtn {
        margin-right: 1rem;
        color: red;
    }
</style>
