/** @jsxImportSource @emotion/react */
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { mobileContainerStyles } from "styles/components/MobileContainer";
import MobileTopButton from "../Button/MobileTopButton";

interface MobileContainerProps {
  title: string;
  caption: React.ReactElement;
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
            onClick={() => navigate(-1)}
          />

          <h4>{title}</h4>
        </div>

        <div className="content">
          <figure className="logo">
            <img src="assets/logo.svg" alt="CardLog Logo" />

            <figcaption>{caption}</figcaption>
          </figure>

          {children}
        </div>
      </div>
    </section>
  );
};

export default MobileContainer;
