export interface CategoryResponseProps {
  id: number;
  user: number;
  name: string;
  update_at: string;
  create_at: string;
}

export interface LinkListResponseProps {
  id: number;
  user: number;
  icon_type: number;
  url: string;
}

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

export interface UserResponseProps {
  id: number;
  username: string;
  email: string;
  profile_img: string;
  about: string;
  phone: string;
  blog_name: string;
  blog_id: string;
  update_at: string;
  create_at: string;
}
