import type { Ref } from "vue";

export interface PCISecureFieldConfig {
  fields: {
    [key: string]: {
      selector: string;
      type: 'text' | 'password';
      placeholder?: string;
    };
  };
  styles?: {
    base?: Record<string, string>;
    focus?: Record<string, string>;
    error?: Record<string, string>;
  };
}

export interface PCISecureGlobal {
  init: (config: PCISecureFieldConfig) => void;
}

export interface SecureFieldsInstance {
  initTokenize: (merchantId: string, fields: Record<string, string>) => void;
  submit: (options: { expm: number; expy: number; usage?: string }) => void;
  on: (event: 'success' | 'error', handler: (data: any) => void) => void;
  destroy?: () => void;
}

export interface SecureFieldsHandlersProps {
  instance: SecureFieldsInstance;
  trackError: (ctx: string, msg: string) => void;
  trackSubmission: (status: "success" | "failure") => void;
  formError: Ref<string>;
  simulate3DSRedirect: (transactionId: string) => void;
}

