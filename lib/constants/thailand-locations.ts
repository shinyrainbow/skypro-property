// Thailand Districts and Subdistricts Constants
// Currently focused on Chiang Mai Province

export interface Subdistrict {
  id: string;
  nameTh: string;
  nameEn: string;
  postalCode: string;
}

export interface District {
  id: string;
  nameTh: string;
  nameEn: string;
  subdistricts: Subdistrict[];
}

export interface Province {
  id: string;
  nameTh: string;
  nameEn: string;
  districts: District[];
}

// Chiang Mai Province
export const CHIANG_MAI: Province = {
  id: "chiang-mai",
  nameTh: "เชียงใหม่",
  nameEn: "Chiang Mai",
  districts: [
    {
      id: "mueang-chiang-mai",
      nameTh: "เมืองเชียงใหม่",
      nameEn: "Mueang Chiang Mai",
      subdistricts: [
        { id: "sri-phum", nameTh: "ศรีภูมิ", nameEn: "Si Phum", postalCode: "50200" },
        { id: "phra-sing", nameTh: "พระสิงห์", nameEn: "Phra Sing", postalCode: "50200" },
        { id: "haiya", nameTh: "หายยา", nameEn: "Haiya", postalCode: "50100" },
        { id: "chang-moi", nameTh: "ช้างม่อย", nameEn: "Chang Moi", postalCode: "50300" },
        { id: "chang-klan", nameTh: "ช้างคลาน", nameEn: "Chang Khlan", postalCode: "50100" },
        { id: "wat-ket", nameTh: "วัดเกต", nameEn: "Wat Ket", postalCode: "50000" },
        { id: "chang-phueak", nameTh: "ช้างเผือก", nameEn: "Chang Phueak", postalCode: "50300" },
        { id: "suthep", nameTh: "สุเทพ", nameEn: "Suthep", postalCode: "50200" },
        { id: "mae-hia", nameTh: "แม่เหียะ", nameEn: "Mae Hia", postalCode: "50100" },
        { id: "pa-daet", nameTh: "ป่าแดด", nameEn: "Pa Daet", postalCode: "50100" },
        { id: "nong-hoi", nameTh: "หนองหอย", nameEn: "Nong Hoi", postalCode: "50000" },
        { id: "tha-sala", nameTh: "ท่าศาลา", nameEn: "Tha Sala", postalCode: "50000" },
        { id: "nong-pa-khrang", nameTh: "หนองป่าครั่ง", nameEn: "Nong Pa Khrang", postalCode: "50000" },
        { id: "fa-ham", nameTh: "ฟ้าฮ่าม", nameEn: "Fa Ham", postalCode: "50000" },
        { id: "pa-tan", nameTh: "ป่าตัน", nameEn: "Pa Tan", postalCode: "50300" },
        { id: "san-phi-suea", nameTh: "สันผีเสื้อ", nameEn: "San Phi Suea", postalCode: "50300" },
      ],
    },
    {
      id: "chom-thong",
      nameTh: "จอมทอง",
      nameEn: "Chom Thong",
      subdistricts: [
        { id: "ban-luang", nameTh: "บ้านหลวง", nameEn: "Ban Luang", postalCode: "50160" },
        { id: "chom-thong-sub", nameTh: "ข่วงเปา", nameEn: "Khuang Pao", postalCode: "50160" },
        { id: "sop-tia", nameTh: "สบเตี๊ยะ", nameEn: "Sop Tia", postalCode: "50160" },
        { id: "ban-paeng", nameTh: "บ้านแปะ", nameEn: "Ban Pae", postalCode: "50240" },
        { id: "doi-lo", nameTh: "ดอยแก้ว", nameEn: "Doi Kaeo", postalCode: "50160" },
        { id: "wang-lung", nameTh: "แม่สอย", nameEn: "Mae Soi", postalCode: "50240" },
      ],
    },
    {
      id: "mae-chaem",
      nameTh: "แม่แจ่ม",
      nameEn: "Mae Chaem",
      subdistricts: [
        { id: "chang-khoeng", nameTh: "ช่างเคิ่ง", nameEn: "Chang Khoeng", postalCode: "50270" },
        { id: "tha-pha", nameTh: "ท่าผา", nameEn: "Tha Pha", postalCode: "50270" },
        { id: "ban-thap", nameTh: "บ้านทับ", nameEn: "Ban Thap", postalCode: "50270" },
        { id: "mae-suek", nameTh: "แม่ศึก", nameEn: "Mae Suek", postalCode: "50270" },
        { id: "mae-na-chon", nameTh: "แม่นาจร", nameEn: "Mae Na Chon", postalCode: "50270" },
        { id: "pa-pae", nameTh: "ปางหินฝน", nameEn: "Pang Hin Fon", postalCode: "50270" },
        { id: "kong-khaek", nameTh: "กองแขก", nameEn: "Kong Khaek", postalCode: "50270" },
      ],
    },
    {
      id: "chiang-dao",
      nameTh: "เชียงดาว",
      nameEn: "Chiang Dao",
      subdistricts: [
        { id: "chiang-dao-sub", nameTh: "เชียงดาว", nameEn: "Chiang Dao", postalCode: "50170" },
        { id: "mae-na", nameTh: "แม่นะ", nameEn: "Mae Na", postalCode: "50170" },
        { id: "muang-ngai", nameTh: "เมืองงาย", nameEn: "Mueang Ngai", postalCode: "50170" },
        { id: "muang-khong", nameTh: "เมืองคอง", nameEn: "Mueang Khong", postalCode: "50170" },
        { id: "ping-khong", nameTh: "ปิงโค้ง", nameEn: "Ping Khong", postalCode: "50170" },
        { id: "tung-khao-pluang", nameTh: "ทุ่งข้าวพวง", nameEn: "Thung Khao Phuang", postalCode: "50170" },
      ],
    },
    {
      id: "doi-saket",
      nameTh: "ดอยสะเก็ด",
      nameEn: "Doi Saket",
      subdistricts: [
        { id: "choeng-doi", nameTh: "เชิงดอย", nameEn: "Choeng Doi", postalCode: "50220" },
        { id: "san-pu-loei", nameTh: "สันปูเลย", nameEn: "San Pu Loei", postalCode: "50220" },
        { id: "luang-nuea", nameTh: "ลวงเหนือ", nameEn: "Luang Nuea", postalCode: "50220" },
        { id: "pa-miang", nameTh: "ป่าเมี่ยง", nameEn: "Pa Miang", postalCode: "50220" },
        { id: "samoeng-tai", nameTh: "สำราญราษฎร์", nameEn: "Samran Rat", postalCode: "50220" },
        { id: "pa-lan", nameTh: "แม่คือ", nameEn: "Mae Khue", postalCode: "50220" },
        { id: "doi-saket-sub", nameTh: "ตลาดขวัญ", nameEn: "Talat Khwan", postalCode: "50220" },
        { id: "san-khu", nameTh: "สันกู่", nameEn: "San Ku", postalCode: "50220" },
        { id: "pa-pong", nameTh: "ป่าป้อง", nameEn: "Pa Pong", postalCode: "50220" },
        { id: "traphang-tom", nameTh: "ตลาดใหญ่", nameEn: "Talat Yai", postalCode: "50220" },
        { id: "mae-ho-phra", nameTh: "แม่โป่ง", nameEn: "Mae Pong", postalCode: "50220" },
        { id: "mae-kue", nameTh: "แม่ฮ้อยเงิน", nameEn: "Mae Hoi Ngoen", postalCode: "50220" },
      ],
    },
    {
      id: "mae-taeng",
      nameTh: "แม่แตง",
      nameEn: "Mae Taeng",
      subdistricts: [
        { id: "san-mahaphon", nameTh: "สันมหาพน", nameEn: "San Mahaphon", postalCode: "50150" },
        { id: "mae-taeng-sub", nameTh: "แม่แตง", nameEn: "Mae Taeng", postalCode: "50150" },
        { id: "khilek", nameTh: "ขี้เหล็ก", nameEn: "Khilek", postalCode: "50150" },
        { id: "cho-lae", nameTh: "ช่อแล", nameEn: "Cho Lae", postalCode: "50150" },
        { id: "khi-lek-pattana", nameTh: "แม่หอพระ", nameEn: "Mae Ho Phra", postalCode: "50150" },
        { id: "san-khwang", nameTh: "สบเปิง", nameEn: "Sop Poeng", postalCode: "50150" },
        { id: "ban-chang", nameTh: "บ้านช้าง", nameEn: "Ban Chang", postalCode: "50150" },
        { id: "pa-pae-mae-taeng", nameTh: "ป่าแป๋", nameEn: "Pa Pae", postalCode: "50150" },
        { id: "inthakin", nameTh: "อินทขิล", nameEn: "Inthakhin", postalCode: "50150" },
        { id: "kiu-sue-ten", nameTh: "กื้ดช้าง", nameEn: "Kuet Chang", postalCode: "50150" },
      ],
    },
    {
      id: "mae-rim",
      nameTh: "แม่ริม",
      nameEn: "Mae Rim",
      subdistricts: [
        { id: "rim-nuea", nameTh: "ริมเหนือ", nameEn: "Rim Nuea", postalCode: "50180" },
        { id: "rim-tai", nameTh: "ริมใต้", nameEn: "Rim Tai", postalCode: "50180" },
        { id: "san-phra-net", nameTh: "สันโป่ง", nameEn: "San Pong", postalCode: "50180" },
        { id: "khun-huai", nameTh: "ขี้เหล็ก", nameEn: "Khilek", postalCode: "50180" },
        { id: "san-klang", nameTh: "สะลวง", nameEn: "Saluang", postalCode: "50330" },
        { id: "huay-sai", nameTh: "ห้วยทราย", nameEn: "Huai Sai", postalCode: "50180" },
        { id: "mae-sai", nameTh: "แม่แรม", nameEn: "Mae Raem", postalCode: "50180" },
        { id: "mae-sa", nameTh: "แม่สา", nameEn: "Mae Sa", postalCode: "50180" },
        { id: "don-kaeo", nameTh: "ดอนแก้ว", nameEn: "Don Kaeo", postalCode: "50180" },
        { id: "huai-sai-sub", nameTh: "เหมืองแก้ว", nameEn: "Mueang Kaeo", postalCode: "50180" },
        { id: "pong-yang", nameTh: "โป่งแยง", nameEn: "Pong Yaeng", postalCode: "50180" },
      ],
    },
    {
      id: "samoeng",
      nameTh: "สะเมิง",
      nameEn: "Samoeng",
      subdistricts: [
        { id: "samoeng-tai-sub", nameTh: "สะเมิงใต้", nameEn: "Samoeng Tai", postalCode: "50250" },
        { id: "samoeng-nuea", nameTh: "สะเมิงเหนือ", nameEn: "Samoeng Nuea", postalCode: "50250" },
        { id: "mae-sap", nameTh: "แม่สาบ", nameEn: "Mae Sap", postalCode: "50250" },
        { id: "bo-kaeo", nameTh: "บ่อแก้ว", nameEn: "Bo Kaeo", postalCode: "50250" },
        { id: "yuwa", nameTh: "ยั้งเมิน", nameEn: "Yang Moen", postalCode: "50250" },
      ],
    },
    {
      id: "fang",
      nameTh: "ฝาง",
      nameEn: "Fang",
      subdistricts: [
        { id: "wiang-sub", nameTh: "เวียง", nameEn: "Wiang", postalCode: "50110" },
        { id: "mon-pin", nameTh: "ม่อนปิ่น", nameEn: "Mon Pin", postalCode: "50110" },
        { id: "san-sai-fang", nameTh: "แม่งอน", nameEn: "Mae Ngon", postalCode: "50320" },
        { id: "mae-kha", nameTh: "แม่ข่า", nameEn: "Mae Kha", postalCode: "50320" },
        { id: "mae-sui", nameTh: "แม่สูน", nameEn: "Mae Sun", postalCode: "50110" },
        { id: "mae-ai-sub", nameTh: "สันทราย", nameEn: "San Sai", postalCode: "50110" },
        { id: "tong-fai", nameTh: "โป่งน้ำร้อน", nameEn: "Pong Nam Ron", postalCode: "50110" },
      ],
    },
    {
      id: "mae-ai",
      nameTh: "แม่อาย",
      nameEn: "Mae Ai",
      subdistricts: [
        { id: "mae-ai-sub2", nameTh: "แม่อาย", nameEn: "Mae Ai", postalCode: "50280" },
        { id: "mae-sao", nameTh: "แม่สาว", nameEn: "Mae Sao", postalCode: "50280" },
        { id: "san-tom", nameTh: "สันต้นหมื้อ", nameEn: "San Ton Mue", postalCode: "50280" },
        { id: "mae-na-wang", nameTh: "แม่นาวาง", nameEn: "Mae Na Wang", postalCode: "50280" },
        { id: "tha-ton", nameTh: "ท่าตอน", nameEn: "Tha Ton", postalCode: "50280" },
        { id: "ban-luang-mae-ai", nameTh: "บ้านหลวง", nameEn: "Ban Luang", postalCode: "50280" },
        { id: "muang-kaen", nameTh: "มะลิกา", nameEn: "Malika", postalCode: "50280" },
      ],
    },
    {
      id: "phrao",
      nameTh: "พร้าว",
      nameEn: "Phrao",
      subdistricts: [
        { id: "wiang-phrao", nameTh: "เวียง", nameEn: "Wiang", postalCode: "50190" },
        { id: "tha-wang-tan", nameTh: "ป่าตุ้ม", nameEn: "Pa Tum", postalCode: "50190" },
        { id: "pa-ngio", nameTh: "ป่าไหน่", nameEn: "Pa Nai", postalCode: "50190" },
        { id: "san-sli", nameTh: "สันทราย", nameEn: "San Sai", postalCode: "50190" },
        { id: "ban-pong", nameTh: "บ้านโป่ง", nameEn: "Ban Pong", postalCode: "50190" },
        { id: "na-prao", nameTh: "น้ำแพร่", nameEn: "Nam Phrae", postalCode: "50190" },
        { id: "mae-khan", nameTh: "เขื่อนผาก", nameEn: "Khuean Phak", postalCode: "50190" },
        { id: "mae-taen", nameTh: "แม่แวน", nameEn: "Mae Waen", postalCode: "50190" },
        { id: "mae-pang", nameTh: "แม่ปั๋ง", nameEn: "Mae Pang", postalCode: "50190" },
        { id: "hong-khrai", nameTh: "โหล่งขอด", nameEn: "Long Khot", postalCode: "50190" },
      ],
    },
    {
      id: "san-pa-tong",
      nameTh: "สันป่าตอง",
      nameEn: "San Pa Tong",
      subdistricts: [
        { id: "yupparaj", nameTh: "ยุหว่า", nameEn: "Yu Wa", postalCode: "50120" },
        { id: "san-klang-tong", nameTh: "สันกลาง", nameEn: "San Klang", postalCode: "50120" },
        { id: "tha-wang-tao", nameTh: "ท่าวังพร้าว", nameEn: "Tha Wang Phrao", postalCode: "50120" },
        { id: "mae-ka", nameTh: "มะขามหลวง", nameEn: "Makham Luang", postalCode: "50120" },
        { id: "mae-wang", nameTh: "แม่ก๊า", nameEn: "Mae Ka", postalCode: "50120" },
        { id: "ban-klang", nameTh: "บ้านกลาง", nameEn: "Ban Klang", postalCode: "50120" },
        { id: "ban-mae", nameTh: "บ้านแม", nameEn: "Ban Mae", postalCode: "50120" },
        { id: "chom-san", nameTh: "ทุ่งสะโตก", nameEn: "Thung Satok", postalCode: "50120" },
        { id: "makham-luang", nameTh: "ทุ่งต้อม", nameEn: "Thung Tom", postalCode: "50120" },
        { id: "nam-bo", nameTh: "น้ำบ่อหลวง", nameEn: "Nam Bo Luang", postalCode: "50120" },
        { id: "mon-tawan", nameTh: "มะขุนหวาน", nameEn: "Makhun Wan", postalCode: "50120" },
      ],
    },
    {
      id: "san-kamphaeng",
      nameTh: "สันกำแพง",
      nameEn: "San Kamphaeng",
      subdistricts: [
        { id: "san-kamphaeng-sub", nameTh: "สันกำแพง", nameEn: "San Kamphaeng", postalCode: "50130" },
        { id: "tha-sala-san", nameTh: "ทรายมูล", nameEn: "Sai Mun", postalCode: "50130" },
        { id: "rong-wua-daeng", nameTh: "ร้องวัวแดง", nameEn: "Rong Wua Daeng", postalCode: "50130" },
        { id: "san-na", nameTh: "บวกค้าง", nameEn: "Buak Khang", postalCode: "50130" },
        { id: "mae-puek", nameTh: "แช่ช้าง", nameEn: "Chae Chang", postalCode: "50130" },
        { id: "on-klang", nameTh: "ออนใต้", nameEn: "On Tai", postalCode: "50130" },
        { id: "mae-lai", nameTh: "แม่ปูคา", nameEn: "Mae Pu Kha", postalCode: "50130" },
        { id: "huai-sai-kamphaeng", nameTh: "ห้วยทราย", nameEn: "Huai Sai", postalCode: "50130" },
        { id: "ton-pao", nameTh: "ต้นเปา", nameEn: "Ton Pao", postalCode: "50130" },
        { id: "san-klang-kamphaeng", nameTh: "สันกลาง", nameEn: "San Klang", postalCode: "50130" },
      ],
    },
    {
      id: "san-sai",
      nameTh: "สันทราย",
      nameEn: "San Sai",
      subdistricts: [
        { id: "san-sai-luang", nameTh: "สันทรายหลวง", nameEn: "San Sai Luang", postalCode: "50210" },
        { id: "san-sai-noi", nameTh: "สันทรายน้อย", nameEn: "San Sai Noi", postalCode: "50210" },
        { id: "san-phra-net-sub", nameTh: "สันพระเนตร", nameEn: "San Phra Net", postalCode: "50210" },
        { id: "san-na-meng", nameTh: "สันนาเม็ง", nameEn: "San Na Meng", postalCode: "50210" },
        { id: "san-phi-suea-sub", nameTh: "สันป่าเปา", nameEn: "San Pa Pao", postalCode: "50210" },
        { id: "nong-han", nameTh: "หนองแหย่ง", nameEn: "Nong Yaeng", postalCode: "50210" },
        { id: "nong-chom", nameTh: "หนองจ๊อม", nameEn: "Nong Chom", postalCode: "50210" },
        { id: "nong-han-sub", nameTh: "หนองหาร", nameEn: "Nong Han", postalCode: "50290" },
        { id: "mae-faek", nameTh: "แม่แฝก", nameEn: "Mae Faek", postalCode: "50290" },
        { id: "mae-faek-mai", nameTh: "แม่แฝกใหม่", nameEn: "Mae Faek Mai", postalCode: "50290" },
        { id: "rop-wiang", nameTh: "เมืองเล็น", nameEn: "Mueang Len", postalCode: "50210" },
        { id: "pa-phai", nameTh: "ป่าไผ่", nameEn: "Pa Phai", postalCode: "50210" },
      ],
    },
    {
      id: "hang-dong",
      nameTh: "หางดง",
      nameEn: "Hang Dong",
      subdistricts: [
        { id: "hang-dong-sub", nameTh: "หางดง", nameEn: "Hang Dong", postalCode: "50230" },
        { id: "nong-tong", nameTh: "หนองแก๋ว", nameEn: "Nong Kaeo", postalCode: "50230" },
        { id: "nong-khong", nameTh: "หารแก้ว", nameEn: "Han Kaeo", postalCode: "50230" },
        { id: "san-phak-wan", nameTh: "สันผักหวาน", nameEn: "San Phak Wan", postalCode: "50230" },
        { id: "nong-kin-phueng", nameTh: "หนองควาย", nameEn: "Nong Khwai", postalCode: "50230" },
        { id: "ban-pong-hang-dong", nameTh: "บ้านปง", nameEn: "Ban Pong", postalCode: "50230" },
        { id: "nam-phrae", nameTh: "น้ำแพร่", nameEn: "Nam Phrae", postalCode: "50230" },
        { id: "suthep-hang-dong", nameTh: "สบแม่ข่า", nameEn: "Sop Mae Kha", postalCode: "50230" },
        { id: "ban-waen", nameTh: "บ้านแหวน", nameEn: "Ban Waen", postalCode: "50230" },
        { id: "thung-sat", nameTh: "ขุนคง", nameEn: "Khun Khong", postalCode: "50230" },
        { id: "nong-aen", nameTh: "หนองตอง", nameEn: "Nong Tong", postalCode: "50340" },
      ],
    },
    {
      id: "hot",
      nameTh: "ฮอด",
      nameEn: "Hot",
      subdistricts: [
        { id: "hot-sub", nameTh: "หางดง", nameEn: "Hang Dong", postalCode: "50240" },
        { id: "hot-main", nameTh: "ฮอด", nameEn: "Hot", postalCode: "50240" },
        { id: "bo-hong", nameTh: "บ่อหลวง", nameEn: "Bo Luang", postalCode: "50240" },
        { id: "bo-sali", nameTh: "บ่อสลี", nameEn: "Bo Sali", postalCode: "50240" },
        { id: "nakhon-khiri", nameTh: "นาคอเรือ", nameEn: "Na Kho Ruea", postalCode: "50240" },
        { id: "kaeng-klang", nameTh: "แก่งหอไก่", nameEn: "Kaeng Ho Kai", postalCode: "50240" },
      ],
    },
    {
      id: "doi-tao",
      nameTh: "ดอยเต่า",
      nameEn: "Doi Tao",
      subdistricts: [
        { id: "doi-tao-sub", nameTh: "ดอยเต่า", nameEn: "Doi Tao", postalCode: "50260" },
        { id: "muang-klang", nameTh: "ท่าเดื่อ", nameEn: "Tha Duea", postalCode: "50260" },
        { id: "mong-khue", nameTh: "มืดกา", nameEn: "Muet Ka", postalCode: "50260" },
        { id: "bon-thi", nameTh: "บ้านแอ่น", nameEn: "Ban Aen", postalCode: "50260" },
        { id: "bong-thi", nameTh: "บงตัน", nameEn: "Bong Tan", postalCode: "50260" },
        { id: "hua-chae", nameTh: "โปงทุ่ง", nameEn: "Pong Thung", postalCode: "50260" },
      ],
    },
    {
      id: "omkoi",
      nameTh: "อมก๋อย",
      nameEn: "Omkoi",
      subdistricts: [
        { id: "omkoi-sub", nameTh: "อมก๋อย", nameEn: "Omkoi", postalCode: "50310" },
        { id: "yod-din", nameTh: "ยางเปียง", nameEn: "Yang Piang", postalCode: "50310" },
        { id: "mae-tuen", nameTh: "แม่ตื่น", nameEn: "Mae Tuen", postalCode: "50310" },
        { id: "mo-taden", nameTh: "ม่อนจอง", nameEn: "Mon Chong", postalCode: "50310" },
        { id: "sop-lan", nameTh: "สบโขง", nameEn: "Sop Khong", postalCode: "50310" },
        { id: "na-tad", nameTh: "นาเกียน", nameEn: "Na Kian", postalCode: "50310" },
      ],
    },
    {
      id: "saraphi",
      nameTh: "สารภี",
      nameEn: "Saraphi",
      subdistricts: [
        { id: "yothathikarn", nameTh: "ยางเนิ้ง", nameEn: "Yang Noeng", postalCode: "50140" },
        { id: "saraphi-sub", nameTh: "สารภี", nameEn: "Saraphi", postalCode: "50140" },
        { id: "nong-phueng", nameTh: "ชมภู", nameEn: "Chom Phu", postalCode: "50140" },
        { id: "pa-pa", nameTh: "ไชยสถาน", nameEn: "Chai Sathan", postalCode: "50140" },
        { id: "nong-rian", nameTh: "ขัวมุง", nameEn: "Khua Mung", postalCode: "50140" },
        { id: "khlong-khun", nameTh: "หนองแฝก", nameEn: "Nong Faek", postalCode: "50140" },
        { id: "nong-faek", nameTh: "หนองผึ้ง", nameEn: "Nong Phueng", postalCode: "50140" },
        { id: "tha-kwang", nameTh: "ท่ากว้าง", nameEn: "Tha Kwang", postalCode: "50140" },
        { id: "don-kaew", nameTh: "ดอนแก้ว", nameEn: "Don Kaeo", postalCode: "50140" },
        { id: "pa-bong", nameTh: "ท่าวังตาล", nameEn: "Tha Wang Tan", postalCode: "50140" },
        { id: "san-klang-saraphi", nameTh: "สันทราย", nameEn: "San Sai", postalCode: "50140" },
        { id: "rop-wiang-saraphi", nameTh: "ป่าบง", nameEn: "Pa Bong", postalCode: "50140" },
      ],
    },
    {
      id: "mae-wang",
      nameTh: "แม่วาง",
      nameEn: "Mae Wang",
      subdistricts: [
        { id: "ban-kard", nameTh: "บ้านกาด", nameEn: "Ban Kat", postalCode: "50360" },
        { id: "thung-pi", nameTh: "ทุ่งปี้", nameEn: "Thung Pi", postalCode: "50360" },
        { id: "thung-riang", nameTh: "ทุ่งรวงทอง", nameEn: "Thung Ruang Thong", postalCode: "50360" },
        { id: "mae-win", nameTh: "แม่วิน", nameEn: "Mae Win", postalCode: "50360" },
        { id: "don-pao", nameTh: "ดอนเปา", nameEn: "Don Pao", postalCode: "50360" },
      ],
    },
    {
      id: "mae-on",
      nameTh: "แม่ออน",
      nameEn: "Mae On",
      subdistricts: [
        { id: "on-klang-sub", nameTh: "ออนกลาง", nameEn: "On Klang", postalCode: "50130" },
        { id: "on-nua", nameTh: "ออนเหนือ", nameEn: "On Nuea", postalCode: "50130" },
        { id: "ban-sahakon", nameTh: "บ้านสหกรณ์", nameEn: "Ban Sahakon", postalCode: "50130" },
        { id: "hua-thung", nameTh: "ห้วยแก้ว", nameEn: "Huai Kaeo", postalCode: "50130" },
        { id: "thea-dang", nameTh: "แม่ทา", nameEn: "Mae Tha", postalCode: "50130" },
        { id: "tha-dang", nameTh: "ทาเหนือ", nameEn: "Tha Nuea", postalCode: "50130" },
      ],
    },
    {
      id: "doi-lo",
      nameTh: "ดอยหล่อ",
      nameEn: "Doi Lo",
      subdistricts: [
        { id: "doi-lo-sub", nameTh: "ดอยหล่อ", nameEn: "Doi Lo", postalCode: "50160" },
        { id: "sop-tia-doi-lo", nameTh: "สองแคว", nameEn: "Song Khwae", postalCode: "50160" },
        { id: "yang-piang", nameTh: "ยางคราม", nameEn: "Yang Khram", postalCode: "50160" },
        { id: "san-lung", nameTh: "สันติสุข", nameEn: "Santi Suk", postalCode: "50160" },
      ],
    },
    {
      id: "wiang-haeng",
      nameTh: "เวียงแหง",
      nameEn: "Wiang Haeng",
      subdistricts: [
        { id: "muang-haeng", nameTh: "เมืองแหง", nameEn: "Mueang Haeng", postalCode: "50350" },
        { id: "piang-luang", nameTh: "เปียงหลวง", nameEn: "Piang Luang", postalCode: "50350" },
        { id: "maeng-na", nameTh: "แสนไห", nameEn: "Saen Hai", postalCode: "50350" },
      ],
    },
    {
      id: "chai-prakan",
      nameTh: "ไชยปราการ",
      nameEn: "Chai Prakan",
      subdistricts: [
        { id: "pong-kum", nameTh: "ปงตำ", nameEn: "Pong Tam", postalCode: "50320" },
        { id: "si-dong-yen", nameTh: "ศรีดงเย็น", nameEn: "Si Dong Yen", postalCode: "50320" },
        { id: "mae-thap", nameTh: "แม่ทะลบ", nameEn: "Mae Thalop", postalCode: "50320" },
        { id: "houn-bon", nameTh: "หนองบัว", nameEn: "Nong Bua", postalCode: "50320" },
      ],
    },
    {
      id: "kalengnoi",
      nameTh: "กัลยาณิวัฒนา",
      nameEn: "Galyani Vadhana",
      subdistricts: [
        { id: "chan-thawong", nameTh: "บ้านจันทร์", nameEn: "Ban Chan", postalCode: "58130" },
        { id: "mae-nai", nameTh: "แม่แดด", nameEn: "Mae Daet", postalCode: "58130" },
        { id: "kong-khaek-sub", nameTh: "แจ่มหลวง", nameEn: "Chaem Luang", postalCode: "58130" },
      ],
    },
  ],
};

