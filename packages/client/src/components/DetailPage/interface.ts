import type { DrawerProps } from "antd";
import type { ReactNode } from "react";

export interface DetailPageProps {
  songs?: any[];
  headerInfo?: DetailHeaderProps;
  isLoading?:boolean
  [keys: string]: any;
}

export interface DetailMainProps {
  [keys: string]: any;
}

export interface DetailCommentProps extends DrawerProps {
  customNode?: ReactNode;
  [keys: string]: any;
}

export interface DetailHeaderProps {
  picUrl?: string;
  titleTagIcon?: boolean;
  titleTagIconText?: boolean | string;
  titleName?: string;
  creator?: string;
  creatorAvatar?: string;
  createTime?: string | number;
  tags?: string[];
  sMessage?: string;
  [keys: string]: any;
}
