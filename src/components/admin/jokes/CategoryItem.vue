<template>
    <div class="category-item">
        <div class="media">
            <div class="media-body">
                <h5 class="mt-0">{{category.category}}</h5>
                <div class="float-right">
                    <button type="button" class="btn btn-success btn-small mr-1" v-on:click="showJokesForCategory">{{ $t('adminJokes.buttonGoToCategory') }}</button>
                    <button type="button" class="btn btn-primary btn-small mr-1" v-on:click="editCategory">{{ $t('adminJokes.buttonEditCategory') }}</button>
                    <button type="button" class="btn btn-danger btn-small mr-1" v-on:click="removeCategory">{{ $t('adminJokes.buttonDeleteCategory') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'category-item',
        props: {
            category: Object
        },
        methods: {
            removeCategory(){
                this.$emit('removeCategory', this.category);
            },
            editCategory() {
                this.$emit('editCategory', this.category);
            },
            showJokesForCategory() {
                this.$emit('showJokesForCategory', this.category);
            },
        }
    }
</script>
<style scoped>
    .category-item {
        background-color: var(--admin-joke-item-bg-color);
        color: var(--admin-joke-item-color);
        box-shadow: var(--admin-joke-item-box-shadow);
        padding: var(--admin-joke-item-padding);
        margin-top: var(--admin-joke-margin-top);
    }
</style>
