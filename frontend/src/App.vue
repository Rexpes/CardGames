<template>
    <link rel="stylesheet" href="./assets/css/style.css">
    <HeaderStructure></HeaderStructure>
    <router-view/>
</template>

<script>
import HeaderStructure from "@/components/HeaderStructure";

export default {
    name: "BaseApp",

    components: {
        HeaderStructure
    }
}
</script>

<style lang="scss" scoped></style>
