export interface DetailPageProps {
  songs?: any[];
  headerInfo?: DetailHeaderProps;
  [keys: string]: any;
}

export interface DetailMainProps {
  [keys: string]: any;
}

export interface DetailContentProps {
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
