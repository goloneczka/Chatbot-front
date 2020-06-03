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
                color: '#fff',
                size: '7px',
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
                setTimeout(() => {
                    this.loading = false
                    resolve()
                }, 2000)
            });
            this.$root.$on('scrollAnimate', () => {
                this.scrollDown();
            })
        }
    }
</script>

<style scoped >

</style>
