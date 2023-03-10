/** @jsxImportSource @emotion/react */
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import theme from "styles/theme";
import { mobileContainerStyles } from "../../../styles/components/MobileContainer";
import Button from "../Button";

interface MobileContainerProps {
  className?: string;
  title: string;
  children: React.ReactNode;
}

const MobileContainer: React.FC<MobileContainerProps> = ({
  className,
  title,
  children,
}) => {
  const navigate = useNavigate();

  return (
    <section css={mobileContainerStyles}>
      <div className="inner">
        <div className="top_nav">
          <Button themeType="light">
            <FaChevronLeft />
          </Button>

          <h4>{title}</h4>
        </div>

        <div className={`content ${className}`}>{children}</div>
      </div>
    </section>
  );
};

export default MobileContainer;
