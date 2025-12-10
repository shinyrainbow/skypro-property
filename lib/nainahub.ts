/**
 * NainaHub API Client
 * Now using mock data instead of external API
 */

export interface NainaHubProject {
  projectCode: string;
  projectNameEn: string;
  projectNameTh: string;
  projectLatitude: number | null;
  projectLongitude: number | null;
}

export type PropertyStatus =
  | "pending"
  | "available"
  | "reserved"
  | "under_contract"
  | "sold"
  | "rented"
  | "under_maintenance"
  | "off_market";

export interface NainaHubProperty {
  id: string;
  projectPropertyCode: string | null;
  agentPropertyCode: string | null;
  propertyType: "Condo" | "Townhouse" | "SingleHouse" | "Land";
  propertyTitleEn: string;
  propertyTitleTh: string;
  bedRoom: number | null;
  bedRoomNum: number;
  bathRoom: number | null;
  bathRoomNum: number;
  roomSize: number | null;
  roomSizeNum: number;
  usableAreaSqm: number;
  landSizeSqw: number;
  floor: string;
  building: string;
  imageUrls: string[];
  rentalRate: number | null;
  rentalRateNum: number;
  sellPrice: number | null;
  sellPriceNum: number;
  latitude: number | null;
  longitude: number | null;
  projectCode: string;
  project: NainaHubProject;
  status: PropertyStatus;
  updatedAt: string;
}

export interface NainaHubPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface NainaHubResponse {
  success: boolean;
  data: NainaHubProperty[];
  pagination: NainaHubPagination;
}

export interface FetchPropertiesParams {
  propertyType?: "Condo" | "Townhouse" | "SingleHouse" | "Land";
  listingType?: "rent" | "sale" | "";
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  page?: number;
  limit?: number;
}

