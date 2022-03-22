<template>
  <div class="home">
    <Club></Club>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Club from '@/components/Club.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    Club,
  },
});
</script>