<template>
    <div class="admin-jokes-list">
        <AdminNavbar />
        <div class="container mt-5">
            <div class="row">
                <div class="col-12">
                    <h3 class="text-left title">
                        {{ $t('adminJokes.listTitle') }}
                    </h3>
                    <joke-item v-for="(joke) in jokes" :joke="joke" :key="joke.id" />
                    <div class="mx-auto mt-4" style="width: 200px;">
                        <nav>
                            <ul class="pagination">
                                <li class="page-item"><a class="page-link" href="#">{{ $t('adminJokes.btnPaginationPrevious') }}</a></li>
                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                <li class="page-item"><a class="page-link" href="#">{{ $t('adminJokes.btnPaginationNext') }}</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import AdminNavbar from "../AdminNavbar";
    import JokeItem from "./JokeItem";
    const jokes = [
        {
            id: 1,
            content: 'Puppy kitty ipsum dolor sit good dog tigger good boy furry teeth purr lazy tigger good boy furry teeth purr lazy  cat run fast fish critters string.'
        },
        {
            id: 2,
            content: 'Puppy kitty ipsum dolor sit good dog tigger good boy furry teeth purr  tigger good boy furry teeth purr lazy  lazy cat run fast fish critters string.'
        },
        {
            id: 3,
            content: 'Puppy kitty ipsum dolor sit good dog tigger good boy furry teeth purr tigger good boy furry teeth purr lazy  lazy cat run fast fish critters string.'
        },
        {
            id: 4,
            content: 'Puppy kitty ipsum dolor sit good dog tigger good boy furry teeth purr lazy cat run fast fish critters string.'
        }

    ];
    export default {
        name: 'AdminJokesList',
        components: {
            AdminNavbar,
            JokeItem
        },
        data() {
            return {
                jokes,
                perPage: 2,
                currentPage: 1,
            }
        },
        computed: {
            rows() {
                return this.items.length
            }
        }
    }
</script>
<style>
    .title{
        color: #9933ff;
    }
    .pagination .page-item .page-link{
        color:#9933ff;
    }
</style>
