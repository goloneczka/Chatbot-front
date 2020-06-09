<template>
    <div class="categories-chooser">
        <b-button class="category-button" v-bind:class="themeService.getActiveTheme().themeName"
                  v-for="(category, index) in categories" v-bind:key="index"
                  v-on:click="chooseCategory(category.eventName)">
            {{category.categoryName}}
        </b-button>
    </div>
</template>

<script>
    import {themeService} from "../../App";

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
                    },
                    {
                        categoryName: this.$t('bot.categoryRestaurants'),
                        eventName: 'restaurant'
                    }
                ],
                themeService
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

    button {
        border-radius: 1.0rem;
    }

    button.light {
        background: var(--category-button-light-theme-bg-color) !important;
        color: var(--category-button-light-theme-text-color) !important;
        border: var(--button-border-style) var(--category-button-light-theme-border-color) !important;
    }

    button.light:hover {
        background: var(--category-button-hover-light-theme-bg-color) !important;
        color: var(--category-button-hover-light-theme-text-color) !important;
        border: var(--button-border-style) var(--category-button-hover-light-theme-border-color) !important;
    }

    button.light:active {
        background: var(--category-button-active-light-theme-bg-color) !important;
        color: var(--category-button-active-light-theme-text-color) !important;
        border: var(--button-border-style) var(--category-button-active-light-theme-border-color) !important;
        box-shadow: none !important;

    }

    button.light:focus {
        background: var(--category-button-active-light-theme-bg-color) !important;
        color: var(--category-button-active-light-theme-text-color) !important;
        border: var(--button-border-style) var(--category-button-active-light-theme-border-color) !important;
        box-shadow: none !important;
    }

    button.dark {
        background: var(--category-button-dark-theme-bg-color) !important;
        color: var(--category-button-dark-theme-text-color) !important;
        border: var(--button-border-style) var(--category-button-dark-theme-border-color) !important;
    }

    button.dark:hover {
        background: var(--category-button-hover-dark-theme-bg-color) !important;
        color: var(--category-button-hover-dark-theme-text-color) !important;
        border: var(--button-border-style) var(--category-button-hover-dark-theme-border-color) !important;
    }

    button.dark:active {
        background: var(--category-button-active-dark-theme-bg-color) !important;
        color: var(--category-button-active-dark-theme-text-color) !important;
        border: var(--button-border-style) var(--category-button-active-dark-theme-border-color) !important;
        box-shadow: none !important;

    }

    button.dark:focus {
        background: var(--category-button-active-dark-theme-bg-color) !important;
        color: var(--category-button-active-dark-theme-text-color) !important;
        border: var(--button-border-style) var(--category-button-active-dark-theme-border-color) !important;
        box-shadow: none !important;
    }

    button.blue {
        background: var(--category-button-blue-theme-bg-color) !important;
        color: var(--category-button-blue-theme-text-color) !important;
        border: var(--button-border-style) var(--category-button-blue-theme-border-color) !important;
    }

    button.blue:hover {
        background: var(--category-button-hover-blue-theme-bg-color) !important;
        color: var(--category-button-hover-blue-theme-text-color) !important;
        border: var(--button-border-style) var(--category-button-hover-blue-theme-border-color) !important;
    }

    button.blue:active {
        background: var(--category-button-active-blue-theme-bg-color) !important;
        color: var(--category-button-active-blue-theme-text-color) !important;
        border: var(--button-border-style) var(--category-button-active-blue-theme-border-color) !important;
        box-shadow: none !important;
    }

    button.blue:focus {
        background: var(--category-button-active-blue-theme-bg-color) !important;
        color: var(--category-button-active-blue-theme-text-color) !important;
        border: var(--button-border-style) var(--category-button-active-blue-theme-border-color) !important;
        box-shadow: none !important;
    }

</style>
