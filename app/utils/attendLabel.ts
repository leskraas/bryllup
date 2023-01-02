import type { Attend } from "@prisma/client";

export const attendLabel: Record<Attend, string> = {
  YES: "Ja, hele helgen",
  NO: "Nei, dessverre",
  SATURDAY: "Ja, men kan kun være der lørdag",
};
