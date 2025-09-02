// Subcategory data for each main category

export interface Subcategory {
  id: string;
  name: string;
  count: number;
}

export interface CategorySubcategories {
  [categoryId: string]: Subcategory[];
}

// Car brands subcategories based on the image
const carSubcategories: Subcategory[] = [
  // Column 1
  { id: "toyota", name: "Toyota", count: 2910 },
  { id: "ford", name: "Ford", count: 94 },
  { id: "land_rover", name: "Land Rover", count: 47 },
  { id: "audi", name: "Audi", count: 23 },
  { id: "changan", name: "Changan", count: 16 },
  { id: "renault", name: "Renault", count: 13 },
  { id: "chevrolet", name: "Chevrolet", count: 7 },
  { id: "baic", name: "Baic", count: 3 },
  { id: "lincoln", name: "Lincoln", count: 2 },
  { id: "daihatsu", name: "Daihatsu", count: 1 },

  // Column 2
  { id: "lexus", name: "Lexus", count: 798 },
  { id: "hyundai", name: "Hyundai", count: 71 },
  { id: "volkswagen", name: "Volkswagen", count: 39 },
  { id: "geely", name: "Geely", count: 19 },
  { id: "gwm_tank", name: "GWM Tank", count: 16 },
  { id: "kia", name: "Kia", count: 11 },
  { id: "lada", name: "Lada", count: 6 },
  { id: "chery", name: "Chery", count: 3 },
  { id: "volvo", name: "Volvo", count: 2 },
  { id: "fiat", name: "Fiat", count: 1 },

  // Column 3
  { id: "mercedes_benz", name: "Mercedes-Benz", count: 225 },
  { id: "mitsubishi", name: "Mitsubishi", count: 63 },
  { id: "honda", name: "Honda", count: 29 },
  { id: "byd", name: "BYD", count: 18 },
  { id: "dodge", name: "Dodge", count: 14 },
  { id: "mg", name: "MG", count: 10 },
  { id: "dongfeng", name: "Dongfeng", count: 5 },
  { id: "neta", name: "Neta", count: 3 },
  { id: "baw", name: "BAW", count: 1 },
  { id: "isuzu", name: "Isuzu", count: 1 },

  // Column 4
  { id: "nissan", name: "Nissan", count: 152 },
  { id: "bmw", name: "BMW", count: 56 },
  { id: "mazda", name: "Mazda", count: 26 },
  { id: "busad", name: "Бусад", count: 18 },
  { id: "ssangyong", name: "SsangYong", count: 14 },
  { id: "hummer", name: "Hummer", count: 8 },
  { id: "haval", name: "Haval", count: 5 },
  { id: "tesla", name: "Tesla", count: 3 },
  { id: "bentley", name: "Bentley", count: 1 },
  { id: "jaguar", name: "Jaguar", count: 1 },

  // Column 5
  { id: "subaru", name: "Subaru", count: 140 },
  { id: "jeep", name: "Jeep", count: 54 },
  { id: "suzuki", name: "Suzuki", count: 24 },
  { id: "porsche", name: "Porsche", count: 17 },
  { id: "mini", name: "MINI", count: 13 },
  { id: "infiniti", name: "Infiniti", count: 8 },
  { id: "jetour", name: "Jetour", count: 4 },
  { id: "foton", name: "Foton", count: 2 },
  { id: "chrysler", name: "Chrysler", count: 1 },
  { id: "kaiyi", name: "Kaiyi", count: 1 },
];

// Mobile phone and tablet subcategories based on the image
const mobileSubcategories: Subcategory[] = [
  { id: "iphone", name: "iPhone", count: 8 },
  { id: "samsung", name: "Samsung", count: 12 },
  { id: "xiaomi", name: "Xiaomi", count: 15 },
  { id: "huawei", name: "Huawei", count: 10 },
  { id: "tablet", name: "Tablet", count: 18 },
  { id: "accessories", name: "Accessories", count: 22 },
];

// Computer subcategories based on the image
const computerSubcategories: Subcategory[] = [
  { id: "desktop", name: "Суурин компьютер", count: 12 },
  { id: "notebook", name: "Notebook", count: 8 },
  { id: "gaming_consoles", name: "PS, XBox, Nintendo", count: 15 },
  { id: "printers_scanners", name: "Принтер, хувилагч, сканнер, ламинатор", count: 23 },
  { id: "spare_parts", name: "Сэлбэг", count: 31 },
  { id: "tablets_ereaders", name: "iPad, tablet, kindle", count: 19 },
  { id: "printer_consumables", name: "Принтер, хувилагчийн хор", count: 27 },
  { id: "headphones_3d", name: "Чихэвч, 3D шил", count: 14 },
  { id: "accessories", name: "Дагалдах хэрэгсэл", count: 42 },
];

// Jewelry subcategories based on the image
const jewelrySubcategories: Subcategory[] = [
  { id: "zuu", name: "Зүү", count: 18 },
  { id: "bogj", name: "Бөгж", count: 25 },
  { id: "mungu", name: "Мөнгө", count: 12 },
  { id: "tsagaan_alt", name: "Цагаан алт", count: 31 },
  { id: "khurel", name: "Хүрэл", count: 19 },
  { id: "erdeniin_chuluu", name: "Эрдэнийн чулуу", count: 28 },
];

// Electronics subcategories based on the image
const electronicsSubcategories: Subcategory[] = [
  { id: "television", name: "Телевизор", count: 5 },
  { id: "refrigerator", name: "Хөргөгч", count: 8 },
  { id: "washing_machine", name: "Угаалгын машин", count: 12 },
  { id: "air_conditioner", name: "Агааржуулагч", count: 6 },
  { id: "microwave", name: "Микровейв", count: 9 },
  { id: "coffee_machine", name: "Кофе машин", count: 7 },
];

// Main subcategories object
export const categorySubcategories: CategorySubcategories = {
  "АВТОМАШИН": carSubcategories,
  "ГАР УТАС & ТАБЛЕТ": mobileSubcategories,
  "КОМПЬЮТЕР": computerSubcategories,
  "ҮНЭТ ЭДЛЭЛ": jewelrySubcategories,
  "ЦАХИЛГААН БАРАА": electronicsSubcategories,
};

// Helper function to get subcategories for a category
export const getSubcategories = (categoryId: string): Subcategory[] => {
  return categorySubcategories[categoryId] || [];
};

// Helper function to get subcategory by ID
export const getSubcategoryById = (categoryId: string, subcategoryId: string): Subcategory | undefined => {
  const subcategories = getSubcategories(categoryId);
  return subcategories.find(sub => sub.id === subcategoryId);
};
