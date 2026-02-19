// Raw database row types — match the Supabase schema exactly.

export interface EventRow {
  id: string;
  title: string;
  description: string;
  event_date: string;
  event_end: string | null;
  location: string;
  is_online: boolean;
  is_free: boolean;
  price: string | null;
  category_id: string;
  registration_url: string | null;
  likes: number;
  source_post_url: string | null;
  post_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface SocietyRow {
  id: string;
  name: string;
  instagram_handle: string;
  description: string | null;
  bio_url: string | null;
  university_id: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CityRow {
  id: string;
  name: string;
}

export interface UniversityRow {
  id: string;
  name: string;
  short_name: string;
  city_id: string | null;
  created_at: string;
}

export interface UniversityWithCity extends UniversityRow {
  cities: CityRow | null;
}

export interface CategoryRow {
  id: string;
  name: string;
}

export interface PostImageRow {
  id: string;
  s3_url: string;
  created_at: string;
}

export interface EventImageRow {
  event_id: string;
  post_image_id: string;
  post_id: string | null;
  image_index: number | null;
  created_at: string;
}

export interface N8nEventStatusRow {
  id: string;
  event_id: string;
  status: string;
  ig_post_status: string;
  ig_generated_image_url: string | null;
  created_at: string;
  updated_at: string;
}

// Joined shape returned by getEvents() — events with nested relations.
export interface EventWithRelations extends EventRow {
  categories: CategoryRow | null;
  event_societies: Array<{
    societies: (SocietyRow & {
      universities: UniversityWithCity | null;
    }) | null;
  }>;
  event_images: Array<{
    post_id: string | null;
    image_index: number | null;
    post_images: Pick<PostImageRow, 's3_url'> | null;
  }>;
}

// Shape returned by getSocieties() — societies with nested university.
export interface SocietyWithUniversity extends SocietyRow {
  universities: UniversityRow | null;
}

// ---- Transformed frontend types ----

export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime?: string;
  city: string;
  university: string;
  societyName: string;
  locationName: string;
  imageUrl: string;
  externalUrl: string;
  tags: string[];
  interestedCount: number;
  savedCount: number;
  createdAt: string;
  priceLabel: string;
}

export interface Society {
  id: string;
  name: string;
  instagram: string;
  description: string;
  university: string;
  imageUrl: string;
  bioUrl: string;
}

export interface University {
  id: string;
  name: string;
  shortName: string;
  cityName: string | null;
}

export interface City {
  id: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
}
