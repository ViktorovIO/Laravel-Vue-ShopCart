<template>
    <div class="row mix-it-up-content">
        <div class="card col-12 col-sm-4 col-md-4 col-lg-3 p-sm-0 mb-5 mix biscuit" v-for="item in items" :key="item.id">
            <img class="card-img-top" :src="'http://localhost/storage/' + item.image" :alt="item.title">
            <div class="card-body">
                <h5 class="card-title" style="font-weight: bold" v-text="item.title"></h5>
                <p class="card-text" v-text="item.description"></p>
            </div>
            <div class="card-footer text-center">
                <button class="btn btn-outline-success btn-block"
                         @click="addToCart(item)">Добавить в корзину</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    axios.get('http://localhost/list/')
                        .then((response) => {
                                this.items = response.data.items;
                            }
                        )
                ]
            };
        },
        methods: {
            addToCart(item) {
                this.$store.commit('addToCart', item);
            }
        }
    }
</script>
