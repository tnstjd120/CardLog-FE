/** @jsxImportSource @emotion/react */
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { mobileContainerStyles } from "styles/components/MobileContainer";
import MobileTopButton from "../Button/MobileTopButton";
import Swal from "sweetalert2";
import { palette } from "styles/theme";

interface MobileContainerProps {
  title: string;
  caption?: React.ReactElement;
  children: React.ReactNode;
}

const MobileContainer: React.FC<MobileContainerProps> = ({
  title,
  caption,
  children,
}) => {
  const navigate = useNavigate();

  return (
    <section css={mobileContainerStyles}>
      <div className="inner">
        <div className="top_nav">
          <MobileTopButton
            icon={<FaChevronLeft />}
            onClick={() => {
              title === "회원가입"
                ? Swal.fire({
                    icon: "warning",
                    html: "정말로 뒤로 가시겠습니까? <br> 입력했던 정보가 초기화 됩니다.",
                    showCancelButton: true,
                    confirmButtonText: "확인",
                    cancelButtonText: "취소",
                    confirmButtonColor: palette.black3,
                    cancelButtonColor: "#dc3545",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      navigate(-1);
                    }
                  })
                : navigate(-1);
            }}
          />

          <h4>{title}</h4>
        </div>

        <div className="content">
          {caption && (
            <figure className="logo">
              <img src="assets/logo.svg" alt="CardLog Logo" />

              <figcaption>{caption}</figcaption>
            </figure>
          )}

          {children}
        </div>
      </div>
    </section>
  );
};

export default MobileContainer;
