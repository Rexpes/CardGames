<template>
    <div class="content">
        <div class="content__selection-box">
            <router-link to="/mau">
                <div class="content__selection-box__select">PRŠÍ</div>
            </router-link>
            <router-link to="/pairs">
                <div class="content__selection-box__select">PEXESO</div>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: "ContentSelection"
}
</script>