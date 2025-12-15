/**
 * Amenity Options Configuration
 * Maps English values to Thai labels
 */

export interface AmenityOption {
  value: string;
  label: string;
}

export const AMENITY_OPTIONS: AmenityOption[] = [
  // Original amenities
  { value: "Pool", label: "สระว่ายน้ำ" },
  { value: "Gym", label: "ฟิตเนส" },
  { value: "Parking", label: "ที่จอดรถ" },
  { value: "Sauna", label: "ซาวน่า" },
  { value: "Co-working", label: "ห้องทำงานร่วม" },
  { value: "Shuttle", label: "รถรับส่ง" },
  { value: "Security 24/7", label: "รักษาความปลอดภัย 24 ชม." },
  { value: "Garden", label: "สวน" },
  { value: "Playground", label: "สนามเด็กเล่น" },
  { value: "EV Charger", label: "ที่ชาร์จรถไฟฟ้า" },

  // Additional 20 amenities
  { value: "Air Conditioning", label: "เครื่องปรับอากาศ" },
  { value: "Balcony", label: "ระเบียง" },
  { value: "Built-in Wardrobe", label: "ตู้เสื้อผ้าบิวท์อิน" },
  { value: "Elevator", label: "ลิฟต์" },
  { value: "Internet/WiFi", label: "อินเทอร์เน็ต/WiFi" },
  { value: "Washing Machine", label: "เครื่องซักผ้า" },
  { value: "Kitchen", label: "ครัว" },
  { value: "Refrigerator", label: "ตู้เย็น" },
  { value: "Water Heater", label: "เครื่องทำน้ำอุ่น" },
  { value: "Furnished", label: "เฟอร์นิเจอร์ครบ" },
  { value: "Bathtub", label: "อ่างอาบน้ำ" },
  { value: "Pet Friendly", label: "อนุญาตสัตว์เลี้ยง" },
  { value: "CCTV", label: "กล้องวงจรปิด" },
  { value: "Key Card Access", label: "คีย์การ์ด" },
  { value: "Mail Box", label: "ตู้จดหมาย" },
  { value: "Library", label: "ห้องสมุด" },
  { value: "BBQ Area", label: "พื้นที่บาร์บีคิว" },
  { value: "Rooftop", label: "ดาดฟ้า" },
  { value: "Meeting Room", label: "ห้องประชุม" },
  { value: "Laundry Service", label: "บริการซักรีด" },
  { value: "Convenience Store", label: "ร้านสะดวกซื้อ" },
  { value: "Restaurant", label: "ร้านอาหาร" },
  { value: "Jogging Track", label: "ลู่วิ่ง" },
  { value: "Sky Lounge", label: "สกายเลาจน์" },
  { value: "Home Automation", label: "ระบบสมาร์ทโฮม" },
  { value: "Microwave", label: "ไมโครเวฟ" },
  { value: "TV", label: "ทีวี" },
  { value: "Sofa", label: "โซฟา" },
  { value: "Dining Table", label: "โต๊ะอาหาร" },
  { value: "Study Desk", label: "โต๊ะทำงาน" },

  // Additional 10 amenities
  { value: "Steam Room", label: "ห้องอบไอน้ำ" },
  { value: "Tennis Court", label: "สนามเทนนิส" },
  { value: "Basketball Court", label: "สนามบาสเกตบอล" },
  { value: "Yoga Room", label: "ห้องโยคะ" },
  { value: "Game Room", label: "ห้องเกมส์" },
  { value: "Cinema Room", label: "ห้องโฮมเธียเตอร์" },
  { value: "Maid's Room", label: "ห้องแม่บ้าน" },
  { value: "Storage Room", label: "ห้องเก็บของ" },
  { value: "Dryer", label: "เครื่องอบผ้า" },
  { value: "Dishwasher", label: "เครื่องล้างจาน" },
];

// Create a map for quick lookup
const AMENITY_MAP = new Map(AMENITY_OPTIONS.map(a => [a.value, a.label]));

/**
 * Get the Thai label for an amenity value
 * Falls back to the original value if no translation found
 */
export function getAmenityLabel(value: string): string {
  return AMENITY_MAP.get(value) || value;
}