// Mock properties data for enhanced properties API
const mockNainaHubProperties: NainaHubProperty[] = [
  {
    id: "nh-001",
    projectPropertyCode: "NHC-001",
    agentPropertyCode: "BW-NH-001",
    propertyType: "Condo",
    propertyTitleEn: "Premium 2BR Condo at Sukhumvit 24",
    propertyTitleTh: "คอนโดพรีเมียม 2 ห้องนอน สุขุมวิท 24",
    bedRoom: 2,
    bedRoomNum: 2,
    bathRoom: 2,
    bathRoomNum: 2,
    roomSize: 75,
    roomSizeNum: 75,
    usableAreaSqm: 75,
    landSizeSqw: 0,
    floor: "28",
    building: "Tower A",
    imageUrls: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
    ],
    rentalRate: 45000,
    rentalRateNum: 45000,
    sellPrice: null,
    sellPriceNum: 0,
    latitude: 13.7280,
    longitude: 100.5650,
    projectCode: "EMQ-24",
    project: {
      projectCode: "EMQ-24",
      projectNameEn: "Emporium Suites by Chatrium",
      projectNameTh: "เอ็มโพเรียม สวีท บาย ชาเทรียม",
      projectLatitude: 13.7280,
      projectLongitude: 100.5650,
    },
    status: "available",
    updatedAt: "2025-11-28T10:00:00Z",
  },
  {
    id: "nh-002",
    projectPropertyCode: "NHC-002",
    agentPropertyCode: "BW-NH-002",
    propertyType: "SingleHouse",
    propertyTitleEn: "Luxury Villa with Pool in Phra Khanong",
    propertyTitleTh: "วิลล่าหรูพร้อมสระว่ายน้ำ พระโขนง",
    bedRoom: 5,
    bedRoomNum: 5,
    bathRoom: 6,
    bathRoomNum: 6,
    roomSize: null,
    roomSizeNum: 0,
    usableAreaSqm: 500,
    landSizeSqw: 200,
    floor: "",
    building: "",
    imageUrls: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    ],
    rentalRate: null,
    rentalRateNum: 0,
    sellPrice: 65000000,
    sellPriceNum: 65000000,
    latitude: 13.7100,
    longitude: 100.5950,
    projectCode: "LUX-PK",
    project: {
      projectCode: "LUX-PK",
      projectNameEn: "Luxury Estates Phra Khanong",
      projectNameTh: "ลักซ์ชัวรี่ เอสเตท พระโขนง",
      projectLatitude: 13.7100,
      projectLongitude: 100.5950,
    },
    status: "available",
    updatedAt: "2025-11-27T14:00:00Z",
  },
  {
    id: "nh-003",
    projectPropertyCode: "NHC-003",
    agentPropertyCode: "BW-NH-003",
    propertyType: "Condo",
    propertyTitleEn: "Modern Studio at Ratchathewi",
    propertyTitleTh: "สตูดิโอทันสมัย ราชเทวี",
    bedRoom: 1,
    bedRoomNum: 1,
    bathRoom: 1,
    bathRoomNum: 1,
    roomSize: 32,
    roomSizeNum: 32,
    usableAreaSqm: 32,
    landSizeSqw: 0,
    floor: "15",
    building: "B",
    imageUrls: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800",
    ],
    rentalRate: 16000,
    rentalRateNum: 16000,
    sellPrice: 3500000,
    sellPriceNum: 3500000,
    latitude: 13.7530,
    longitude: 100.5320,
    projectCode: "IDEO-RT",
    project: {
      projectCode: "IDEO-RT",
      projectNameEn: "Ideo Mobi Rangnam",
      projectNameTh: "ไอดีโอ โมบิ รางน้ำ",
      projectLatitude: 13.7530,
      projectLongitude: 100.5320,
    },
    status: "available",
    updatedAt: "2025-11-26T09:00:00Z",
  },
  {
    id: "nh-004",
    projectPropertyCode: "NHC-004",
    agentPropertyCode: "BW-NH-004",
    propertyType: "Townhouse",
    propertyTitleEn: "Modern Townhome near BTS Bearing",
    propertyTitleTh: "ทาวน์โฮมโมเดิร์น ใกล้ BTS แบริ่ง",
    bedRoom: 3,
    bedRoomNum: 3,
    bathRoom: 3,
    bathRoomNum: 3,
    roomSize: null,
    roomSizeNum: 0,
    usableAreaSqm: 180,
    landSizeSqw: 25,
    floor: "",
    building: "",
    imageUrls: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800",
    ],
    rentalRate: 28000,
    rentalRateNum: 28000,
    sellPrice: 5800000,
    sellPriceNum: 5800000,
    latitude: 13.6120,
    longitude: 100.6050,
    projectCode: "BKM-BR",
    project: {
      projectCode: "BKM-BR",
      projectNameEn: "Baan Klang Muang Bearing",
      projectNameTh: "บ้านกลางเมือง แบริ่ง",
      projectLatitude: 13.6120,
      projectLongitude: 100.6050,
    },
    status: "available",
    updatedAt: "2025-11-25T11:00:00Z",
  },
  {
    id: "nh-005",
    projectPropertyCode: "NHC-005",
    agentPropertyCode: "BW-NH-005",
    propertyType: "Condo",
    propertyTitleEn: "Sky-High Penthouse at Silom",
    propertyTitleTh: "เพนท์เฮาส์ชั้นสูง สีลม",
    bedRoom: 4,
    bedRoomNum: 4,
    bathRoom: 5,
    bathRoomNum: 5,
    roomSize: 320,
    roomSizeNum: 320,
    usableAreaSqm: 320,
    landSizeSqw: 0,
    floor: "55",
    building: "Penthouse Tower",
    imageUrls: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
    ],
    rentalRate: 280000,
    rentalRateNum: 280000,
    sellPrice: 95000000,
    sellPriceNum: 95000000,
    latitude: 13.7270,
    longitude: 100.5340,
    projectCode: "STST-SL",
    project: {
      projectCode: "STST-SL",
      projectNameEn: "The St. Regis Bangkok",
      projectNameTh: "เดอะ เซนต์ รีจิส กรุงเทพ",
      projectLatitude: 13.7270,
      projectLongitude: 100.5340,
    },
    status: "available",
    updatedAt: "2025-11-28T15:00:00Z",
  },
  {
    id: "nh-006",
    projectPropertyCode: "NHC-006",
    agentPropertyCode: "BW-NH-006",
    propertyType: "Condo",
    propertyTitleEn: "Cozy 1BR at Onnut",
    propertyTitleTh: "คอนโด 1 ห้องนอนน่ารัก อ่อนนุช",
    bedRoom: 1,
    bedRoomNum: 1,
    bathRoom: 1,
    bathRoomNum: 1,
    roomSize: 35,
    roomSizeNum: 35,
    usableAreaSqm: 35,
    landSizeSqw: 0,
    floor: "12",
    building: "A",
    imageUrls: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    ],
    rentalRate: 15000,
    rentalRateNum: 15000,
    sellPrice: null,
    sellPriceNum: 0,
    latitude: 13.7060,
    longitude: 100.6000,
    projectCode: "LIFE-ON",
    project: {
      projectCode: "LIFE-ON",
      projectNameEn: "Life Sukhumvit 48",
      projectNameTh: "ไลฟ์ สุขุมวิท 48",
      projectLatitude: 13.7060,
      projectLongitude: 100.6000,
    },
    status: "available",
    updatedAt: "2025-11-24T08:00:00Z",
  },
  {
    id: "nh-007",
    projectPropertyCode: "NHC-007",
    agentPropertyCode: "BW-NH-007",
    propertyType: "SingleHouse",
    propertyTitleEn: "Family Home in Ramkhamhaeng",
    propertyTitleTh: "บ้านครอบครัว รามคำแหง",
    bedRoom: 4,
    bedRoomNum: 4,
    bathRoom: 3,
    bathRoomNum: 3,
    roomSize: null,
    roomSizeNum: 0,
    usableAreaSqm: 280,
    landSizeSqw: 75,
    floor: "",
    building: "",
    imageUrls: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    ],
    rentalRate: 55000,
    rentalRateNum: 55000,
    sellPrice: 15000000,
    sellPriceNum: 15000000,
    latitude: 13.7650,
    longitude: 100.6350,
    projectCode: "PRUK-RK",
    project: {
      projectCode: "PRUK-RK",
      projectNameEn: "Pruklada Ramkhamhaeng",
      projectNameTh: "พฤกลดา รามคำแหง",
      projectLatitude: 13.7650,
      projectLongitude: 100.6350,
    },
    status: "available",
    updatedAt: "2025-11-23T16:00:00Z",
  },
  {
    id: "nh-008",
    projectPropertyCode: "NHC-008",
    agentPropertyCode: "BW-NH-008",
    propertyType: "Condo",
    propertyTitleEn: "River View 2BR at Rama 3",
    propertyTitleTh: "คอนโดวิวแม่น้ำ 2 ห้องนอน พระราม 3",
    bedRoom: 2,
    bedRoomNum: 2,
    bathRoom: 2,
    bathRoomNum: 2,
    roomSize: 68,
    roomSizeNum: 68,
    usableAreaSqm: 68,
    landSizeSqw: 0,
    floor: "32",
    building: "River Wing",
    imageUrls: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800",
    ],
    rentalRate: 42000,
    rentalRateNum: 42000,
    sellPrice: 9500000,
    sellPriceNum: 9500000,
    latitude: 13.6980,
    longitude: 100.5180,
    projectCode: "SV-R3",
    project: {
      projectCode: "SV-R3",
      projectNameEn: "Starview by Eastern Star",
      projectNameTh: "สตาร์วิว บาย อีสเทิร์น สตาร์",
      projectLatitude: 13.6980,
      projectLongitude: 100.5180,
    },
    status: "available",
    updatedAt: "2025-11-22T12:00:00Z",
  },
  {
    id: "nh-009",
    projectPropertyCode: "NHC-009",
    agentPropertyCode: "BW-NH-009",
    propertyType: "Townhouse",
    propertyTitleEn: "Premium Townhome at Kaset-Nawamin",
    propertyTitleTh: "ทาวน์โฮมพรีเมียม เกษตร-นวมินทร์",
    bedRoom: 3,
    bedRoomNum: 3,
    bathRoom: 4,
    bathRoomNum: 4,
    roomSize: null,
    roomSizeNum: 0,
    usableAreaSqm: 220,
    landSizeSqw: 30,
    floor: "",
    building: "",
    imageUrls: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800",
    ],
    rentalRate: null,
    rentalRateNum: 0,
    sellPrice: 8900000,
    sellPriceNum: 8900000,
    latitude: 13.8350,
    longitude: 100.5920,
    projectCode: "TA-KN",
    project: {
      projectCode: "TA-KN",
      projectNameEn: "Town Avenue Kaset-Nawamin",
      projectNameTh: "ทาวน์ อเวนิว เกษตร-นวมินทร์",
      projectLatitude: 13.8350,
      projectLongitude: 100.5920,
    },
    status: "available",
    updatedAt: "2025-11-21T10:00:00Z",
  },
  {
    id: "nh-010",
    projectPropertyCode: "NHC-010",
    agentPropertyCode: "BW-NH-010",
    propertyType: "Condo",
    propertyTitleEn: "Smart 1BR at Hua Mak",
    propertyTitleTh: "คอนโดสมาร์ท 1 ห้องนอน หัวหมาก",
    bedRoom: 1,
    bedRoomNum: 1,
    bathRoom: 1,
    bathRoomNum: 1,
    roomSize: 30,
    roomSizeNum: 30,
    usableAreaSqm: 30,
    landSizeSqw: 0,
    floor: "8",
    building: "C",
    imageUrls: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    ],
    rentalRate: 12000,
    rentalRateNum: 12000,
    sellPrice: 2800000,
    sellPriceNum: 2800000,
    latitude: 13.7550,
    longitude: 100.6250,
    projectCode: "KNT-HM",
    project: {
      projectCode: "KNT-HM",
      projectNameEn: "Knightsbridge Collage Ramkhamhaeng",
      projectNameTh: "ไนท์บริดจ์ คอลลาจ รามคำแหง",
      projectLatitude: 13.7550,
      projectLongitude: 100.6250,
    },
    status: "available",
    updatedAt: "2025-11-20T14:00:00Z",
  },
  {
    id: "nh-011",
    projectPropertyCode: "NHC-011",
    agentPropertyCode: "BW-NH-011",
    propertyType: "Condo",
    propertyTitleEn: "SOLD: Luxury Condo at Wireless Road",
    propertyTitleTh: "ขายแล้ว: คอนโดหรู ถนนวิทยุ",
    bedRoom: 3,
    bedRoomNum: 3,
    bathRoom: 3,
    bathRoomNum: 3,
    roomSize: 150,
    roomSizeNum: 150,
    usableAreaSqm: 150,
    landSizeSqw: 0,
    floor: "38",
    building: "Tower A",
    imageUrls: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    ],
    rentalRate: null,
    rentalRateNum: 0,
    sellPrice: 45000000,
    sellPriceNum: 45000000,
    latitude: 13.7400,
    longitude: 100.5450,
    projectCode: "185-RJ",
    project: {
      projectCode: "185-RJ",
      projectNameEn: "185 Rajadamri",
      projectNameTh: "185 ราชดำริ",
      projectLatitude: 13.7400,
      projectLongitude: 100.5450,
    },
    status: "sold",
    updatedAt: "2025-10-15T09:00:00Z",
  },
  {
    id: "nh-012",
    projectPropertyCode: "NHC-012",
    agentPropertyCode: "BW-NH-012",
    propertyType: "SingleHouse",
    propertyTitleEn: "SOLD: Pool Villa at Pattaya",
    propertyTitleTh: "ขายแล้ว: พูลวิลล่า พัทยา",
    bedRoom: 4,
    bedRoomNum: 4,
    bathRoom: 4,
    bathRoomNum: 4,
    roomSize: null,
    roomSizeNum: 0,
    usableAreaSqm: 350,
    landSizeSqw: 120,
    floor: "",
    building: "",
    imageUrls: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
    ],
    rentalRate: null,
    rentalRateNum: 0,
    sellPrice: 25000000,
    sellPriceNum: 25000000,
    latitude: 12.9350,
    longitude: 100.8900,
    projectCode: "PV-PTY",
    project: {
      projectCode: "PV-PTY",
      projectNameEn: "Palm Oasis Pattaya",
      projectNameTh: "ปาล์ม โอเอซิส พัทยา",
      projectLatitude: 12.9350,
      projectLongitude: 100.8900,
    },
    status: "sold",
    updatedAt: "2025-09-20T11:00:00Z",
  },
  {
    id: "nh-013",
    projectPropertyCode: "NHC-013",
    agentPropertyCode: "BW-NH-013",
    propertyType: "Condo",
    propertyTitleEn: "RENTED: Studio at Victory Monument",
    propertyTitleTh: "เช่าแล้ว: สตูดิโอ อนุสาวรีย์ชัยฯ",
    bedRoom: 1,
    bedRoomNum: 1,
    bathRoom: 1,
    bathRoomNum: 1,
    roomSize: 28,
    roomSizeNum: 28,
    usableAreaSqm: 28,
    landSizeSqw: 0,
    floor: "10",
    building: "B",
    imageUrls: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    ],
    rentalRate: 14000,
    rentalRateNum: 14000,
    sellPrice: null,
    sellPriceNum: 0,
    latitude: 13.7650,
    longitude: 100.5380,
    projectCode: "IDEO-VM",
    project: {
      projectCode: "IDEO-VM",
      projectNameEn: "Ideo Q Victory",
      projectNameTh: "ไอดีโอ คิว วิคตอรี่",
      projectLatitude: 13.7650,
      projectLongitude: 100.5380,
    },
    status: "rented",
    updatedAt: "2025-10-01T08:00:00Z",
  },
  {
    id: "nh-014",
    projectPropertyCode: "NHC-014",
    agentPropertyCode: "BW-NH-014",
    propertyType: "Townhouse",
    propertyTitleEn: "SOLD: Corner Townhouse at Bangkae",
    propertyTitleTh: "ขายแล้ว: ทาวน์โฮมมุม บางแค",
    bedRoom: 3,
    bedRoomNum: 3,
    bathRoom: 2,
    bathRoomNum: 2,
    roomSize: null,
    roomSizeNum: 0,
    usableAreaSqm: 160,
    landSizeSqw: 22,
    floor: "",
    building: "",
    imageUrls: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800",
    ],
    rentalRate: null,
    rentalRateNum: 0,
    sellPrice: 4200000,
    sellPriceNum: 4200000,
    latitude: 13.7180,
    longitude: 100.4050,
    projectCode: "BKM-BK",
    project: {
      projectCode: "BKM-BK",
      projectNameEn: "Baan Klang Muang Bangkae",
      projectNameTh: "บ้านกลางเมือง บางแค",
      projectLatitude: 13.7180,
      projectLongitude: 100.4050,
    },
    status: "sold",
    updatedAt: "2025-08-25T14:00:00Z",
  },
  {
    id: "nh-015",
    projectPropertyCode: "NHC-015",
    agentPropertyCode: "BW-NH-015",
    propertyType: "Condo",
    propertyTitleEn: "RENTED: 2BR at Asoke",
    propertyTitleTh: "เช่าแล้ว: 2 ห้องนอน อโศก",
    bedRoom: 2,
    bedRoomNum: 2,
    bathRoom: 2,
    bathRoomNum: 2,
    roomSize: 65,
    roomSizeNum: 65,
    usableAreaSqm: 65,
    landSizeSqw: 0,
    floor: "22",
    building: "Tower A",
    imageUrls: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    ],
    rentalRate: 38000,
    rentalRateNum: 38000,
    sellPrice: null,
    sellPriceNum: 0,
    latitude: 13.7380,
    longitude: 100.5610,
    projectCode: "EDGE-23",
    project: {
      projectCode: "EDGE-23",
      projectNameEn: "Edge Sukhumvit 23",
      projectNameTh: "เอดจ์ สุขุมวิท 23",
      projectLatitude: 13.7380,
      projectLongitude: 100.5610,
    },
    status: "rented",
    updatedAt: "2025-10-10T16:00:00Z",
  },
];

