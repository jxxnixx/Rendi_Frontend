export interface ASignUpProps {
  username: string;
  password: string;
  nickname: string;
  email: string;
  phonenum: string;
  birth: string;
  sex: string;
  interests: string[];
  emailAgreeYn: string;
  phoneAgreeYn: string;
}

export interface ASocialSignUpProps {
  provider: string;
  username: string;
  password: string;
  nickname: string;
  email: string;
  phonenum: string;
  birth: string;
  sex: string;
  interests: string[];
  emailAgreeYn: string;
  phoneAgreeYn: string;
}

export interface ALogInProps {
  username: string;
  password: string;
}

export interface ASocialLoginProps {
  provider: string;
  email: string;
}

export interface AEditInfosProps {
  email?: string;
  nickname?: string;
  birth?: string;
  phonenum?: string;
}

export interface AEmailVeriProps {
  nickname: string;
  email: string;
}

export interface AFindIDProps {
  nickname: string;
  email: string;
}

export interface AFindPWProps {
  email: string;
  password: string;
}

export interface APopularSearchProps {
  keyword: string;
  searchCount: number;
}

export interface ARecentProps {
  productIds: any;
  accessToken: string;
}

export interface FilteredProduct {
  sortName?: string;
  parentCategory?: string;
  childCategory?: string;
  colourName?: string;
  minPrice?: number;
  maxPrice?: number;
}
