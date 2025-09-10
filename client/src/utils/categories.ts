export interface CatItems{
    id:string;
    name:string;
    str:string;
    subcategories?:{id:string,name:string,str:string,colors?:boolean,size?:boolean,quant1?:boolean,quant2?:boolean}[];
    colors:boolean;
    size:boolean;
    quant1?:boolean;
    quant2?:boolean;
}


// export const categories:CatItems[]=[
//     {
//         id: "1",
//         str: "fashion",
//         name: "Fashion",
//        } subcategories: [
//             { id: "1-1", str: "clothes", name: "Clothes" },
//             { id: "1-2", str: "shoes", name: "Shoes" },
//             { id: "1-3", str: "sunglasses", name: "Sunglasses" },
//             { id: "1-4", str: "belt", name: "Belt" },
//             { id: "1-5", str: "wallet", name: "Wallet" },
//             { id: "1-6", str: "cap", name: "Cap" },
//             { id: "1-7", str: "socks", name: "Socks" } // corrected spelling
//         ]
//     },
//     {
//         id: "2",
//         str: "watches",
//         name: "Watches",
//         subcategories: []
//     },
//     {
//         id: "3",
//         str: "ladies_kurti",
//         name: "Ladies Kurti",
//         subcategories: []
//     },
//     {
//         id: "4",
//         str: "ladies_suit",
//         name: "Ladies Suit",
//         subcategories: []
//     },
//     {
//         id: "5",
//         str: "home_decor",
//         name: "Home Decor",
//         subcategories: []
//     },
//     {
//         id: "6",
//         str: "home_furnishing",
//         name: "Home Furnishing",
//         subcategories: []
//     },
//     {
//         id: "7",
//         str: "bed_sheet",
//         name: "Bed Sheet",
//         subcategories: []
//     },
//     {
//         id: "8",
//         str: "cosmetics",
//         name: "Cosmetics",
//         subcategories: []
//     },
//     {
//         id: "9",
//         str: "artificial_jewelry",
//         name: "Artificial Jewelry",
//         subcategories: []
//     },
//     {
//         id: "10",
//         str: "toys",
//         name: "Toys",
//         subcategories: []
//     },
//     {
//         id: "11",
//         str: "mobile_accessories",
//         name: "Mobile Accessories",
//         subcategories: []
//     },
//     {
//         id: "12",
//         str: "kids_knowledge_kit",
//         name: "Kids Knowledge Kit",
//         subcategories: []
//     },
//     {
//         id: "13",
//         str: "novel_books",
//         name: "Novel Books",
//         subcategories: []
//     },
//     {
//         id: "14",
//         str: "plastic_items",
//         name: "Plastic Items",
//         subcategories: [
//             { id: "14-1", str: "mug", name: "Mug" },
//             { id: "14-2", str: "basket", name: "Basket" },
//             { id: "14-3", str: "comb", name: "Comb" },
//             { id: "14-4", str: "etc", name: "Etc" }
//         ]
//     },
//     {
//         id: "15",
//         str: "broom",
//         name: "Broom",
//         subcategories: []
//     },
//     {
//         id: "16",
//         str: "hand_bag",
//         name: "Hand Bag",
//         subcategories: []
//     },
//     {
//         id: "17",
//         str: "luggage_bag",
//         name: "Luggage Bag", // corrected spelling
//         subcategories: []
//     },
//     {
//         id: "18",
//         str: "trolley",
//         name: "Trolley", // corrected spelling
//         subcategories: []
//     },
//     {
//         id: "19",
//         str: "beverage_items",
//         name: "Beverage Items",
//         subcategories: [
//             { id: "19-1", str: "cold_drinks", name: "Cold Drinks" },
//             { id: "19-2", str: "healthy_drinks", name: "Healthy Drinks" },
//             { id: "19-3", str: "etc", name: "Etc" }
//         ]
//     },
//     {
//         id: "20",
//         str: "chocolate_toffee",
//         name: "Chocolate / Toffee",
//         subcategories: []
//     },
//     {
//         id: "21",
//         str: "snacks",
//         name: "Snacks",
//         subcategories: []
//     },
//     {
//         id: "22",
//         str: "others",
//         name: "Others",
//         subcategories: []
//     },
//     {
//         id: "23",
//         str: "etc",
//         name: "Etc",
//         subcategories: []
//     }
// ]



