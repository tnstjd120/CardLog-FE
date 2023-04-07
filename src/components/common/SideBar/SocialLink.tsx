/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { UserState } from "store/user";
import { palette } from "styles/theme";
import { FaBlogger, FaGithubSquare } from "react-icons/fa";

const SocialLink: React.FC = (): JSX.Element => {
  const user = useSelector<RootState>((state) => state.user) as UserState;

  return (
    <SocialLinkContainer>
      {user.github_url && (
        <a href={user.github_url} target="_blank" rel="noreferrer">
          <FaGithubSquare />
        </a>
      )}

      {user.blog_url && (
        <a href={user.blog_url} target="_blank" rel="noreferrer">
          <FaBlogger />
        </a>
      )}
    </SocialLinkContainer>
  );
};

export default SocialLink;

const SocialLinkContainer = styled.div`
  position: absolute;
  left: 20px;
  bottom: 0;
  font-size: 2.3em;
  a {
    color: inherit;
  }
`;
