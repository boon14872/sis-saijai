-- CreateTable
CREATE TABLE "Topping" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ProductTopping" (
    "productId" INTEGER NOT NULL,
    "toppingId" INTEGER NOT NULL,

    PRIMARY KEY ("productId", "toppingId"),
    CONSTRAINT "ProductTopping_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductTopping_toppingId_fkey" FOREIGN KEY ("toppingId") REFERENCES "Topping" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
