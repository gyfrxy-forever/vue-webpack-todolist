<template>
    <div id="app">
        {{test}}
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return{
                test: 'test'
            }
        }
    }
</script>

<style>
    #app{
        color: red;
    }
</style>