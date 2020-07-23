<template>
    <div>
        <button @click="tob">向b通信</button>
    </div>
</template>
<script>
import bus from '@/js/eventBus'
export default {
    name: 'a',
    methods: {
        tob() {
            bus.$emit('tob',1);
        }
    },
    created () {
        bus.$on('toa', val => {
            console.log(val)
        })
    }
}
</script>
