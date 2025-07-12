export const GENDERS = [
  { name: 'Male', value: 'male' },
  { name: 'Female', value: 'female' }
] as const;

export type GenderOption = typeof GENDERS[number];
export type GenderValue = GenderOption['value'];
export type GenderList = readonly GenderOption[];