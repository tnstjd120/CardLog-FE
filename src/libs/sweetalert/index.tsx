import { palette } from "styles/theme";
import Swal from "sweetalert2";

export const errorAlert = (text: string) => {
  Swal.fire({
    icon: "error",
    html: `
        <h4>${text}</h4>
      `,
    confirmButtonColor: palette.black4,
    confirmButtonText: "확인",
    focusConfirm: true,
  });
};
