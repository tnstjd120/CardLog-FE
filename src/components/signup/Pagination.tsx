/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Button from "components/common/Button";
import { Dispatch } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

interface PaginationProps {
  signUpStep: number;
  setSignUpStep: Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ signUpStep, setSignUpStep }: PaginationProps) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        position: absolute;
        top: 70px;
        right: 10px;
        letter-spacing: 2px;
        font-size: 1.2rem;

        & span {
          padding: 0 14px;
        }
      `}
    >
      {/* <Button onClick={() => setSignUpStep((prev) => prev - 1)}>
        <GoChevronLeft />
      </Button> */}

      <span>
        <strong>{signUpStep}</strong>/3
      </span>

      {/* <Button>
        <GoChevronRight />
      </Button> */}
    </div>
  );
};

export default Pagination;
