export type Review = {
  id?: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
};

export type CamperImage = {
  id?: string;
  thumb: string;
  original: string;
  order?: number;
};

export type Camper = {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: string;
  transmission: string;
  engine: string;
  length?: string;
  width?: string;
  height?: string;
  tank?: string;
  consumption?: string;
  amenities?: string[];
  totalReviews?: number;
  coverImage?: string;
  gallery?: CamperImage[] | string[];
  reviews?: Review[];
};

export type CampersResponse = {
  campers: Camper[];
  total: number;
  page?: number;
  perPage?: number;
  totalPages?: number;
};
