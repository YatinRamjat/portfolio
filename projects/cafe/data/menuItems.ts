import { MenuItem } from "@/lib/types";

export const menuItems: MenuItem[] = [
  // CHAI & DRINKS
  {
    id: "c1",
    name: "Kashmiri Kahwa",
    description: "Saffron, cinnamon, cardamom green tea",
    price: 120,
    category: "Chai & Drinks",
    isVeg: true,
    emoji: "🍵"
  },
  {
    id: "c2",
    name: "Adrak Masala Chai",
    description: "Classic spiced ginger tea",
    price: 80,
    category: "Chai & Drinks",
    isVeg: true,
    isMustTry: true,
    emoji: "☕"
  },
  {
    id: "c3",
    name: "Kulhad Cold Coffee",
    description: "Served in earthen kulhad with jaggery",
    price: 150,
    category: "Chai & Drinks",
    isVeg: true,
    emoji: "🧊"
  },
  {
    id: "c4",
    name: "Rose Shikanji",
    description: "Rose, lemon, kala namak",
    price: 110,
    category: "Chai & Drinks",
    isVeg: true,
    emoji: "🍹"
  },
  // BITES & SNACKS
  {
    id: "s1",
    name: "Bombay Bhel Bruschetta",
    description: "Fusion bhel on toasted sourdough",
    price: 180,
    category: "Bites & Snacks",
    isVeg: true,
    isMustTry: true,
    emoji: "🥪"
  },
  {
    id: "s2",
    name: "Pav Bhaji Fondue",
    description: "Bhaji dip with mini pav sliders",
    price: 220,
    category: "Bites & Snacks",
    isVeg: true,
    emoji: "🫕"
  },
  {
    id: "s3",
    name: "Corn Tikki Sliders",
    description: "3 corn-potato patties, mint chutney",
    price: 199,
    category: "Bites & Snacks",
    isVeg: true,
    emoji: "🍔"
  },
  {
    id: "s4",
    name: "Masala Fries",
    description: "Chaat masala, sev, tamarind drizzle",
    price: 149,
    category: "Bites & Snacks",
    isVeg: true,
    emoji: "🍟"
  },
  // MAIN COURSE
  {
    id: "m1",
    name: "Thali of the Day",
    description: "Rotating regional thali, changes daily",
    price: 320,
    category: "Main Course",
    isVeg: true,
    isMustTry: true,
    emoji: "🍱"
  },
  {
    id: "m2",
    name: "Paneer Kathi Roll",
    description: "Mughlai-spiced cottage cheese, rumali",
    price: 230,
    category: "Main Course",
    isVeg: true,
    emoji: "🌯"
  },
  {
    id: "m3",
    name: "Dal Makhani Bowl",
    description: "Slow-cooked black lentils, butter naan",
    price: 280,
    category: "Main Course",
    isVeg: true,
    emoji: "🥣"
  },
  {
    id: "m4",
    name: "Rajma Chawal",
    description: "Punjabi kidney bean curry, steamed rice",
    price: 250,
    category: "Main Course",
    isVeg: true,
    emoji: "🍚"
  },
  // DESSERTS
  {
    id: "d1",
    name: "Gulab Jamun Cheesecake",
    description: "East-meets-West signature dessert",
    price: 199,
    category: "Desserts",
    isVeg: true,
    emoji: "🍰"
  },
  {
    id: "d2",
    name: "Kulfi Falooda",
    description: "Rose falooda, pistachio kulfi, basil seeds",
    price: 170,
    category: "Desserts",
    isVeg: true,
    emoji: "🍨"
  },
  {
    id: "d3",
    name: "Gajar Halwa Tart",
    description: "Winter carrot halwa in a butter crust",
    price: 160,
    category: "Desserts",
    isVeg: true,
    emoji: "🥧"
  },
  // COMBOS
  {
    id: "co1",
    name: "Chai for Two",
    description: "2 chai + 1 shared snack platter",
    price: 199,
    category: "Combos",
    isVeg: true,
    emoji: "👫"
  },
  {
    id: "co2",
    name: "Office Lunch",
    description: "Main + Chai + Dessert",
    price: 349,
    category: "Combos",
    isVeg: true,
    emoji: "💼"
  }
];
