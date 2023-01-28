import { useActionData, useTransition } from "@remix-run/react";
import type { Transition } from "@remix-run/react/dist/transition";
import type { SerializeFrom } from "@remix-run/server-runtime";
import { useState, useEffect } from "react";
import type { action } from "~/routes/__pages-with-sidebar/admin";

function getIsSubmissionSuccess(
  transition: Transition,
  actionData: SerializeFrom<typeof action>
) {
  return (
    transition.state === "loading" &&
    Object.values(actionData.errors).every((value) => value === null)
  );
}

export function useIsSubmissionSuccess() {
  const transition = useTransition();
  const actionData = useActionData<typeof action>();
  const [isSubmissionSuccess, setIsSubmissionSuccess] = useState(false);
  useEffect(() => {
    if (actionData) {
      setIsSubmissionSuccess(getIsSubmissionSuccess(transition, actionData));
    }
  }, [transition, actionData]);

  return { isSubmissionSuccess, actionData, transition };
}
