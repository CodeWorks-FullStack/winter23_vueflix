<template>
  <div class="about">
    <h1>This is the about page</h1>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { logger } from '../utils/Logger.js';

export default {
  setup() {

    onMounted(() => {
      logger.log('Sup from the About Page')
    })

    return {

    }
  }
}
</script>
