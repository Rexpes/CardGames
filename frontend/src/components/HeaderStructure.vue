<template>
    <header class="header">
        <div class="header__logo">Logo</div>
        <div class="header__buttons">
            <router-link to="/"><button class="header__button">Home</button></router-link>
            <button class="header__button">Games</button>
            <button class="header__button">About us</button>
        </div>
        <div class="header__login">
            <button class="header__sign-in">Sign in</button>
        </div>
    </header>
</template>
<script>
export default {
    name: "HeaderStructure"
}
</script>