

export const tags=[
    {
        id: "1",
        str: "popular",
        name: "Popular",
       
    },
    {
        id: "2",
        str: "trending",
        name: "Trending Now",
       
    },
    {
        id: "3",
        str: "bestDeals",
        name: "Best Deals",
       
    },
    {
        id: "4",
        str: "30percentOff",
        name: "30% Off",
       
    },
    {
        id: "5",
        str: "40percentOff",
        name: "40% Off",
        
    },
    {
        id: "6",
        str: "50percentOff",
        name: "50% Off",
        
    },
   
]


export const getTag = (index) => {
  return tags[index].str;
};