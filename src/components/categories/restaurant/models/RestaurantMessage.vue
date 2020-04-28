<template>
    <div>
        <ul>
            <li class="message">
                <div>
                    <a>
                        <h3>{{this.name}}</h3>
                        <h5>{{this.address}}</h5>
                    </a>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>



    export default {
        name: 'RestaurantMessage',
        props: ['data'],
        components: {},
        data() {
            return {
                name: '',
                address: '',
            }
        },
        mounted() {
            this.name = this.data.name;
            this.address = this.data.address;
        },
        methods: {
        },

    }
</script>
<style scoped>
    .message > div {
        border-radius: var(--chat-box-message-bot-border-radius);
        width: auto;
        text-align: center;
    }
</style>
