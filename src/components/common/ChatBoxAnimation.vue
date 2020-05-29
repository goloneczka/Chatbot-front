<template>
    <pulse-loader :loading="loading" :size="size" :color="color"/>
</template>

<script>


    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

    export default {
        name: "ChatBoxAnimation",
        components: {
            PulseLoader
        },
        data: function () {
            return {
                color: '#000',
                size: '8px',
                loading: false
            }
        },
        methods: {
            scrollDown: function () {
                window.scrollBy({top: document.body.scrollHeight, behavior: 'smooth'});
            }
        },
        mounted() {
            this.$root.$on('botAnimate', (resolve) => {
                this.loading = true;
                this.scrollDown();
                console.log("Hello!1")
                setTimeout(() => {
                    this.loading = false
                    console.log("Hello!2")
                    resolve()
                }, 2000)
            });
            this.$root.$on('scrollAnimate', () => {
                this.scrollDown();
            })
        }
    }
</script>

<style>


    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        word-break: break-word;
    }

    li > div {
        padding: 10px;
        margin-bottom: 20px;
        background: var(--chat-box-mesaage-bg-color);
        color: white;
        display: inline-flex;
        border: var(--chat-box-meassage-border);
    }


    .bot div {
        border-radius: 20px 20px 20px 0;
    }


    .user div {
        border-radius: 20px 20px 0 20px;
    }


    button {
        background: var(--chat-box-category-button-bg-color);
        color: var(--chat-box-category-button-text-color);
    }

    button:hover {
        text-shadow: var(--chat-box-category-button-hover-text-shadow);
        background: var(--chat-box-category-button-hover-bg-color);
        box-shadow: var(--chat-box-category-button-hover-box-shadow);
    }

</style>
