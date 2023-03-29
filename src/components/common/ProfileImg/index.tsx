import { FaUserCircle } from "react-icons/fa";

const ProfileImg = ({ path }: { path: string }) => {
  return (
    <>
      {path ? (
        <img
          src={`https://cardlog-bucket.s3.amazonaws.com/${path}`}
          alt="profile_img"
        />
      ) : (
        <FaUserCircle />
      )}
    </>
  );
};

export default ProfileImg;
