/** @jsxImportSource @emotion/react */

import { keyframes, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { ThemeStateProps } from "store/themeType";
import { emotionStyledProps } from "types/emotionStyled";

const Loading = () => {
  const { themeType } = useSelector<RootState>(
    (state) => state.themeType
  ) as ThemeStateProps;

  const theme = useTheme();
  const backgroundColor = theme[themeType].backgroundColor;

  return (
    <LoadingContainer backgroundColor={backgroundColor}>
      <svg
        width="256"
        height="256"
        viewBox="0 0 256 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="M204.8 0H51.2C22.923 0 0 22.923 0 51.2V204.8C0 233.077 22.923 256 51.2 256H204.8C233.077 256 256 233.077 256 204.8V51.2C256 22.923 233.077 0 204.8 0Z"
            fill="#FFEDAC"
          />
          <path
            className="textLogo"
            d="M135.782 202.752C128.273 202.752 120.9 201.796 113.664 199.885C106.428 197.973 100.147 195.311 94.8224 191.898C88.8149 188.075 83.3877 182.682 78.5408 175.718C73.6938 168.755 69.905 161.144 67.1744 152.883C64.4437 144.623 63.0784 136.67 63.0784 129.024C63.0784 118.784 65.2629 108.817 69.632 99.1233C74.001 89.4294 80.145 80.623 88.064 72.704C94.0714 66.6966 100.83 62.0544 108.339 58.7776C117.214 55.0912 126.157 53.248 135.168 53.248C142.95 53.248 150.733 54.7499 158.515 57.7536C163.567 59.6651 167.868 62.0886 171.418 65.024C174.967 67.9595 178.859 71.8166 183.091 76.5953L189.235 84.1729C190.874 86.2209 191.693 88.3371 191.693 90.5217C191.693 93.2523 190.6 95.6417 188.416 97.6897C186.231 99.7377 183.706 100.762 180.838 100.762C177.971 100.762 175.445 99.4646 173.261 96.8705L165.683 87.6545C163.772 85.6065 161.519 83.5926 158.925 81.6128C156.331 79.6331 153.737 78.0971 151.142 77.0049C145.271 74.5473 139.401 73.5232 133.53 73.9328C121.105 75.0251 110.66 79.599 102.195 87.6545C89.7706 99.6694 83.5584 113.459 83.5584 129.024C83.5584 137.353 85.777 146.057 90.2144 155.136C94.6517 164.216 99.8741 170.735 105.882 174.694C109.568 177.016 114.005 178.859 119.194 180.224C124.382 181.589 129.707 182.272 135.168 182.272C151.689 182.272 162.475 177.698 167.526 168.55C168.482 166.912 169.643 163.772 171.008 159.13L173.056 152.576C173.875 150.392 175.138 148.685 176.845 147.456C178.551 146.227 180.36 145.613 182.272 145.613C185.003 145.613 187.46 146.569 189.645 148.48C191.829 150.392 192.922 152.849 192.922 155.853C192.922 157.082 192.717 158.31 192.307 159.539L190.874 163.84C188.552 170.94 186.778 175.787 185.549 178.381C181.316 185.754 175.377 191.42 167.731 195.379C160.085 199.339 151.347 201.728 141.517 202.547C140.288 202.684 138.377 202.752 135.782 202.752Z"
            fill="#555555"
          />
        </g>
      </svg>
    </LoadingContainer>
  );
};

export default Loading;

const loadingAnimation = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div<emotionStyledProps>`
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: 0.3s;
  background-color: ${(props) => props.backgroundColor}90;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 80px;
    height: 80px;

    .textLogo {
      transform-origin: 50% 50%;
      animation: ${loadingAnimation} 1s linear forwards infinite;
    }
  }
`;
