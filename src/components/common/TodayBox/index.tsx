/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { palette } from "styles/theme";

const todayStyles = css`
  position: absolute;
  left: 30px;
  bottom: 30px;
  font-size: 16px;
  font-weight: 300;

  & > span:first-of-type {
    margin-right: 20px;
  }
`;

const TodayBox = () => {
  return (
    <div css={todayStyles}>
      <span>Today - 274</span>
      <span>All - 5327</span>
    </div>
  );
};

export default TodayBox;
