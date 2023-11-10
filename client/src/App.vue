<template>
  <header class="sticky row color">
    <div class="col-sm-12 col-md-10 col-md-offset-1 color">
      <!-- <a href="/" class="logo color">Toolset</a> -->
      <button :class="{ 'active': state === 'latbe' }" @click="state = 'latbe'">BEL ⇒ LAT </button>
      <button :class="{ 'active': state === 'latru' }" @click="state = 'latru'">RUS ⇒ LAT</button>
      <button :class="{ 'active': state === 'enbe' }" @click="state = 'enbe'">BEL ⇒ ENG</button>
      <button :class="{ 'active': state === 'char' }" @click="state = 'char'">Decoder</button>
      <a href="https://philology.by/" target="_blank" class="button">Philology.BY</a>
    </div>
  </header>


  <div class="row">

    <div class="col-sm-12 col-md-10 col-md-offset-1">
      <br />
      <h3>Scientific transliteration (romanization)</h3>
      <hr />
      {{ state }}
      <p><a href="/latbe">for Belarusian texts</a></p>
      <p><a href="/latru">for Russian texts</a></p>

      <!-- <a href="/be.html" class="button">Belarusian</a> -->
      <!-- <a href="/ru.html" class="button">Russian</a> -->
    </div>
  </div>
  <footer class="row color" style="width:100%">
    <div class="col-sm-12 col-md-10 col-md-offset-1">
      <!-- Транслітарацыя беларускіх і рускіх тэкстаў для патрэб навуковых публікацый (славістыка, тэорыя мовы) -->
      Linguistic Toolset for character level processing.<br />Транслітарацыя беларускіх тэкстаў для патрэб навуковых
      публікацый (славістыка, тэорыя мовы)
    </div>

    <div class="col-sm-12 col-md-10 col-md-offset-1 ">
      &copy; <a href="https://yaskevich.com/" target="_blank" style="text-decoration:none;">Alyaxey Yaskevich</a>,
      2018, 2023 @ Philology.BY
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ref } from 'vue'
const vuerouter = useRoute();
const path = window.location.pathname?.slice(1);

console.log("kek", vuerouter.params, path);

const state = ref('latbe');

const handle = (str: string) => {
  console.log("clicked", str);

}

</script>
<style scoped>
.active,
.color {
  background: #283593;
  color: #fafafa !important;
}
</style>
