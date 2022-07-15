<template>
    <link rel="stylesheet" href="./assets/css/style.css">
    <HeaderStructure></HeaderStructure>
    <SelectionPage></SelectionPage>
</template>

<script>
    import HeaderStructure from './components/HeaderStructure.vue'
    import SelectionPage from './components/SelectionPage.vue'

    export default {
        components: {
            HeaderStructure,
            SelectionPage,
        }
    }
</script>

<style lang="scss" scoped></style>