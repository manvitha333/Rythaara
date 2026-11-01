export const brand = {
  name: 'RYTHARA',
  tagline: 'మా ఊరి పంట — ప్రతి ఇంటికి',
  englishTagline: 'Grown by Farmers. Delivered to Your Family.',
  whatsappNumber: '917093037497',
  email: 'hello@rythara.example',
  phone: '+91 70930 37497',
  address: 'Kollipara, Guntur District, Andhra Pradesh, India',
  promise: 'From Farmer to Customer. No Unnecessary Middlemen. Just Honest Quality.',
};

export const buildWhatsAppOrderLink = (lines: string[]): string => {
  const intro = `Hello ${brand.name}, I would like to place an order:`;
  const body = [intro, '', ...lines].join('\n');
  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(body)}`;
};

export const buildWhatsAppEnquiryLink = (productName: string): string => {
  const body = `Hello ${brand.name}, I would like to enquire about ${productName}.`;
  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(body)}`;
};
