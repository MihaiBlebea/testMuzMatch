<template>
    <div class="card">
        <div class="card-body p-0">
            <div ref="comments"
                 class="pt-3"
                 v-on:scroll="onScroll($event)"
                 style="height:400px; overflow-y: scroll;">
                <VueComment v-for="(comment, index) in comments"
                            :key="index"
                            :comment-message="comment.message"></VueComment>
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
import VueComment from './components/VueComment.vue'
import VueInput from './components/VueInput.vue'
import VueCheckBox from './components/VueCheckBox.vue'


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
            comments: [
                { message: 'ceva' },
                { message: 'altceva' }
            ],
            autoScroll: true,
            scrollPosition: 0,
            audio: false
        }
    },
    methods: {
        userMessageAdd: function(event)
        {
            this.comments.push(event)
            this.autoScroll = true
            this.playNotifySound()
            this.scrollToEnd()
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
        socket.on('send-message', (message)=> {
            this.comments.push(JSON.parse(message))
            this.playNotifySound()
            this.scrollToEnd()
        })
    }
}
</script>
