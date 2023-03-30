export const days = (date: string) => {
  const today = new Date();
  const targetDate = new Date(date);
  const timeDiff = Math.abs(today.getTime() - targetDate.getTime());
  const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));

  if (diffDays >= 7) {
    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, "0");
    const day = String(targetDate.getDate()).padStart(2, "0");

    return `${year}년 ${month}월 ${day}일`;
  }

  return `${diffDays}일 전`;
};
