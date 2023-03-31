export interface PostResponseProps {
  id: number;
  category: number;
  post_type: number;
  thumbnail: string;
  title: string;
  content: string;
  bg_color: string;
  text_color: string;
  update_at: string;
  create_at: string;
}

export interface PostDetailResponseProps extends PostResponseProps {
  user: {
    id: number;
    username: string;
    email: string;
    profile_img: string;
    blog_id: string;
  };
}
