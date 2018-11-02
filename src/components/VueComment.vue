<template>
    <div class="mb-4">
        <div class="row align-items-center ml-0 mr-0 mb-1">
            <div class="col-2 col-md-3">
                <img class="rounded-circle"
                     style="width: 100%; border: 1px solid #e8516e;"
                     src="http://www.fastrackerzkennel.com/wp-content/uploads/2014/03/male-placeholder-image.jpeg"/>
            </div>
            <div class="col-5 col-md-5 px-0">
                <small><strong style="color: #e8516e;">Roger Brown</strong></small>
            </div>
            <div class="col-5 col-md-4 px-md-0 text-right text-md-center">
                <small>10.ian.2018</small>
            </div>
        </div>
        <div class="px-3">
            {{ commentMessage }}
        </div>

    </div>
</template>

<script>
export default {
    props: {
        commentMessage: {
            required: true,
            type: String
        }
    },
    data: function()
    {
        return {
            name: 'Mihai Blebea'
        }
    },
    methods: {

    }
}
</script>
