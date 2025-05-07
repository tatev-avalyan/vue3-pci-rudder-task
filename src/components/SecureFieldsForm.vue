<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-field">
      <label>Cardholder Name</label>
      <input v-model="cardholderName" @blur="trackField('CardholderName')" placeholder="Cardholder Name" type="text" />
    </div>

    <div class="form-field"><label>Card Number</label>
      <div id="pan-iframe" class="secure-field"></div>
    </div>
    <div class="form-field"><label>CVV</label>
      <div id="cvv-iframe" class="secure-field"></div>
    </div>

    <div class="form-field">
      <label>Expiration Month</label>
      <input v-model="expiryMonth" @blur="trackField('ExpirationMonth')" placeholder="MM" maxlength="2" />
    </div>

    <div class="form-field">
      <label>Expiration Year</label>
      <input v-model="expiryYear" @blur="trackField('ExpirationYear')" placeholder="YYYY" maxlength="4" />
    </div>

    <p v-if="formError" class="error-message">{{ formError }}</p>
    <button type="submit">Pay</button>
  </form>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRudderLogger } from "../composables/useRudderLogger";
  import { createSecureFields } from "../utils/secureFieldsWrapper";
  import { isValidExpirationDate, simulate3DSRedirect } from "../utils/formHelpers";
  import { setupSecureFieldsListeners, runTokenizationFlow } from "../utils/secureFieldsHandlers";

  const cardholderName = ref("");
  const expiryMonth = ref("");
  const expiryYear = ref("");
  const formError = ref("");

  const secureFieldsInstance = ref<ReturnType<typeof createSecureFields> | null>(null);
  const { trackError, trackSubmission, trackFieldInteraction } = useRudderLogger();

  const trackField = (field: string) => {
    trackFieldInteraction(field);
  };

  const showError = (context: string, message: string) => {
    formError.value = message;
    trackError(context, message);
    trackSubmission("failure");
  };

  const validateForm = (): boolean => {
    if (!cardholderName.value || !expiryMonth.value || !expiryYear.value) {
      showError("Form", "Missing required fields");
      return false;
    }

    if (!isValidExpirationDate({ month: expiryMonth.value, year: expiryYear.value })) {
      showError("Form", "Invalid expiration date");
      return false;
    }

    if (!secureFieldsInstance.value) {
      showError("SecureFields", "Not initialized");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    runTokenizationFlow({
      instance: secureFieldsInstance.value!,
      month: expiryMonth.value,
      year: expiryYear.value,
      formError,
      trackError,
      trackSubmission,
      simulate3DSRedirect,
    });
  };

  onMounted(() => {
    secureFieldsInstance.value = createSecureFields();
    if (!secureFieldsInstance.value) return;

    setupSecureFieldsListeners({
      instance: secureFieldsInstance.value,
      trackError,
      trackSubmission,
      formError,
      simulate3DSRedirect,
    });
  });
</script>


<style scoped src="../styles/secureFieldsForm.css"></style>
