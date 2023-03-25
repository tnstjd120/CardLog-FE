/** @jsxImportSource @emotion/react */
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { mobileContainerStyles } from "styles/components/MobileContainer";
import MobileTopButton from "../Button/MobileTopButton";
import Swal from "sweetalert2";
import { palette } from "styles/theme";
import { basicContainerStyles } from "styles/components/BasicContainer";

interface BasicContainerProps {}

const BasicContainer: React.FC = (children: any) => {
  const navigate = useNavigate();

  return <section css={basicContainerStyles}>{children}</section>;
};

export default BasicContainer;
