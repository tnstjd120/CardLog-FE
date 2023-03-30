import styled from "@emotion/styled";
import Button from "components/common/Button";
import { accessApi } from "libs/axios";
import { FaBlogger, FaGithubSquare } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { MyInfoState } from "store/myInfo";
import { palette } from "styles/theme";
import Swal from "sweetalert2";
import API_Path from "utils/path/API_Path";

const ProfileInfoForm = () => {
  const myInfo = useSelector<RootState>((state) => state.myInfo) as MyInfoState;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    await accessApi
      .patch(API_Path.USER_INFO, {
        about: formData.get("about"),
        username: formData.get("username"),
        blog_name: formData.get("blog_name"),
        github_url: formData.get("github_url"),
        blog_url: formData.get("blog_url"),
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          html: `
            <h4>성공적으로 수정되었습니다.</h4>
          `,
          confirmButtonColor: palette.black4,
          confirmButtonText: "확인",
          focusConfirm: true,
        });
      })
      .catch((error) => {
        let errorMessage = error;

        for (let [key, value] of Object.entries(error.response.data)) {
          errorMessage = value;
          break;
        }

        Swal.fire({
          icon: "error",
          html: `
            <h4>${errorMessage}</h4>
          `,
          confirmButtonColor: palette.black4,
          confirmButtonText: "확인",
          focusConfirm: true,
        });
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <MyInfoInputBox>
        <h5>내 소개</h5>
        <textarea defaultValue={myInfo.about} name="about"></textarea>
      </MyInfoInputBox>

      <MyInfoInputBox>
        <h5>이메일</h5>

        <input type="text" name="email" defaultValue={myInfo.email} readOnly />
      </MyInfoInputBox>

      <MyInfoInputBox>
        <h5>이름</h5>
        <input type="text" defaultValue={myInfo.username} name="username" />
      </MyInfoInputBox>

      <MyInfoInputBox>
        <h5>카드로그 제목</h5>

        <input type="text" defaultValue={myInfo.blog_name} name="blog_name" />
      </MyInfoInputBox>

      <MyInfoInputBox>
        <h5>소셜 정보</h5>
        <div>
          <FaGithubSquare />

          <input
            type="text"
            defaultValue={myInfo.github_url}
            name="github_url"
          />
        </div>

        <div>
          <FaBlogger />

          <input type="text" defaultValue={myInfo.blog_url} name="blog_url" />
        </div>
      </MyInfoInputBox>

      <Button type="submit">수정하기</Button>
    </form>
  );
};

export default ProfileInfoForm;

const MyInfoInputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 0;

  div {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    svg {
      font-size: 1.8rem;
      margin-right: 5px;
    }
  }

  input {
    width: 100%;
    margin-bottom: 0;
    margin-top: 10px;
    font-size: 1rem;
    border: 0;
    border-bottom: 1px solid ${palette.black4};
    padding: 10px 6px;
    background-color: transparent;
    color: ${palette.black2};
    outline: none;
  }

  textarea {
    line-height: 1.4;
    font-size: 1.1em;
    border: 1px solid #ddd;
    width: 100%;
    height: 200px;
    resize: none;
    background-color: transparent;
    padding: 10px;
    color: ${palette.black2};
    margin-bottom: 0;
    margin-top: 10px;
  }
`;