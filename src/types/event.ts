export type EventId = {
  id: string;
  name: string;
  location: string;
  status: string;
  startDate: string;
  endDate: string;
  thumbnail: string;
};

export type EventFormData = {
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  thumbnail: FileList;
};

export type ListEvent = {
  id: string;
  name: string;
  location: string;
  status: string;
  startDate: string;
  endDate: string;
};

export type SidebarItem = {
  label: string;
  path: string;
};
