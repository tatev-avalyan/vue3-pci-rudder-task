<template>
  <div class="three-ds-result">
    <h2>3DS Authentication Completed</h2>
    <p v-if="transactionId">Transaction ID: {{ transactionId }}</p>
    <p v-else>No transaction ID found in URL.</p>
    <router-link to="/">
      <button class="continue-button">Back to Payment</button>
    </router-link>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";

  const route = useRoute();
  const transactionId = ref<string | null>(null);

  onMounted(() => {
    transactionId.value = (route.query.transactionId as string) || null;
  });
</script>

<style scoped src="../styles/threeDSSimulatedCallback.css"></style>
