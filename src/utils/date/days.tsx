export const days = (date: string) => {
  const today = new Date();
  const targetDate = new Date(date);
  const timeDiff = Math.abs(today.getTime() - targetDate.getTime());

  // 초 전
  const diffSeconds = Math.floor(timeDiff / 1000);
  if (diffSeconds < 60) {
    return `${diffSeconds}초 전`;
  }

  // 분 전
  const diffMinutes = Math.floor(timeDiff / (1000 * 60));
  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  }

  // 시간 전
  const diffHours = Math.floor(timeDiff / (1000 * 3600));
  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }

  // 일 전
  const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
  if (diffDays < 7) {
    return `${diffDays}일 전`;
  }

  // 년-월-일
  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, "0");
  const day = String(targetDate.getDate()).padStart(2, "0");
  return `${year}년 ${month}월 ${day}일`;
};
