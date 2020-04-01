<template>
    <div class="joke-item">
      <div class="box">
        <article class="media">
          <div class="media-content">
            <div class="content">
                <p><small>{{joke.category}}</small>
                <p>{{joke.content}}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
</template>
<script>
    export default {
        name: 'joke-item',
        props: {
            joke: Object
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
