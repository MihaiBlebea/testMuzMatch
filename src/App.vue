<template>
    <div class="card">
        <div class="card-body p-0">
            <div ref="comments"
                 class="pt-3"
                 v-on:scroll="onScroll($event)"
                 style="height:400px; overflow-y: scroll;">
                <VueComment v-for="(comment, index) in comments"
                            :key="index"
                            :comment-message="comment.message"
                            :comment-author="comment.author"
                            :comment-time="comment.time"></VueComment>
            </div>

            <div class="border-top p-1">
                <VueInput v-on:user-msg-added="userMessageAdd($event)"></VueInput>

                <div class="d-flex justify-content-start">
                    <div class="mr-2">
                        <VueCheckBox :default-value="autoScroll"
                                     label="Auto scroll"
                                     v-on:checkbox-changed="onAutoScrollChange($event)"></VueCheckBox>
                    </div>
                    <div>
                        <VueCheckBox :default-value="audio"
                                     label="Audio"
                                     v-on:checkbox-changed="onAudioChange($event)"></VueCheckBox>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { VueComment, VueInput, VueCheckBox } from './components/index.js'

export default {
    name: 'App',
    components: {
        VueComment,
        VueInput,
        VueCheckBox
    },
    data: function()
    {
        return {
            comments: [],
            autoScroll: true,
            scrollPosition: 0,
            audio: false
        }
    },
    methods: {
        userMessageAdd: function(event)
        {
            event.time = this.getCurrentTime()
            this.comments.push(event)
            this.autoScroll = true
            this.playNotifySound()
            this.scrollToEnd()
        },
        getCurrentTime: function()
        {
            let date = new Date()
            let minutes = (String(date.getMinutes()).length == 1) ? '0' + date.getMinutes() : date.getMinutes()
            let seconds = (String(date.getSeconds()).length == 1) ? '0' + date.getSeconds() : date.getSeconds()
            return date.getHours() + ':' + minutes + ':' + seconds
        },
        scrollToEnd: function()
        {
            if(this.autoScroll)
            {
                setTimeout(()=> {
                    let comments = this.$refs.comments
                    comments.scrollTop = comments.scrollHeight
                }, 100)
            }
        },
        onScroll: function(event)
        {
            var currentScrollPosition = event.srcElement.scrollTop
            if(currentScrollPosition > this.scrollPosition)
            {
                // Scroll DOWN
            } else {
                // Scroll UP
                this.autoScroll = false
            }
            this.scrollPosition = currentScrollPosition
        },
        onAutoScrollChange: function(event)
        {
            this.autoScroll = event
        },
        onAudioChange: function(event)
        {
            this.audio = event
        },
        playNotifySound: function()
        {
            if(this.audio)
            {
                var audio = new Audio('/public/tweet.mp3')
                audio.play()
            }
        }
    },
    mounted: function()
    {
        var socket = io()
        socket.on('send-message', (comment)=> {
            comment = JSON.parse(comment)
            comment.time = this.getCurrentTime()
            this.comments.push(comment)
            this.playNotifySound()
            this.scrollToEnd()
        })
    }
}
</script>
