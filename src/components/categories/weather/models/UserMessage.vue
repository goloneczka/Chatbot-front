<template>
    <div>
        <ul>
            <li class="message-user">
                <div><a>{{this.text}}</a></div>
            </li>
        </ul>
    </div>
</template>
<script>

    export default {
        name: 'UserMessage',
        components: {},
        props: ['text'],
        data() {
            return {
            }
        },
        methods: {
        }
    }
</script>
<style scoped>
    .message-user > div {
        margin-left: 80%;
        border-radius: var(--chat-box-message-user-border-radius)
    }
</style>
