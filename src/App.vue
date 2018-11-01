<template>
    <div>
        <h1>App component</h1>
        <VueComment></VueComment>
    </div>
</template>

<script>
import VueComment from './components/VueComment.vue'

export default {
    name: 'App',
    components: {
        VueComment
    }
}
</script>
