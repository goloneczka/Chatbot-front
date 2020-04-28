<template>
    <div class="categories-chooser">
        <b-button class="category-button" v-for="(category, index) in categories" v-bind:key="index"
                  v-on:click="chooseCategory(category.eventName)">
            {{category.categoryName}}
        </b-button>
    </div>
</template>

<script>

    export default {
        name: "CategoriesChooser",
        data: function () {
            return {
                categories: [
                    {
                        categoryName: this.$t('bot.categoryWeather'),
                        eventName: 'weather'
                    },
                    {
                        categoryName: this.$t('bot.categoryJokes'),
                        eventName: 'jokes'
                    }
                ]
            }
        },
        methods: {
            chooseCategory: function (category) {
                this.activeChatBox();
                this.$root.$emit('activeCategory', category);
            },
            activeChatBox: function () {
                this.$emit('activeChatBox')
            }
        }
    }
</script>

<style scoped>
    .categories-chooser {
        margin-bottom: 20px;
        text-align: center;
    }

    .category-button {
        margin-left: 20px;
        margin-right: 20px;
        margin-bottom: 10px;
        font-size: 25px;
        width: 200px;
    }


</style>
