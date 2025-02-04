Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
            <img :alt="altText" :src="image">
        </div>

        <div class="product-info">
            <h1>{{ title }}</h1>
            <p>{{ description }}</p>
            <a :href="link">More products like this.</a>
            <p v-if="inventory > 10, inStock">In Stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0, inStock">Almost sold out!</p>
            <p v-else
               :class="{OutOfStock: !inStock}"
            >
                Out of Stock
            </p>
            <span v-show="onSale">On Sale!</span>
            <ul>{{product-details}}</ul>
            <div class="color-box"
                 v-for="(variant, index) in variants"
                 :key="variant.variantId"
                 :style="{ backgroundColor:variant.variantColor }"
                 @mouseover="updateProduct(index)">
            </div>
            <ul>
                <li v-for="size in sizes">{{size}}</li>
            </ul>
            <div class="cart">
                <p>Cart({{ cart }})</p>
            </div>
            <button
                    v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }"
            >
                Add to cart
            </button>
            <button v-on:click="deleteOnCart" v-if="cart > 0">Delete on cart</button>
            <p>Shipping: {{ shipping }}</p>
        </div>
    </div>
 `,
    data() {
        return {
            product: "Socks",
            brand: "Vue Mastery",
            description: "A pair of warm, fuzzy socks.",
            selectedVariant: 0,
            altText: "A pair jf socks",
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            inventory: 100,
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10,
                    variantSale: true,
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0,
                    variantSale: false,
                }
            ],

            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            cart: 0,
        }
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },
        deleteOnCart() {
            this.cart -= 1
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        onSale() {
            return this.variants[this.selectedVariant].variantSale;
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return "2.99$"
            }
        }

    }
})

Vue.component('product-details', {
    template: `
    <ul>
        <li v-for="detail in details">{{detail}}</li>
    </ul>
    `,
    data() {
        return {
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        };
    }
    }
    )

let app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
})