// Export all provinces
export const THAILAND_PROVINCES: Province[] = [CHIANG_MAI];

// Helper functions
export function getDistrictsByProvince(provinceId: string): District[] {
  const province = THAILAND_PROVINCES.find((p) => p.id === provinceId);
  return province?.districts || [];
}

export function getSubdistrictsByDistrict(provinceId: string, districtId: string): Subdistrict[] {
  const province = THAILAND_PROVINCES.find((p) => p.id === provinceId);
  const district = province?.districts.find((d) => d.id === districtId);
  return district?.subdistricts || [];
}

export function findDistrictByName(name: string, locale: "th" | "en" = "th"): District | undefined {
  for (const province of THAILAND_PROVINCES) {
    const district = province.districts.find((d) =>
      locale === "th" ? d.nameTh === name : d.nameEn.toLowerCase() === name.toLowerCase()
    );
    if (district) return district;
  }
  return undefined;
}

export function findSubdistrictByName(name: string, locale: "th" | "en" = "th"): Subdistrict | undefined {
  for (const province of THAILAND_PROVINCES) {
    for (const district of province.districts) {
      const subdistrict = district.subdistricts.find((s) =>
        locale === "th" ? s.nameTh === name : s.nameEn.toLowerCase() === name.toLowerCase()
      );
      if (subdistrict) return subdistrict;
    }
  }
  return undefined;
}

