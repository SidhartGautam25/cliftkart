// components/DashboardSummary.tsx
import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Category list
export const categories = [
  { id: "1", str: "fashion", name: "Fashion", subcategories: [] },
  { id: "2", str: "watches", name: "Watches", subcategories: [] },
  { id: "3", str: "ladies_kurti", name: "Ladies Kurti", subcategories: [] },
  { id: "4", str: "ladies_suit", name: "Ladies Suit", subcategories: [] },
  { id: "5", str: "home_decor", name: "Home Decor", subcategories: [] },
  { id: "6", str: "home_furnishing", name: "Home Furnishing", subcategories: [] },
  { id: "7", str: "bed_sheet", name: "Bed Sheet", subcategories: [] },
  { id: "8", str: "cosmetics", name: "Cosmetics", subcategories: [] },
  { id: "9", str: "artificial_jewelry", name: "Artificial Jewelry", subcategories: [] },
  { id: "10", str: "toys", name: "Toys", subcategories: [] },
  { id: "11", str: "mobile_accessories", name: "Mobile Accessories", subcategories: [] },
  { id: "12", str: "kids_knowledge_kit", name: "Kids Knowledge Kit", subcategories: [] },
  { id: "13", str: "novel_books", name: "Novel Books", subcategories: [] },
  { id: "14", str: "plastic_items", name: "Plastic Items", subcategories: [] },
  { id: "15", str: "broom", name: "Broom", subcategories: [] },
  { id: "16", str: "hand_bag", name: "Hand Bag", subcategories: [] },
  { id: "17", str: "luggage_bag", name: "Luggage Bag", subcategories: [] },
  { id: "18", str: "trolley", name: "Trolley", subcategories: [] },
  { id: "19", str: "beverage_items", name: "Beverage Items", subcategories: [] },
  { id: "20", str: "chocolate_toffee", name: "Chocolate / Toffee", subcategories: [] },
  { id: "21", str: "snacks", name: "Snacks", subcategories: [] },
  { id: "22", str: "others", name: "Others", subcategories: [] },
  { id: "23", str: "etc", name: "Etc", subcategories: [] },
];

export const getCat = (ind: number) => {
  console.log("return value is ", categories[ind].str);
  return categories[ind].str;
};

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardSummary: React.FC = () => {
  const stats = [
    { title: "Total Products", value: 150, color: "bg-blue-500" },
    { title: "Total Users", value: "53%", color: "bg-green-500" },
    { title: "Today's Sales", value: 44, color: "bg-yellow-500" },
    { title: "Total Earnings", value:  "65K", color: "bg-red-500" },
  ];

  // Doughnut chart from categories
  const doughnutData = {
    labels: categories.map((cat) => cat.name),
    datasets: [
      {
        data: categories.map(() => Math.floor(Math.random() * 100) + 10),
        backgroundColor: [
          "#f87171",
          "#facc15",
          "#60a5fa",
          "#34d399",
          "#a78bfa",
          "#f472b6",
          "#fb923c",
          "#2dd4bf",
          "#c084fc",
          "#4ade80",
          "#fcd34d",
          "#e879f9",
          "#93c5fd",
          "#fda4af",
          "#fde047",
          "#86efac",
          "#67e8f9",
          "#f9a8d4",
          "#a1a1aa",
          "#fbbf24",
          "#38bdf8",
          "#d8b4fe",
          "#fca5a5",
        ],
      },
    ],
  };

  // Single dataset bar chart for daily sales
  const barData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: "Daily Sales",
        data: [120, 150, 90, 180, 200, 170, 140], // example data
        backgroundColor: "#60a5fa",
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} text-white p-4 rounded-lg shadow-md flex flex-col justify-between`}
          >
            <h3 className="text-lg font-semibold">{stat.title}</h3>
            <p className="text-2xl font-bold">{stat.value}</p>
            {/* <button className="text-white text-sm underline mt-2">
              More info
            </button> */}
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="mb-4 font-semibold">Doughnut Chart (Categories)</h3>
          <Doughnut data={doughnutData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="mb-4 font-semibold">Bar Chart (Daily Sales)</h3>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