/**
 * Fetch properties from mock data (simulates NainaHub API)
 */
export async function fetchNainaHubProperties(
  params: FetchPropertiesParams = {}
): Promise<NainaHubResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  let filteredData = [...mockNainaHubProperties];

  // Apply filters
  if (params.propertyType) {
    filteredData = filteredData.filter((p) => p.propertyType === params.propertyType);
  }

  if (params.listingType === "rent") {
    filteredData = filteredData.filter((p) => p.rentalRateNum > 0);
  } else if (params.listingType === "sale") {
    filteredData = filteredData.filter((p) => p.sellPriceNum > 0);
  }

  if (params.minPrice !== undefined) {
    filteredData = filteredData.filter((p) => {
      const price = p.rentalRateNum > 0 ? p.rentalRateNum : p.sellPriceNum;
      return price >= params.minPrice!;
    });
  }

  if (params.maxPrice !== undefined) {
    filteredData = filteredData.filter((p) => {
      const price = p.rentalRateNum > 0 ? p.rentalRateNum : p.sellPriceNum;
      return price <= params.maxPrice!;
    });
  }

  if (params.bedrooms !== undefined) {
    filteredData = filteredData.filter((p) => p.bedRoomNum >= params.bedrooms!);
  }

  // Pagination
  const page = params.page || 1;
  const limit = params.limit || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return {
    success: true,
    data: paginatedData,
    pagination: {
      total: filteredData.length,
      page,
      limit,
      totalPages: Math.ceil(filteredData.length / limit),
    },
  };
}

/**
 * Fetch a single property by ID from mock data
 */
export async function fetchNainaHubPropertyById(
  id: string
): Promise<NainaHubProperty | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50));
  return mockNainaHubProperties.find((p) => p.id === id) || null;
}
