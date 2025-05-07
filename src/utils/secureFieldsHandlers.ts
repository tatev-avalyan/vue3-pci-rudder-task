import type { SecureFieldsHandlersProps } from "../types/secureFieldsType";

export function setupSecureFieldsListeners({
  instance,
  trackError,
  trackSubmission,
  formError,
  simulate3DSRedirect,
}: SecureFieldsHandlersProps): void {
  instance?.on("success", (data) => {
    formError.value = "";
    trackSubmission("success");
    alert("Submitted! Transaction ID: " + data.transactionId);
    simulate3DSRedirect(data.transactionId);
  });

  instance?.on("error", (err) => {
    const message = err.message || "Card processing failed. Please try again.";
    formError.value = message;
    trackError("SecureFields", message);
    trackSubmission("failure");
    alert("Error: " + formError.value);
  });
}

export function runTokenizationFlow({
  instance,
  month,
  year,
  formError,
  trackError,
  trackSubmission,
  simulate3DSRedirect,
}: SecureFieldsHandlersProps & { month: string; year: string }): void {
  let resolved = false;

  const failTimeout = setTimeout(() => {
    if (!resolved) {
      formError.value = "Card processing failed. Please check your input.";
      trackError("SecureFields", formError.value);
      trackSubmission("failure");
      alert("Error: " + formError.value);
    }
  }, 5000);

  instance.submit({
    expm: parseInt(month),
    expy: parseInt(year),
    usage: "SIMPLE",
  });

  instance.on("success", (data) => {
    resolved = true;
    clearTimeout(failTimeout);
    formError.value = "";
    trackSubmission("success");
    alert("Submitted! Transaction ID: " + data.transactionId);
    simulate3DSRedirect(data.transactionId);
  });

  instance.on("error", (err) => {
    resolved = true;
    clearTimeout(failTimeout);
    const message = err.message || "Card processing failed. Please try again.";
    formError.value = message;
    trackError("SecureFields", message);
    trackSubmission("failure");
    alert("Error: " + formError.value);
  });
}
