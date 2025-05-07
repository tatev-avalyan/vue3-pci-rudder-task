import type { SecureFieldsInstance } from "../types/secureFieldsType";

declare global {
  interface Window {
    SecureFields?: {
      new (): SecureFieldsInstance;
    };
  }
}

export const createSecureFields = (): SecureFieldsInstance | null => {
  if (!window.SecureFields) {
    console.error("SecureFields SDK not loaded.");
    return null;
  }

  const merchantId = import.meta.env.VITE_PCI_MERCHANT_ID;
  
  const secureFields = new window.SecureFields();

  secureFields.initTokenize(merchantId, {
    cardNumber: "pan-iframe",
    cvv: "cvv-iframe",
  });

  return secureFields;
};
