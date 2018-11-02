<template>
    <div class="form-group form-check mb-0 mt-2">
        <input type="checkbox" class="form-check-input mt-0" v-model="input">
        <label class="form-check-label"><small>{{ label }}</small></label>
    </div>
</template>

<script>
export default {
    props: {
        defaultValue: {
            required: true,
            type: Boolean
        },
        label: {
            required: false,
            type: String
        }
    },
    computed: {
        input: {
            set: function(value)
            {
                this.$emit('checkbox-changed', value)
            },
            get: function()
            {
                return this.defaultValue
            }
        }
    }
}
</script>
