import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse",
        price: 29.99,
        stock: 50,
      },
      {
        name: "Mechanical Keyboard",
        description: "RGB mechanical keyboard with blue switches",
        price: 79.99,
        stock: 30,
      },
      {
        name: "Gaming Monitor",
        description: "27-inch 144Hz gaming monitor",
        price: 249.99,
        stock: 20,
      },
      {
        name: "Bluetooth Headphones",
        description: "Noise-canceling over-ear headphones",
        price: 99.99,
        stock: 40,
      },
      {
        name: "USB-C Docking Station",
        description: "10-in-1 docking station for laptops",
        price: 59.99,
        stock: 15,
      },
      {
        name: "Portable SSD 1TB",
        description: "High-speed external SSD with USB 3.2",
        price: 129.99,
        stock: 25,
      },
      {
        name: "Smartphone Stand",
        description: "Adjustable aluminum phone stand",
        price: 19.99,
        stock: 60,
      },
      {
        name: "Wireless Charger",
        description: "Fast-charging wireless pad",
        price: 34.99,
        stock: 35,
      },
      {
        name: "Webcam 1080p",
        description: "Full HD webcam with microphone",
        price: 49.99,
        stock: 22,
      },
      {
        name: "Ergonomic Office Chair",
        description: "Adjustable chair with lumbar support",
        price: 199.99,
        stock: 10,
      },
    ],
  });

  console.log("Seed data inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
