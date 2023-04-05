import { useEffect, useState } from "react";
import RouterInfo from "../components/routes/RouterInfo";

export const useHasNav = (path: string): boolean => {
  // 혹시 이 부분을 보고 계신 분이 있을진 모르겠지만 좀 더 컴팩트한 방법을 생각 중 입니다...
  const pathArr = path.split("/");
  if (pathArr.length > 2) {
    if (pathArr[1] === "posts") return true;
    if (pathArr[1] === "write") return false;
  }

  for (let [key, value] of Object.entries(RouterInfo)) {
    if (value.path === path) return value.isWithNav;
  }

  return true;
};
