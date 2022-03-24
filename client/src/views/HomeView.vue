<template>
  <div class="home mt-4 md:mt-8 md:w-3/5 md:mx-auto">
    <Club></Club>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { defineComponent } from 'vue';
import Club from '@/components/Club.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    Club,
  },
});
</script>