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
                this.$nextTick(() => {
                    window.scrollBy({top: document.body.scrollHeight, behavior: 'smooth'});
                })
            }
        },
        mounted() {
            const style = getComputedStyle(document.documentElement)
            this.$root.$on('messageAnimate', (author, resolve) => {
                const t = author === 'bot' ? style.getPropertyValue('--chat-box-animate-long-delay')
                    : style.getPropertyValue('--chat-box-animate-short-delay');
                this.loading = true;
                this.scrollDown();
                setTimeout(() => {
                    this.loading = false
                    resolve()
                    this.scrollDown();
                }, parseInt(t))
            });
        }
    }
</script>

<style scoped >

</style>
