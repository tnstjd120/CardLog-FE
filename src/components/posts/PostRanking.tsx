/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { emotionStyledProps } from "types/emotionStyled";
import { BsTrophy } from "react-icons/bs";
import { api } from "libs/axios";
import API_Path from "utils/path/API_Path";
import { RankingResponseProps } from "types/Post";
import Loading from "../common/Loading";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { palette } from "styles/theme";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { ThemeStateProps } from "store/themeType";
import { useTheme } from "@emotion/react";

const PostRanking = () => {
  const { themeType } = useSelector<RootState>(
    (state) => state.themeType
  ) as ThemeStateProps;

  const theme = useTheme();
  const backgroundColor = theme[themeType].backgroundColor;

  const navigate = useNavigate();

  const [rankings, setRankings] = useState<RankingResponseProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const readRankings = async () => {
    setIsLoading(true);

    await api
      .get(API_Path.RANKINGS)
      .then((res) => {
        setRankings(res.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    readRankings();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <PostRankingContainer backgroundColor={backgroundColor}>
      <h2>Top Writers</h2>

      <ul>
        {rankings.map((user) => (
          <li
            key={user.id}
            onClick={() =>
              (window.location.href = `http://cardlog.life/?blog_id=${user.blog_id}`)
            }
          >
            <div className="left_area">
              <div className="img_wrap">
                {user.profile_img ? (
                  <img
                    src={`https://cardlog-bucket.s3.amazonaws.com/${user.profile_img}`}
                    alt="profile_img"
                  />
                ) : (
                  <FaUserCircle />
                )}
              </div>

              <div className="text_wrap">
                <p>{user.username}</p>
                <span>{user.blog_id}</span>
              </div>
            </div>

            <div className="right_area">
              <BsTrophy /> <span>{user.post_count}</span>
            </div>
          </li>
        ))}
      </ul>
    </PostRankingContainer>
  );
};

export default PostRanking;

const PostRankingContainer = styled.div<emotionStyledProps>`
  width: 100%;
  height: 60%;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow-y: auto;

  h2 {
    text-align: center;
    padding: 20px 0;
    font-size: 1rem;
    font-weight: 400;
    position: sticky;
    top: 0;
    background-color: ${(props) => props.backgroundColor};
  }

  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 15px 0;
      border-bottom: 1px solid #ddd;
      cursor: pointer;

      .left_area {
        display: flex;
        align-items: center;

        .img_wrap {
          width: 60px;
          height: 60px;
          border-radius: 4px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: ${palette.gray0};

          & > svg {
            font-size: 2.5em;
            color: ${palette.white};
          }
        }

        .text_wrap {
          font-weight: 400;
          font-size: 1rem;
          padding: 0 8px;

          span {
            font-size: 0.9rem;
          }
        }
      }

      .right_area {
        display: flex;
        align-items: center;
        font-weight: 500;
        font-size: 1.5rem;

        span {
          padding-left: 10px;
          font-size: 1.2rem;
        }
      }
    }
  }
`;
