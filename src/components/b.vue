<template>
    <div>
        <button @click="toa">向a通信</button>
    </div>
</template>
<script>
import bus from '@/js/eventBus'
export default {
    name: 'b',
    methods: {
        toa() {
            bus.$emit('toa', 2)
        }
    },
    created () {
        bus.$on('tob', val => {
            console.log(val)
        })
    }
}
</script>
