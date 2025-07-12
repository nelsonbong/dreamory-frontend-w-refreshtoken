import icon from './icon.png';

export interface Event {
  id: string;
  name: string;
  location: string;
  status: 'Ongoing' | 'Completed';
  startDate: string;
  endDate: string;
  thumbnailUrl: string;
}

export const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Tech Conference 2025',
    location: 'Kuala Lumpur',
    status: 'Ongoing',
    startDate: '2025-08-01',
    endDate: '2025-08-03',
    thumbnailUrl: icon,
  },
  {
    id: '2',
    name: 'Startup Meetup',
    location: 'Penang',
    status: 'Ongoing',
    startDate: '2025-07-15',
    endDate: '2025-07-17',
    thumbnailUrl: icon,
  },
  {
    id: '3',
    name: 'Design Expo',
    location: 'Johor Bahru',
    status: 'Completed',
    startDate: '2025-06-01',
    endDate: '2025-06-03',
    thumbnailUrl: icon,
  },
  {
    id: '4',
    name: 'Finance Conference 2025',
    location: 'Kuala Lumpur',
    status: 'Completed',
    startDate: '2025-08-01',
    endDate: '2025-08-03',
    thumbnailUrl: icon,
  },
  {
    id: '5',
    name: 'Tech 2025',
    location: 'Kuala Lumpur',
    status: 'Ongoing',
    startDate: '2025-08-01',
    endDate: '2025-08-03',
    thumbnailUrl: icon,
  },
  {
    id: '6',
    name: 'For year 2025',
    location: 'Kuala Lumpur',
    status: 'Ongoing',
    startDate: '2025-08-01',
    endDate: '2025-08-03',
    thumbnailUrl: icon,
  },
  {
    id: '7',
    name: 'Exibition 2025',
    location: 'Kuala Lumpur',
    status: 'Completed',
    startDate: '2025-08-01',
    endDate: '2025-08-03',
    thumbnailUrl: icon,
  },
  {
    id: '8',
    name: 'iPhone 2025',
    location: 'Kuala Lumpur',
    status: 'Completed',
    startDate: '2025-08-01',
    endDate: '2025-08-03',
    thumbnailUrl: icon,
  },
  {
    id: '9',
    name: 'Samsung 2025',
    location: 'Kuala Lumpur',
    status: 'Completed',
    startDate: '2025-08-01',
    endDate: '2025-08-03',
    thumbnailUrl: icon,
  },
  {
    id: '10',
    name: 'Hello 2025',
    location: 'Kuala Lumpur',
    status: 'Ongoing',
    startDate: '2025-08-01',
    endDate: '2025-08-03',
    thumbnailUrl: icon,
  },
];