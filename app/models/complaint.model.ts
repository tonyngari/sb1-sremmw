export interface Complaint {
  id?: string;
  title: string;
  description: string;
  category: 'WATER' | 'SEWAGE' | 'ROAD' | 'STREETLIGHT';
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  imageUrl?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED';
  createdAt: Date;
  updatedAt: Date;
}