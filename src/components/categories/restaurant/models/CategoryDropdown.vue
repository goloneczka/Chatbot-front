<template>
    <div id="dropdown-button">
        <b-dropdown :text="$t('weather.user.restaurant')" class="m-2">
            <b-dropdown-item v-for="category in displayCategories" :key="category"
                             v-on:click="categoryDropdownOnClick(category)">{{category}}
            </b-dropdown-item>
            <div>
                <b-button v-on:click="changeDisplay(-toDisplay)" class="paginLeft" > &lt; </b-button>
                <b-button v-on:click="changeDisplay(toDisplay)" class="paginRight"> &gt; </b-button>
            </div>

        </b-dropdown>
    </div>
</template>
<script>

    import {restaurantService} from '../../../../App'

    export default {
        name: 'CityDropdown',
        components: {},
        data() {
            return {
                categories: [],
                displayCategories: [],
                indx: 0,
                toDisplay: 5
            }
        },
        props: ['cityId'],
        mounted() {
            restaurantService.getAllCatgories(this.cityId).then(data => {
                if (data.errors)
                    this.$root.$emit("showDanger", this.$t('food.errors.errorListOfCategories') + data.errors[0]);
                else {
                    this.categories = data
                    this.changeDisplay(this.toDisplay)
                }
            });
        },
        methods: {
            categoryDropdownOnClick(category) {
                this.$emit('categoryDropdownOnClick', category);
            },
            changeDisplay(addToIndx){
                if(this.indx + addToIndx < this.toDisplay || this.indx + addToIndx > this.categories.length )
                    return;

                this.displayCategories = [];
                this.indx += addToIndx;
                for (let i = this.indx - this.toDisplay; i < this.indx; i++ ){
                    this.displayCategories.push(this.categories[i])
                }
            }
        }
    }
</script>
<style scoped>
    #dropdown-button {
        margin-left: 85%;
    }

    button.paginLeft {
        padding-left: 33%;
        padding-right: 10%;
        display: inline;
        background:transparent;
        border:none;
        outline:none;
        color: #333333;
    }
    button.paginRight {
        padding-left: 10%;
        padding-right: 33%;
        display: inline;
        background:transparent;
        border:none;
        outline:none;
        color: #333333;
    }
</style>
