export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductReview {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  gender: "Men" | "Women" | "Unisex";
  price: number;
  mrp: number;
  discount: number;
  colors: ProductColor[];
  sizes: string[];
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  material: string;
  care: string;
  shipping: string;
  reviews: ProductReview[];
  inStock: boolean;
  tags: string[];
}

export const categories = [
  { name: "Kurtas", slug: "kurtas", icon: "kurta" },
  { name: "Sarees", slug: "sarees", icon: "saree" },
  { name: "Lehengas", slug: "lehengas", icon: "lehenga" },
  { name: "Sherwanis", slug: "sherwanis", icon: "sherwani" },
  { name: "Fusion Wear", slug: "fusion-wear", icon: "fusion" },
  { name: "Accessories", slug: "accessories", icon: "accessory" },
];

export const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

export const couponCodes: Record<string, { discount: number; label: string }> = {
  WALA10: { discount: 10, label: "10% off applied!" },
  FIRST20: { discount: 20, label: "20% off applied!" },
};

export const products: Product[] = [
  {
    id: "1",
    slug: "ananya-printed-kurta-set",
    name: "Ananya Printed Kurta Set",
    brand: "ThreadsWala",
    category: "kurtas",
    gender: "Women",
    price: 1299,
    mrp: 1899,
    discount: 32,
    colors: [
      { name: "Rose", hex: "#E8909C" },
      { name: "Teal", hex: "#008080" },
      { name: "Ivory", hex: "#FFFFF0" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.5,
    reviewCount: 128,
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&h=800&fit=crop",
    ],
    description: "Elevate your ethnic wardrobe with the Ananya Printed Kurta Set. This beautiful ensemble features intricate floral prints on premium cotton fabric, paired with matching palazzo pants and a delicate dupatta. Perfect for festive occasions, pujas, and casual outings.",
    material: "100% Premium Cotton. Lightweight and breathable fabric perfect for Indian weather. The dupatta is crafted from soft chiffon with block-printed borders.",
    care: "Machine wash cold with similar colors. Do not bleach. Tumble dry low. Iron on medium heat. Do not dry clean.",
    shipping: "Free shipping on orders above ₹999. Standard delivery in 5-7 business days. Express delivery available at ₹149 (2-3 business days). Easy 15-day returns.",
    reviews: [
      { id: "r1", name: "Priya Sharma", rating: 5, date: "2024-03-15", comment: "Absolutely beautiful kurta set! The fabric quality is amazing and the print is even better in person. Got so many compliments at a family gathering.", avatar: "PS" },
      { id: "r2", name: "Anita Patel", rating: 4, date: "2024-03-10", comment: "Good quality but the size runs slightly large. I'd recommend sizing down. The colors are vibrant and the material is comfortable.", avatar: "AP" },
      { id: "r3", name: "Meera Reddy", rating: 5, date: "2024-02-28", comment: "Perfect for daily wear! I've washed it multiple times and the color hasn't faded at all. Great value for the price.", avatar: "MR" },
    ],
    inStock: true,
    tags: ["kurta", "women", "ethnic", "cotton", "printed"],
  },
  {
    id: "2",
    slug: "rajveer-embroidered-sherwani",
    name: "Rajveer Embroidered Sherwani",
    brand: "ThreadsWala",
    category: "sherwanis",
    gender: "Men",
    price: 5499,
    mrp: 7200,
    discount: 24,
    colors: [
      { name: "Cream", hex: "#FFFDD0" },
      { name: "Navy", hex: "#000080" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    rating: 4.8,
    reviewCount: 89,
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=800&fit=crop",
    ],
    description: "Make a grand statement with the Rajveer Embroidered Sherwani. Featuring exquisite zari embroidery on rich Jacquard fabric, this sherwani is designed for grooms, wedding guests, and festive celebrations. Comes with a matching churidar.",
    material: "Premium Jacquard silk blend with hand-embroidered zari work. Inner lining of soft cotton for comfort. Buttons are custom-made antique gold finish.",
    care: "Dry clean only. Store in garment bag. Do not expose to direct sunlight for extended periods. Iron on low heat with a pressing cloth.",
    shipping: "Free shipping on orders above ₹999. Standard delivery in 5-7 business days. Premium packaging with garment bag included.",
    reviews: [
      { id: "r1", name: "Rahul Verma", rating: 5, date: "2024-03-12", comment: "Wore this to my brother's wedding and received countless compliments. The embroidery is absolutely stunning and the fit is perfect.", avatar: "RV" },
      { id: "r2", name: "Amit Singh", rating: 5, date: "2024-03-05", comment: "Worth every rupee! The quality is comparable to sherwanis costing 15-20k at retail stores. Delivery was quick and packaging was premium.", avatar: "AS" },
      { id: "r3", name: "Karan Mehta", rating: 4, date: "2024-02-20", comment: "Beautiful sherwani but the churidar could be better quality. The sherwani itself is a masterpiece though. Highly recommend.", avatar: "KM" },
    ],
    inStock: true,
    tags: ["sherwani", "men", "wedding", "embroidered", "ethnic"],
  },
  {
    id: "3",
    slug: "meera-bandhani-saree",
    name: "Meera Bandhani Saree",
    brand: "ThreadsWala",
    category: "sarees",
    gender: "Women",
    price: 2199,
    mrp: 3000,
    discount: 27,
    colors: [
      { name: "Red", hex: "#DC143C" },
      { name: "Yellow", hex: "#FFD700" },
    ],
    sizes: ["Free Size"],
    rating: 4.6,
    reviewCount: 156,
    images: [
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
    ],
    description: "Drape yourself in the timeless beauty of the Meera Bandhani Saree. Handcrafted by skilled artisans from Jaipur, this saree features traditional tie-dye patterns that tell a story of Indian heritage. Complete with a matching unstitched blouse piece.",
    material: "Pure Georgette with authentic Bandhani (tie-dye) work. 5.5 meters saree with 0.8 meters unstitched blouse piece. Gold zari border detailing.",
    care: "Dry clean recommended for first wash. Subsequent washes can be gentle hand wash with mild detergent. Do not wring. Dry in shade. Iron on low heat.",
    shipping: "Free shipping on orders above ₹999. Carefully packaged in a branded saree box. Standard delivery in 5-7 business days.",
    reviews: [
      { id: "r1", name: "Kavita Joshi", rating: 5, date: "2024-03-18", comment: "The Bandhani work is authentic and beautiful! I've bought many sarees online but this one exceeded my expectations. The georgette drapes beautifully.", avatar: "KJ" },
      { id: "r2", name: "Sunita Agarwal", rating: 4, date: "2024-03-11", comment: "Lovely saree with rich colors. The blouse piece is good quality too. Only wish the pallu had more work on it.", avatar: "SA" },
      { id: "r3", name: "Deepa Nair", rating: 5, date: "2024-02-25", comment: "Received so many compliments when I wore this to a Diwali party. The quality is exceptional for the price. Will buy more from ThreadsWala!", avatar: "DN" },
    ],
    inStock: true,
    tags: ["saree", "women", "bandhani", "traditional", "georgette"],
  },
  {
    id: "4",
    slug: "kabir-linen-kurta-pajama",
    name: "Kabir Linen Kurta-Pajama",
    brand: "ThreadsWala",
    category: "kurtas",
    gender: "Men",
    price: 899,
    mrp: 1200,
    discount: 25,
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Sky Blue", hex: "#87CEEB" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    rating: 4.3,
    reviewCount: 234,
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop",
    ],
    description: "Stay cool and stylish with the Kabir Linen Kurta-Pajama set. Made from premium European linen, this kurta features a mandarin collar and wooden button detailing. The perfect choice for summer festivals, office wear, and casual occasions.",
    material: "100% European Linen. Naturally breathable and gets softer with every wash. Wooden coconut shell buttons. Matching cotton-linen blend pajama.",
    care: "Machine wash cold. Tumble dry on low. Iron while slightly damp for best results. Linen naturally wrinkles — embrace the texture!",
    shipping: "Free shipping on orders above ₹999. Standard delivery in 5-7 business days. Express delivery available.",
    reviews: [
      { id: "r1", name: "Siddharth Kumar", rating: 4, date: "2024-03-16", comment: "Great quality linen at an unbeatable price. The fit is comfortable and the fabric is genuinely breathable. Perfect for Delhi summers.", avatar: "SK" },
      { id: "r2", name: "Varun Gupta", rating: 5, date: "2024-03-08", comment: "I bought 3 of these in different colors. Best kurta for daily wear. The linen quality is surprisingly good for this price range.", avatar: "VG" },
      { id: "r3", name: "Rohit Jain", rating: 4, date: "2024-02-22", comment: "Nice kurta, good stitching. The pajama is comfortable too. Would love to see more color options.", avatar: "RJ" },
    ],
    inStock: true,
    tags: ["kurta", "men", "linen", "casual", "summer"],
  },
  {
    id: "5",
    slug: "zara-indo-western-crop-top-palazzo",
    name: "Zara Indo-Western Crop Top & Palazzo",
    brand: "ThreadsWala",
    category: "fusion-wear",
    gender: "Women",
    price: 1599,
    mrp: 2100,
    discount: 24,
    colors: [
      { name: "Peach", hex: "#FFCBA4" },
      { name: "Black", hex: "#000000" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.4,
    reviewCount: 97,
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
    ],
    description: "Blend tradition with contemporary fashion with the Zara Indo-Western Crop Top & Palazzo set. Features a beautifully embroidered crop top paired with flowing palazzo pants. Ideal for sangeet, cocktail parties, and modern festive occasions.",
    material: "Crop top: Silk blend with thread embroidery. Palazzo: Premium Georgette with satin lining. Comfortable elastic waistband on palazzo.",
    care: "Dry clean recommended. Can be gently hand washed in cold water. Do not wring. Dry flat in shade. Iron embroidered top inside out.",
    shipping: "Free shipping on orders above ₹999. Standard delivery in 5-7 business days. Gift packaging available at ₹99.",
    reviews: [
      { id: "r1", name: "Riya Kapoor", rating: 5, date: "2024-03-14", comment: "This set is absolutely gorgeous! Wore it to a sangeet and felt like a million bucks. The embroidery detail is stunning.", avatar: "RK" },
      { id: "r2", name: "Neha Sharma", rating: 4, date: "2024-03-07", comment: "Beautiful outfit. The palazzo is very comfortable with the elastic waist. Crop top embroidery could be slightly better but overall great value.", avatar: "NS" },
      { id: "r3", name: "Pooja Bansal", rating: 4, date: "2024-02-18", comment: "Love the fusion concept! It's modern yet has that traditional touch. The peach color is even prettier in person.", avatar: "PB" },
    ],
    inStock: true,
    tags: ["fusion", "women", "indo-western", "crop-top", "palazzo"],
  },
  {
    id: "6",
    slug: "riyaz-nehru-jacket-set",
    name: "Riyaz Nehru Jacket Set",
    brand: "ThreadsWala",
    category: "sherwanis",
    gender: "Men",
    price: 2999,
    mrp: 3800,
    discount: 21,
    colors: [
      { name: "Olive", hex: "#808000" },
      { name: "Maroon", hex: "#800000" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviewCount: 112,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=800&fit=crop",
    ],
    description: "Exude royalty with the Riyaz Nehru Jacket Set. This three-piece ensemble includes a richly textured Nehru jacket, a matching kurta, and comfortable churidar. The perfect outfit for weddings, receptions, and festive celebrations.",
    material: "Nehru Jacket: Brocade silk with gold button detailing. Kurta: Premium cotton silk blend. Churidar: Cotton lycra for stretch comfort.",
    care: "Nehru jacket: Dry clean only. Kurta: Hand wash or dry clean. Churidar: Machine wash cold. Iron jacket on low heat inside out.",
    shipping: "Free shipping on orders above ₹999. Comes in premium packaging with a garment cover. Standard delivery in 5-7 business days.",
    reviews: [
      { id: "r1", name: "Arjun Malhotra", rating: 5, date: "2024-03-13", comment: "The Nehru jacket is absolutely stunning! The brocade work is premium and the fit is impeccable. Received so many compliments at a wedding.", avatar: "AM" },
      { id: "r2", name: "Vikram Chandra", rating: 5, date: "2024-03-06", comment: "Best ethnic wear purchase I've made online. The three-piece set is well-coordinated and the quality justifies the price.", avatar: "VC" },
      { id: "r3", name: "Nikhil Rao", rating: 4, date: "2024-02-19", comment: "Great jacket set. The olive color is rich and elegant. Only minor complaint is the churidar could be longer for tall men.", avatar: "NR" },
    ],
    inStock: true,
    tags: ["nehru-jacket", "men", "wedding", "brocade", "ethnic"],
  },
  {
    id: "7",
    slug: "priya-mirror-work-lehenga-choli",
    name: "Priya Mirror Work Lehenga Choli",
    brand: "ThreadsWala",
    category: "lehengas",
    gender: "Women",
    price: 4799,
    mrp: 6500,
    discount: 26,
    colors: [
      { name: "Pink", hex: "#FF69B4" },
      { name: "Green", hex: "#228B22" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviewCount: 67,
    images: [
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
    ],
    description: "Turn heads with the Priya Mirror Work Lehenga Choli. This stunning ensemble features hand-embroidered mirror work (abhla bharat) on premium fabric. The flared lehenga, fitted choli, and embellished dupatta create a mesmerizing bridal look.",
    material: "Lehenga: Art silk with mirror and thread embroidery. Choli: Raw silk with mirror work. Dupatta: Net fabric with mirror work border. Semi-stitched choli for custom fitting.",
    care: "Dry clean only. Store flat with tissue paper between folds. Keep mirrors protected from scratching. Do not iron directly on mirror work.",
    shipping: "Free shipping. Premium bridal packaging with dust cover. Standard delivery in 5-7 business days. Gift message option available.",
    reviews: [
      { id: "r1", name: "Shreya Joshi", rating: 5, date: "2024-03-17", comment: "I wore this for my engagement and felt like a princess! The mirror work catches light beautifully and the craftsmanship is outstanding.", avatar: "SJ" },
      { id: "r2", name: "Divya Chauhan", rating: 5, date: "2024-03-09", comment: "Absolutely worth every penny. The pink color is dreamy and the mirrors are securely stitched. ThreadsWala has earned a customer for life.", avatar: "DC" },
      { id: "r3", name: "Aarti Mishra", rating: 5, date: "2024-02-24", comment: "Beyond beautiful! The photos don't do justice to how gorgeous this lehenga is in person. The dupatta is stunning too.", avatar: "AM" },
    ],
    inStock: true,
    tags: ["lehenga", "women", "mirror-work", "bridal", "ethnic"],
  },
  {
    id: "8",
    slug: "dev-block-print-jogger-kurta",
    name: "Dev Block Print Jogger Kurta",
    brand: "ThreadsWala",
    category: "fusion-wear",
    gender: "Men",
    price: 749,
    mrp: 999,
    discount: 25,
    colors: [
      { name: "Orange", hex: "#FF8C00" },
      { name: "Grey", hex: "#808080" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.2,
    reviewCount: 189,
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=800&fit=crop",
    ],
    description: "The Dev Block Print Jogger Kurta redefines casual ethnic wear. Featuring authentic Rajasthani block prints on a modern jogger-style kurta, it's the perfect blend of comfort and tradition. Ideal for college, casual outings, and relaxed festive vibes.",
    material: "100% Cotton with hand block printing using natural dyes. Ribbed cuffs and hem for the jogger silhouette. Kangaroo pocket detail.",
    care: "Machine wash cold inside out. Colors may bleed slightly on first wash (natural dyes). Tumble dry low. Iron on medium heat.",
    shipping: "Free shipping on orders above ₹999. Standard delivery in 5-7 business days. Combine with other items for free shipping!",
    reviews: [
      { id: "r1", name: "Aditya Rana", rating: 4, date: "2024-03-15", comment: "Super comfortable and stylish! The jogger style is unique and the block print looks authentic. Great for casual outings.", avatar: "AR" },
      { id: "r2", name: "Ishaan Bhatt", rating: 4, date: "2024-03-08", comment: "Love the concept of a jogger kurta. The fit is relaxed and perfect for everyday wear. The orange color is vibrant.", avatar: "IB" },
      { id: "r3", name: "Pranav Desai", rating: 5, date: "2024-02-27", comment: "Best budget ethnic wear I've found! Bought the grey one first and immediately ordered the orange. Fantastic quality for the price.", avatar: "PD" },
    ],
    inStock: true,
    tags: ["kurta", "men", "block-print", "fusion", "jogger"],
  },
];

export const heroSlides = [
  {
    id: 1,
    title: "Ethnic Elegance Sale",
    subtitle: "Up to 40% Off on Premium Ethnic Wear",
    cta: "Shop Now",
    link: "/products",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&h=700&fit=crop",
    gradient: "from-amber-900/80 to-orange-800/60",
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Discover the Latest in Indian Fashion",
    cta: "Shop Now",
    link: "/products",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1600&h=700&fit=crop",
    gradient: "from-rose-900/80 to-pink-800/60",
  },
  {
    id: 3,
    title: "Festive Collection",
    subtitle: "Celebrate in Style — Diwali Specials",
    cta: "Shop Now",
    link: "/products",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1600&h=700&fit=crop",
    gradient: "from-purple-900/80 to-indigo-800/60",
  },
];
