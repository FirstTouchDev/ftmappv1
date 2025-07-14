export const SERVICETYPES = [
  { name: 'Sunday Service', value: 'Sunday Service' },
  { name: 'Plug In', value: 'Plug In' },
  { name: 'JC Kids', value: 'JC Kids' },
  { name: 'TXT', value: 'TXT' },
  { name: 'Teenagents', value: 'Teenagents' },
] as const;

export type ServiceTypeOption = typeof SERVICETYPES[number];
export type ServiceTypeValue = ServiceTypeOption['value'];
export type ServiceTypeList = readonly ServiceTypeOption[];