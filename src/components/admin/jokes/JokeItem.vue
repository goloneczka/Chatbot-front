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
        background-color: #fff;
        color: #373737;
        box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
        padding: 30px;
        margin-top: 20px;
    }
    .joke-item small {
      font-size: 14px;
      color: #657786;
    }
</style>
