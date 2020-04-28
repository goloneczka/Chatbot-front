<template>
    <div class="jokes-component">

    </div>
</template>

<script>
    export default {
        name: "Jokes",
        created() {
            this.$emit('addMessage', {author: "user", text: this.$t('jokes.user.choiceJokes'), style: "default"});
        }
    }
</script>

<style scoped>

</style>
