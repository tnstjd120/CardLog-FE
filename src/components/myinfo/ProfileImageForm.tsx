import styled from "@emotion/styled";
import Button from "components/common/Button";
import { accessApi } from "libs/axios";
import { useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { MyInfoState, setMyInfo } from "store/myInfo";
import { palette } from "styles/theme";
import API_Path from "utils/path/API_Path";

const ProfileImageForm = () => {
  const myInfo = useSelector<RootState>((state) => state.myInfo) as MyInfoState;
  const dispatch = useDispatch();
  const profileImageRef = useRef<HTMLInputElement>(null);

  const handleClickProfileImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const file = (e.target.files as FileList)[0];

    if (file) {
      const formData = new FormData();
      formData.append("files", file);
      formData.append("id", myInfo.id + "");

      await accessApi
        .post(`${API_Path.PROFILE_IMAGE}?host_id=profile`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          dispatch(setMyInfo({ ...myInfo, profile_img: res.data.profile_img }));
        })
        .catch((error) => console.log(error));
    } else {
      console.log("error");
      return;
    }
  };

  return (
    <ProfileImage>
      <div className="img_wrap">
        {myInfo.profile_img ? (
          <img
            src={`https://cardlog-bucket.s3.amazonaws.com/${myInfo.profile_img}`}
            alt=""
          />
        ) : (
          <FaUserCircle />
        )}

        <Button>
          <MdModeEditOutline
            className="text-white text-lg"
            onClick={() => {
              !!profileImageRef.current && profileImageRef.current.click();
            }}
          />
          <input
            type="file"
            ref={profileImageRef}
            accept=".jpg, .jpeg, .png"
            onChange={handleClickProfileImage}
          />
        </Button>
      </div>
    </ProfileImage>
  );
};

export default ProfileImageForm;

const ProfileImage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;

  & .img_wrap {
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${palette.gray0};
    border-radius: 4px;
    overflow: hidden;
    position: relative;

    & > svg {
      font-size: 8em;
      color: ${palette.white};
    }

    button {
      position: absolute;
      right: 4px;
      bottom: 4px;
      width: 36px;
      height: 36px;
      background-color: #fff;
      color: #333;
      font-size: 1.5rem;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background-color: ${palette.gray1};
      }

      input[type="file"] {
        display: none;
      }
    }
  }
`;
