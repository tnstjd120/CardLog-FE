/** @jsxImportSource @emotion/react */
import React from "react";
import RouterInfo from "../../routes/RouterInfo";
import ProfileImg from "../ProfileImg";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { UserState } from "store/user";
import { palette } from "styles/theme";

const ProfileInfo: React.FC = (): JSX.Element => {
  const user = useSelector<RootState>((state) => state.user) as UserState;

  return (
    <ProfileInfoContainer>
      <h2>
        <Link to={`${RouterInfo.HOME.path}?blog_id=${user.blog_id}`}>
          {user.blog_name}
        </Link>
      </h2>

      <figure>
        <div className="img_wrap">
          <ProfileImg path={user.profile_img} />
        </div>

        <figcaption>{user.username}</figcaption>
      </figure>
    </ProfileInfoContainer>
  );
};

export default ProfileInfo;

const ProfileInfoContainer = styled.div`
  h2 {
    font-size: 1.2em;
    font-weight: 500;
    text-align: center;
    padding: 0 10px;

    a {
      color: inherit;
      width: 100%;
      display: block;
      word-break: break-all;
    }
  }

  figure {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid ${palette.gray1};

    .img_wrap {
      width: 150px;
      height: 150px;
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      background-color: ${palette.gray0};
      svg {
        font-size: 8em;
        color: ${palette.white};
      }
    }

    figcaption {
      font-size: 1em;
      font-weight: 400;
    }
  }
`;
