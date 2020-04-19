<template>
    <div>
        <ul>
            <li class="message-user">
                <div>{{this.text}}</div>
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
        margin-left: 85%;
        width: 15%;
        border-radius: var(--chat-box-message-user-border-radius);
    }
</style>
