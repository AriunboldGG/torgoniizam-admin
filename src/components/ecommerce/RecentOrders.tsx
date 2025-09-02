import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Image from "next/image";

// Define the TypeScript interface for the table rows
interface Product {
  id: number; // Unique identifier for each product
  uniqID: string; // Unique auction ID for tracking winners
  name: string; // Product name
  variants: string; // Number of variants (e.g., "1 Variant", "2 Variants")
  category: string; // Category of the product
  price: string; // Price of the product (as a string with currency symbol)
  image: string; // URL or path to the product image
  status: "Active" | "Sold" | "Pending"; // Status of the product
  seller: string; // Seller name
  winner?: string; // Winner name (if sold)
}

// Define the table data using the interface
const tableData: Product[] = [
  {
    id: 1,
    uniqID: "AU-2024-001",
    name: "Gold Ring",
    variants: "1 Variant",
    category: "ҮНЭТ ЭДЛЭЛ",
    price: "₮2,800,000",
    status: "Active",
    image: "/images/product/prod1.jpg",
    seller: "Алтан Шармал Дэлгүүр",
  },
  {
    id: 2,
    uniqID: "AU-2024-002",
    name: "iPhone 15 Pro",
    variants: "1 Variant",
    category: "ГАР УТАС & ТАБЛЕТ",
    price: "₮1,800,000",
    status: "Sold",
    image: "/images/product/prod2.png",
    seller: "Технологийн Дэлгүүр",
    winner: "Батбаяр",
  },
  {
    id: 3,
    uniqID: "AU-2024-003",
    name: "MacBook Pro",
    variants: "1 Variant",
    category: "КОМПЬЮТЕР",
    price: "₮950,000",
    status: "Active",
    image: "/images/product/prod3.png",
    seller: "Компьютер Дэлгүүр",
  },
  {
    id: 4,
    uniqID: "AU-2024-004",
    name: "Samsung TV",
    variants: "1 Variant",
    category: "ЦАХИЛГААН БАРАА",
    price: "₮3,200,000",
    status: "Pending",
    image: "/images/product/prod4.png",
    seller: "Электроник Дэлгүүр",
  },
  {
    id: 5,
    uniqID: "AU-2024-005",
    name: "Toyota Land Cruiser",
    variants: "1 Variant",
    category: "АВТОМАШИН",
    price: "₮52,000,000",
    status: "Active",
    image: "/images/product/prod1.jpg",
    seller: "Авто Дэлгүүр",
  },
];

export default function RecentOrders() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Auction Products
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Search products by unique ID to track winners
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <svg
              className="stroke-current fill-white dark:fill-gray-800"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.29004 5.90393H17.7067"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.7075 14.0961H2.29085"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
              <path
                d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
            </svg>
            Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            See all
          </button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Products
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Unique ID
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Category
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Price
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((product) => (
              <TableRow key={product.id} className="">
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <Image
                        width={50}
                        height={50}
                        src={product.image}
                        className="h-[50px] w-[50px]"
                        alt={product.name}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {product.name}
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {product.seller}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3">
                  <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400 rounded-full">
                    {product.uniqID}
                  </span>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.category}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.price}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      product.status === "Active"
                        ? "success"
                        : product.status === "Sold"
                        ? "info"
                        : "warning"
                    }
                  >
                    {product.status}
                  </Badge>
                  {product.winner && (
                    <div className="mt-1 text-xs text-blue-600 dark:text-blue-400">
                      Winner: {product.winner}
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
