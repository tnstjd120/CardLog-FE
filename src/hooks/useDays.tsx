import { useMemo } from "react";

export const useDays = (dateString: string) => {
  const today = new Date();
  const targetDate = new Date(dateString);
  const timeDiff = Math.abs(today.getTime() - targetDate.getTime());
  const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));

  return useMemo(() => diffDays, [diffDays]);
};
