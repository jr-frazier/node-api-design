import { NextFunction, Response } from "express";
import prisma from "../db";
import { RequestWithUser } from "../types/express/RequestWithUser";

// Get All Products
export const getAllProducts = async (req: RequestWithUser, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });

  if (!user) {
    res.status(404);
    res.json({ message: "User not found" });
    return;
  }

  res.json({ data: user.products });
};

// Get Single Product
export const getProduct = async (req: RequestWithUser, res: Response) => {
  const product = await prisma.product.findFirst({
    where: {
      id: req.params.id,
      belongsToId: req.user.id,
    },
  });
  res.json({ data: product });
};

// Create Product
export const createProduct = async (req: RequestWithUser, res: Response) => {
  await prisma.product
    .create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id,
      },
    })
    .then((product) => {
      res.json({ data: product });
    })
    .catch((err) => {
      res.status(500);
      res.json({ message: "Exceeded character limit" });
    });
};

// Update Product
export const updateProduct = async (req: RequestWithUser, res: Response) => {
  const product = await prisma.product.update({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
    data: {
      name: req.body.name,
    },
  });

  res.json({ data: product });
};

// Delete Product
export const deleteProduct = async (req: RequestWithUser, res: Response) => {
  const product = await prisma.product.delete({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
  });

  res.json({ data: product });
};
