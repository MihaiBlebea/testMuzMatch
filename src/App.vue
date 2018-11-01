<template>
    <div>
        <h1>App component</h1>
        <strong>{{ number }}</strong>
        <VueComment></VueComment>
    </div>
</template>

<script>
import VueComment from './components/VueComment.vue'

export default {
    name: 'App',
    components: {
        VueComment
    },
    data: function()
    {
        return {
            number: '098723123'
        }
    },
    mounted: function()
    {
        var socket = io()
        socket.on('test', (number)=> {
            this.number = number + '000'
        })
    }
}
</script>
