<template>
  <div class="home">
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
