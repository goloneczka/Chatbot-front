<template>
  <div class="joke-item">
        <div class="media">
            <div class="media-body">
                <p><small>{{joke.category}}</small>
                <p>{{joke.content}}</p>
                <div class="float-right">
                    <button type="button" class="btn btn-primary btn-small mr-1" v-on:click="editJoke">{{ $t('adminJokes.buttonEditJoke') }}</button>
                    <button type="button" class="btn btn-danger btn-small " v-on:click="removeJoke">{{ $t('adminJokes.buttonDeleteJoke') }}</button>
                </div>
               
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'joke-item',
        props: {
            joke: Object
        },
        methods: {
            editJoke() {
                this.$emit('editJoke', this.joke.id);
            },
            removeJoke() {
                this.$emit('removeJoke', this.joke.id);
            }
        }
    }
</script>
<style scoped>
    .joke-item {
        background-color: var(--admin-joke-item-bg-color);
        color: var(--admin-joke-item-color);
        box-shadow: var(--admin-joke-item-box-shadow);
        padding: var(--admin-joke-item-padding);
        margin-top: var(--admin-joke-margin-top);
    }
    .joke-item small {
      font-size: var(--admin-joke-item-small-font-size);
      color: var(--admin-joke-item-small-color);
    }
</style>
