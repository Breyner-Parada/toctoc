import { type } from "os";

export interface IVideo {
    caption: string;
    video: {
      asset: {
        _id: string;
        url: string;
      };
    };
    _id: string;
    postedBy: {
      _id: string;
      userName: string;
      image: string;
    };
    likes: {
      postedBy: {
        _id: string;
        userName: string;
        image: string;
      };
    }[];
    comments: {
      comment: string;
      length?: number;
      _key?: string;
      postedBy: {
        _ref: string;
        _id: string;
    };
    }[];
    userId: string;
  }
  
export interface IUser {
    _id: string;
    _type: string;
    userName: string;
    image: string;
  }

export type GoogleUser = {
  name: string;
  picture: string;
  sub: string;
}

export type TUser =  {
  _id: string;
  _type: string;
  userName: string;
  image: string;
}