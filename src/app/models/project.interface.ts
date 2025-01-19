export interface Project {
    id: number;
    name: string;
    location: string;
    imageUrl: string;
    siteMapUrl: string;
    propertyType: string;
    description?: string;
    maxPlots?: number;
    availablePlotsArray?: number[];
  } 