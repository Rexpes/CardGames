<template>
<!--  <MauMau></MauMau>-->
  <Card :isVisible="true" :x="1" :y="2"/>
</template>

<script>
import Card from "@/components/Card";

export default {
  name: "MauView",
  components: {
    Card
  }
}
</script>