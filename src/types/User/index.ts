export interface LinkListResponseProps {
  id: number;
  user: number;
  icon_type: number;
  url: string;
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
  github_url: string;
  blog_url: string;
  update_at: string;
  create_at: string;
}
