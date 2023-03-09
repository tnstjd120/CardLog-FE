import { FaChevronLeft } from "react-icons/fa";
import { mobileContainerStyles } from "../../../styles/components/MobileContainer";

interface MobileContainerProps {
  className?: string;
  children: React.ReactNode;
}

const MobileContainer: React.FC<MobileContainerProps> = ({
  className,
  children,
}) => {
  return (
    <section css={mobileContainerStyles}>
      <div className="inner">
        <div className="top_nav">
          <FaChevronLeft />
        </div>

        <div className={`content ${className}`}>{children}</div>
      </div>
    </section>
  );
};

export default MobileContainer;
