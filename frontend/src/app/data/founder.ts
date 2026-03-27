export interface FounderInfo {
  name: string;
  title: string;
  photo: string;
  about: string;
}

export const getFounderInfo = (): FounderInfo => {
  const stored = localStorage.getItem('founder_info');
  if (stored) {
    return JSON.parse(stored);
  }

  return {
    name: 'Mehul Pokra',
    title: 'Founder & CEO',
    photo: '', // Will be set by admin
    about: `Mehul Pokra is a young entrepreneur and the driving force behind The Travel Paradise. With a vision to simplify and elevate the way people travel, he started the brand to make curated, hassle-free, and memorable travel experiences accessible to everyone.

Believing that travel is not just about destinations but about stories and experiences, Mehul focuses on blending smart planning with a deep understanding of modern travelers' needs. His approach is built on innovation, customer-first thinking, and a passion for creating journeys that people truly remember.

As a founder, he is constantly exploring new ideas, trends, and opportunities to redefine travel services and build a brand that stands for trust, quality, and unforgettable experiences.`
  };
};

export const setFounderInfo = (info: FounderInfo) => {
  localStorage.setItem('founder_info', JSON.stringify(info));
};
