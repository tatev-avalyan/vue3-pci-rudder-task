import * as rudderanalytics from "rudder-sdk-js";

export function useRudderLogger() {
  const trackError = (field: string, message: string) => {
    rudderanalytics.track("Form Field Error", {
      field,
      message,
      submittedAt: new Date().toISOString(),
    });
  };

  const trackSubmission = (status: "success" | "failure") => {
    rudderanalytics.track("Form Submission", {
      status,
      submittedAt: new Date().toISOString(),
    });
  };

  const trackFieldInteraction = (field: string) => {
    rudderanalytics.track("Field Interaction", {
      field,
      submittedAt: new Date().toISOString(),
    });
  };

  return { trackError, trackSubmission, trackFieldInteraction };
}