// Flat list exports for dropdowns
export function getAllDistricts(locale: "th" | "en" = "th"): { id: string; name: string; provinceId: string }[] {
  const districts: { id: string; name: string; provinceId: string }[] = [];
  for (const province of THAILAND_PROVINCES) {
    for (const district of province.districts) {
      districts.push({
        id: district.id,
        name: locale === "th" ? district.nameTh : district.nameEn,
        provinceId: province.id,
      });
    }
  }
  return districts.sort((a, b) => a.name.localeCompare(b.name, locale === "th" ? "th" : "en"));
}

export function getAllSubdistricts(
  locale: "th" | "en" = "th"
): { id: string; name: string; districtId: string; postalCode: string }[] {
  const subdistricts: { id: string; name: string; districtId: string; postalCode: string }[] = [];
  for (const province of THAILAND_PROVINCES) {
    for (const district of province.districts) {
      for (const subdistrict of district.subdistricts) {
        subdistricts.push({
          id: subdistrict.id,
          name: locale === "th" ? subdistrict.nameTh : subdistrict.nameEn,
          districtId: district.id,
          postalCode: subdistrict.postalCode,
        });
      }
    }
  }
  return subdistricts.sort((a, b) => a.name.localeCompare(b.name, locale === "th" ? "th" : "en"));
}
