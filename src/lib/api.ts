import axios from 'axios';
import { BookingFormData } from '@/types/booking';

export const api = axios.create({
  baseURL: 'https://campers-api.goit.study',
});

type GetCampersParams = {
  page?: number;
  limit?: number;
  location?: string;
  form?: string;
  engine?: string;
  transmission?: string;
};

export async function getCampers(params: GetCampersParams = {}) {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.set('page', String(params.page));
  if (params.limit) searchParams.set('perPage', String(params.limit));

  if (params.location?.trim()) {
    searchParams.set('location', params.location.trim());
  }

  if (params.form) {
    searchParams.set('form', params.form);
  }

  if (params.engine) {
    searchParams.set('engine', params.engine);
  }

  if (params.transmission) {
    searchParams.set('transmission', params.transmission);
  }

  const query = searchParams.toString();
  const url = query ? `/campers?${query}` : '/campers';

  const { data } = await api.get(url);
  return data;
}

export async function getCamperById(id: string) {
  const { data } = await api.get(`/campers/${id}`);
  return data;
}

export async function getCamperReviews(id: string) {
  const { data } = await api.get(`/campers/${id}/reviews`);
  return data;
}

export async function bookCamper(id: string, payload: BookingFormData) {
  const { data } = await api.post(`/campers/${id}/bookings`, payload);
  return data;
}
