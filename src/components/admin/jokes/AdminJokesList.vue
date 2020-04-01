<template>
    <div class="admin-jokes-list">
        <AdminNavbar />
        <div class="container mt-5">
            <div class="row">
                <div v-if="data.length > 0" class="col-12">
                    <h3 class="text-left title">
                        {{ $t('adminJokes.listTitle') }}
                    </h3>
                    <div class="text-right">
                        <b-dropdown id="dropdown-text" :text="currentCategory" class="m-2">
                            <b-dropdown-item-button v-on:click="changeCategory(category)" v-for="(category, index) in categories" :key="index">{{category}}</b-dropdown-item-button>
                        </b-dropdown>
                    </div>
                    <joke-item v-for="(joke) in paginatedData" :joke="joke" :key="joke.id" />
                    <div class="mx-auto mt-4" style="width: 200px;">
                        <nav>
                            <ul class="pagination">
                                <li class="page-item">
                                    <button class="page-link" type="button" @click="onClickPreviousPage" :disabled="isInFirstPage">
                                         {{ $t('adminJokes.btnPaginationPrevious') }}
                                    </button>
                                </li>
                                <li :class="[{ active: isPageActive(page.number) }, 'page-item']" v-for="(page, index) in pages" :key="index">
                                    <button 
                                        class="page-link"
                                        type="button"
                                        @click="onPageChange(page.number)" 
                                        :disabled="page.isDisabled" 
                                        >
                                            {{ page.number }}
                                    </button>
                                </li>
                                <li class="page-item" title="Следующая страница">
                                    <button class="page-link" type="button" @click="onClickNextPage" :disabled="isInLastPage">
                                        {{ $t('adminJokes.btnPaginationNext') }}
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div v-else  class="col-12">
                    <h3 class="text-center">Oh no, nie mamy nic śmiesnego 😢</h3>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex';

    import AdminNavbar from "../AdminNavbar";
    import JokeItem from "./JokeItem";
    export default {
        name: 'AdminJokesList',
        components: {
            AdminNavbar,
            JokeItem
        },
        data() {
            return {
                currentCategory: this.$t('adminJokes.allCategories'),
                data: [],
                categories: [],
                totalPages: 0,
                total: 0,
                perPage: 3,
                currentPage: 1,
                maxVisibleButtons: 3
            }
        },
        mounted(){
            this.loadJokesForAdmin()
            this.data = this.jokeAdmin
            this.total = this.jokeAdmin.length
            this.totalPages = Math.ceil(this.total/this.perPage)
            this.data.map((e) =>{
                if(this.categories.indexOf(e.category) === -1) this.categories.push(e.category)
            })
            
        },
        methods: {
            ...mapActions(['loadJokesForAdmin']),
            onClickPreviousPage() {
                this.onPageChange(this.currentPage - 1)
            },
            onClickNextPage() {
                this.onPageChange(this.currentPage + 1)
            },
            isPageActive(page) {
                return this.currentPage === page
            },
            onPageChange(page) {
                this.currentPage = page;
            },
            getPagingRange(current, {min = 1, total = 20, length = 5} = {}) {
                if (length > total) length = total

                let start = current - Math.floor(length / 2)
                start = Math.max(start, min)
                start = Math.min(start, min + total - length)
                
                return Array.from({length: length}, (el, i) => start + i)
            },
            changeCategory(category){
                this.currentCategory = category
                if(category !== this.$t('adminJokes.allCategories')){
                    if(this.categories.indexOf(this.$t('adminJokes.allCategories')) === -1)
                        this.categories.push(this.$t('adminJokes.allCategories'))
                    this.data = this.jokeAdmin.filter((e) => {
                        if(e.category === category) return true
                        else return false
                    })
                    this.total = this.data.length
                    this.totalPages = Math.ceil(this.total/this.perPage)
                    this.currentPage = 1
                }
                else{
                    this.data = this.jokeAdmin
                    this.total = this.jokeAdmin.length
                    this.totalPages = Math.ceil(this.total/this.perPage)
                }
                
            }
        },
        computed: {
            ...mapGetters(['jokeAdmin']),
            paginatedData(){
                let start = (this.currentPage - 1) * this.perPage, end = start + this.perPage
                return this.data.slice(start, end)
            },
            pages() {
                let check = this.getPagingRange(this.currentPage, {min: 1, total: this.totalPages, length: this.maxVisibleButtons})
                let range = []
                for (let i = 0; i <check.length; i+= 1 ) {
                    range.push({
                    number: check[i],
                    isDisabled: check[i] === this.currentPage 
                    });
                }
                return range
            },
            isInFirstPage() { 
                return this.currentPage === 1 
            },
            isInLastPage() { 
                return this.currentPage === this.totalPages
            },
        }

    }
</script>
<style>
    .title {
        color: #9933ff;
    }
    .pagination .page-item .page-link {
        color:#9933ff;
    }
    .pagination .page-item.active .page-link {
        background-color: #9933ff;
        color: #fff;
    }
</style>
