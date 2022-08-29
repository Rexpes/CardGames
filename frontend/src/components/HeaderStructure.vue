<template>
    <header class="header">
        <div class="header__logo"><router-link to="/"><img src="@/assets/images/Logo_Go4K.png" alt="Go4K_logo" class="header__Go4K-logo"></router-link></div>
        <div class="header__buttons">
            <router-link to="/"><button class="header__button" style="margin-right: 480px;">Domů</button></router-link>
            <!--<router-link to="/games"><button class="header__button">Hry</button></router-link>-->
        </div>
        <!--
        <div class="header__login">
            <router-link to="/mau"><button class="header__sign-in">Prší</button></router-link>
        </div>
        -->
    </header>
</template>
<script>
export default {
    name: "HeaderStructure"
}
</script>