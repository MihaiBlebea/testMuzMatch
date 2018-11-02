<template>
    <div class="row">
        <div class="col-9 col-md-8 col-lg-9 pr-1">
            <input type="text"
                   class="form-control"
                   v-model="message"
                   v-on:keyup.enter="storeMessage()"
                   placeholder="Enter message">
        </div>
        <div class="col-3 col-md-4 col-lg-3 pl-1">
            <button class="btn btn-warning btn-block"
                    style="border-radius: 15px;"
                    v-on:click="storeMessage()">Send</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data: function()
    {
        return {
            message: null
        }
    },
    methods: {
        storeMessage: function()
        {
            if(this.message !== null && this.message !== '')
            {
                let payload = {
                    message: this.message
                }
                axios.post('/message', payload).then((result)=> {
                    this.$emit('user-msg-added', result.data)
                    this.message = null
                }).catch((error)=> {
                    console.log(error)
                })
            }
        }
    }
}
</script>
