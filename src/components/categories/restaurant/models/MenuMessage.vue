<template>
    <div class="table-container">
        <table>
            <tbody>
            <tr v-for="dish in menu" v-bind:key="dish.dish">
                <td>{{dish.dish}} {{dish.price}} {{$t('food.bot.currencyPL')}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>


    export default {
        name: 'MenuMessage',
        props: ['data'],
        components: {},
        data() {
            return {
                menu: [],
            }
        },
        mounted() {
            this.menu = this.data;
        },
        methods: {},

    }
</script>
<style scoped>
    .table-container {
        height: 150px;
    }

    table {
        display: flex;
        flex-flow: column;
        height: 100%;
        width: 200px;
    }

    table tbody {
        width: 100%;
        display: block;
        overflow-y: scroll;
    }

    table tbody tr {
        text-align: center;
    }

</style>
