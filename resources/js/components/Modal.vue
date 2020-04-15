<template>
<!--    <div class="container">-->
<!--        <div class="row">-->
<!--            <button id="show-modal" @click="showModal = true">Show Modal</button>-->

<!--            <transition name="modal-fade" v-if="showModal" @close="showModal = false">-->
<!--                <div class="modal-backdrop">-->
<!--                    <div class="modal">-->
<!--                        <header class="modal-header">-->
<!--                            <slot name="header">-->
<!--                                This is the default tile!-->

<!--                                <button-->
<!--                                    type="button"-->
<!--                                    class="btn-close"-->
<!--                                    @click="showModal = false"-->
<!--                                >-->
<!--                                    x-->
<!--                                </button>-->
<!--                            </slot>-->
<!--                        </header>-->
<!--                        <section class="modal-body">-->
<!--                            <slot name="body">-->
<!--                                I'm the default body!-->
<!--                            </slot>-->
<!--                        </section>-->
<!--                        <footer class="modal-footer">-->
<!--                            <slot name="footer">-->
<!--                                I'm the default footer!-->

<!--                                <button-->
<!--                                    type="button"-->
<!--                                    class="btn-green"-->
<!--                                    @click="showModal = false"-->
<!--                                >-->
<!--                                    Close me!-->
<!--                                </button>-->
<!--                            </slot>-->
<!--                        </footer>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </transition>-->
<!--        </div>-->
<!--    </div>-->

    <div>
        <button id="show-modal" class="btn btn-light" data-toggle="modal" data-target="#modal" @click="showModal = true">Корзина ({{ $store.state.cartCount }})</button>
        <transition v-if="showModal" @close="showModal = false">
            <div class="modal fade" id="modal">
                <div class="container modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                                <h5 class="modal-title">Корзина:</h5>
                                <button type="button" class="close" data-dismiss="modal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                        </div>
                        <div class="modal-body">
                            <div v-if="$store.state.cart.length > 0" class="navbar-dropdown is-boxed is-right">
                                <h5 class="text-info">Количество товара в корзине:</h5>
                                <div class="col-auto">
                                    <table class="table table-auto">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Наименование</th>
                                                <th scope="col">Количество, шт.</th>
                                                <th scope="col">Цена, за кг.</th>
                                                <th scope="col">Вес, гр.</th>
                                                <th scope="col">Стоимость, руб.</th>
                                            </tr>
                                        </thead>
                                        <tbody v-for="item in $store.state.cart"
                                               :key="item.id">
                                            <tr >
                                                <th scope="row"><span class="removeBtn"
                                                          title="Удалить из корзины"
                                                          @click.prevent="removeFromCart(item)">X</span>
                                                </th>
                                                <td>{{ item.title }}</td>
                                                <td><button class="btn btn-link" v-if="item.quantity > 1" @click="minusFromCart(item)">-</button> {{ item.quantity }} <button class="btn btn-link" @click="addToCart(item)">+</button></td>
                                                <td>{{ item.price }}</td>
                                                <td>{{ item.min_quantity }}</td>
                                                <td>{{ item.totalPrice }}руб</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <br>
                                <div class="col-auto">
                                    <span>
                                        Итого: {{ totalPrice }}руб
                                    </span>
                                </div>
                                <hr class="navbar-divider">
                                <br>
                                <div class="col-auto">
                                    <form method="post" action="send-mail">
                                        <label for="user_name" >Ваше имя:</label><br>
                                        <input name="user_name" id="user_name" type="text" required v-model="user_name"><br>
                                        <label for="user_phone">Номер телефона:</label><br>
                                        <input name="user_phone" id="user_phone" type="text" value="+7" required v-model="user_phone"><br>
                                        <label for="user_address">Адрес доставки:</label><br>
                                        <textarea name="user_address" id="user_address" cols="30" rows="3" v-model="user_address">{{ user_address }}</textarea><br>
                                        <label for="user_comment">Комментарий (необязательно):</label><br>
                                        <textarea name="user_comment" id="user_comment" cols="30" rows="3" v-model="user_comment">{{ user_comment }}</textarea><br>
                                        <br>
                                        <input name="cartItems" id="cart_items" type="text" hidden :value="cartItems">
                                        <input type="hidden" name="_token" :value="csrf">
                                        <input type="submit" class="btn btn-outline-success" value="Оформить заказ">
                                    </form>
                                </div>
                            </div>
                            <div v-else class="navbar-dropdown is-boxed is-right">
                                <p class="navbar-item">Корзина пуста</p>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" data-dismiss="modal" class="btn btn-outline-danger btn-block" @click="showModal = false">Закрыть</button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showModal: false,
                cartItems: this.$store.state.cart,
                user_name: this.user_name,
                user_phone: this.user_phone,
                user_address: this.user_address,
                user_comment: this.user_comment,
                csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            }
        },
        computed: {
            totalPrice() {
                let total = 0;

                for (let item of this.$store.state.cart) {
                    total += item.totalPrice;
                }

                return total;
            },
        },
        methods: {
            removeFromCart(item) {
                this.$store.commit('removeFromCart', item);
            },
            addToCart(item) {
                this.$store.commit('addToCart', item);
            },
            minusFromCart(item) {
                this.$store.commit('minusFromCart', item);
            }
        }
    };
</script>

<style>
    .removeBtn {
        cursor: pointer;
        font-weight: bold;
    }

    @media(max-width: 600px) {
        table {
            font-size: 10px;
        }
    }
</style>