export const categories = [
  {
    id: "1",
    str: "kids&toys",
    name: "Kids & Toys",
    colors:true,
    ssize:true,
    quant2:false,
    quant1:false,
    image:"catIcon/kidClothes.jpeg",
    subcategories: [
      {
        id: "1-1",
        str: "kidsClothing",
        name: "Kids Clothing",
      },
      {
        id: "1-2",
        str: "kidsToys",
        name: "Kid's Toys",
      },
      {
        id: "1-3",
        str: "kidsAccessories",
        name: "Kids Accessories",
      }
    ]
  },
  {
    id: "2",
    str: "home&kitchen",
    name: "Home & Kitchen",
    colors:false,
    ssize:false,
    quant2:false,
    quant1:false,
    image:"catIcon/homeKit.jpeg",
    subcategories: [
      {
        id: "2-1",
        str: "homeDecor",
        name: "Home Décor",
      },
      {
        id: "2-2",
        str: "kitchenAppliances",
        name: "Kitchen Appliances",
      },
      {
        id: "2-3",
        str: "homeTextiles",
        name: "Home Textiles",
      },
      {
        id: "2-4",
        str: "homeImprovement",
        name: "Home Improvement",
      }
    ]
  },
  {
    id: "3",
    str: "beauty&health",
    name: "Beauty & Health",
    colors:false,
    ssize:false,
    quant2:false,
    quant1:false,
    image:"catIcon/kidClothes.jpeg",
    subcategories: [
      {
        id: "3-1",
        str: "makeup",
        name: "Makeup",
      },
      {
        id: "3-2",
        str: "personalCare",
        name: "Personal Care",
      },
      {
        id: "3-3",
        str: "healthCare",
        name: "Health Care",
      },
      {
        id: "3-4",
        str: "mensCare",
        name: "Men's Care",
      }
    ]
  },
  {
    id: "4",
    str: "jewellery&accessories",
    name: "Jewellery & Accessories",
    colors:false,
    ssize:false,
    quant2:false,
    quant1:false,
    image:"catIcon/jwelry.jpeg",
    subcategories: [
      {
        id: "4-1",
        str: "jewellery",
        name: "Jewellery",
      },
      {
        id: "4-2",
        str: "menAccessories",
        name: "Men Accessories",
      },
      {
        id: "4-3",
        str: "womenAccessories",
        name: "Women Accessories",
      }
    ]
  },
  {
    id: "5",
    str: "bags",
    name: "Bags",
    colors:true,
    ssize:true,
    quant1:false,
    quant2:false,
    image:"catIcon/bags.jpeg",
    subcategories: [
      {
        id: "5-1",
        str: "womenBags",
        name: "Women Bags",
      },
      {
        id: "5-2",
        str: "mensBag",
        name: "Men's Bag",
      },
      {
        id: "5-3",
        str: "travelBagsLuggage",
        name: "Travel Bags & Luggage",
      }
    ]
  },
  {
    id: "6",
    str: "footwear",
    name: "Footwear",
    color:true,
    ssize:true,
    quant1:false,
    quant2:false,
    image:"catIcon/footwear.jpeg",
    subcategories: [
      {
        id: "6-1",
        str: "womenFootwear",
        name: "Women Footwear",
      },
      {
        id: "6-2",
        str: "menFootwear",
        name: "Men Footwear",
      },
      {
        id: "6-3",
        str: "kidsFootwear",
        name: "Kids Footwear",
      }
    ]
  },
  {
    id: "7",
    str: "watches",
    name: "Watches",
    colors:false,
    ssize:false,
    quant2:false,
    quant1:false,
    image:"catIcon/watches.jpeg",
    subcategories: [
      {
        id: "7-1",
        str: "mensWatches",
        name: "Men's Watches",
      },
      {
        id: "7-2",
        str: "womenWatches",
        name: "Women Watches",
      }
    ]
  },
  {
    id: "8",
    str: "grocery",
    name: "Grocery",
     colors:false,
    ssize:false,
    quant2:false,
    quant1:false,
    image:"catIcon/grocery.jpeg",
    subcategories: [
      {
        id: "8-1",
        str: "food&drinks",
        name: "Food & Drinks",
      }
    ]
  },
  {
    id: "9",
    str: "books",
    name: "Books",
     colors:false,
    ssize:false,
    quant2:false,
    quant1:false,
    image:"catIcon/books.jpeg",
    subcategories: [
      {
        id: "9-1",
        str: "fictionsAndNonFictions",
        name: "Fictions and Non Fictions",
      }
    ]
  },
  {
    id: "10",
    str: "lingerie",
    name: "Lingerie",
    colors:true,
    ssize:true,
    quant1:false,
    quant2:false,
    image:"catIcon/lingree.jpeg",
    subcategories: [
      {
        id: "10-1",
        str: "innerWear",
        name: "Inner Wear",
      },
      {
        id: "10-2",
        str: "sleepWear",
        name: "Sleep Wear",
      },
      {
        id: "10-3",
        str: "sportsWear",
        name: "Sports Wear",
      }
    ]
  },
  {
    id: "11",
    str: "men",
    name: "Men",
    colors:true,
    ssize:true,
    quant1:false,
    quant2:false,
    image:"catIcon/men.jpeg",
    subcategories: [
      {
        id: "11-1",
        str: "topWear",
        name: "Top Wear",
      },
      {
        id: "11-2",
        str: "bottomWear",
        name: "Bottom Wear",
      },
      {
        id: "11-3",
        str: "ethnicWear",
        name: "Ethnic Wear",
      },
      {
        id: "11-4",
        str: "innerwear",
        name: "Innerwear",
      },
      {
        id: "11-5",
        str: "nightWear",
        name: "Night Wear",
      }
    ]
  },
  {
    id: "12",
    str: "women",
    name: "Women",
    colors:true,
    ssize:true,
    quant1:false,
    quant2:false,
    image:"catIcon/women.jpeg",
    subcategories: [
      {
        id: "12-1",
        str: "kurti",
        name: "Kurti",
      },
      {
        id: "12-2",
        str: "saree",
        name: "Saree",
      },
      {
        id: "12-3",
        str: "suitDressMaterial",
        name: "Suit Dress Material",
      },
      {
        id: "12-4",
        str: "lehnga",
        name: "Lehnga",
      },
      {
        id: "12-5",
        str: "gown",
        name: "Gown",
      },
      {
        id: "12-6",
        str: "topWear",
        name: "Top Wear",
      },
      {
        id: "12-7",
        str: "bottomWear",
        name: "Bottom Wear",
      },
      {
        id: "12-8",
        str: "ethnicWear",
        name: "Ethnic Wear",
      },
      {
        id: "12-9",
        str: "dupPatta",
        name: "Dupatta",
      },
      {
        id: "12-10",
        str: "abayaNagab",
        name: "Abaya/Nagab",
      }
    ]
  },
  {
    id: "13",
    str: "stationary",
    name: "Stationary",
    image:"catIcon/books.jpeg",
    subcategories: [],
     colors:false,
    ssize:false,
    quant2:false,
    quant1:false,
// No subcategories listed in image
  },
  {
    id: "14",
    str: "sports",
    name: "Sports",
     colors:false,
    ssize:false,
    quant2:false,
    quant1:false,
    image:"catIcon/sports.jpeg",
    subcategories: [] // No subcategories listed in image
  },
  {
    id: "15",
    str: "fitness",
    name: "Fitness",
     colors:false,
    ssize:false,
    quant2:false,
    quant1:false,
    image:"catIcon/fitness.jpeg",
    subcategories: [] // No subcategories listed in image
  },{
    id:"16",
    str:"giftsAndGadget",
    name:"Gifts & Gadget",
    colors:false,
    ssize:false,
    quant1:false,
    quant2:false,
    image:"catIcon/gag.jpeg",
    subcategories:[]
  }
];

export const findCategoryIndex = (category:string) => {
  return categories.findIndex(item => item.str === category);
};
