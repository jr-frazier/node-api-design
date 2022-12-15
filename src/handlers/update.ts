import prisma from "../db";
import { NextFunction, Request, Response } from "express";
import { Update, Product, Prisma } from "@prisma/client";
import { RequestWithUser } from "../types/express/RequestWithUser";

// Auto Generated Type from Prisma that includes the updates for Product
// This is required since the default auto generated type does not include the updates
type ProductWithUpdates = Prisma.ProductGetPayload<{
  include: { updates: true };
}>;

/**
 * Get All Updates
 * @param req
 * @param res
 */
export const getAllUpdates = async (req: RequestWithUser, res: Response) => {
  // Get all products where id is equal to the current user id
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce(
    (allUpdates: Update[], product: ProductWithUpdates) => {
      return [...allUpdates, ...product.updates];
    },
    []
  );

  res.json({ data: updates });
};

/**
 * Get Single Update
 * @param req
 * @param res
 */
export const getUpdate = async (req: Request, res: Response) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: update });
};

/**
 * Create Update
 * @param req
 * @param res
 * @returns
 */
export const createUpdate = async (req: Request, res: Response) => {
  console.log("Looking for product");
  const product = await prisma.product.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!product) {
    res.status(404);
    res.json({ message: "Product not found" });
    return;
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      product: { connect: { id: product.id } },
    },
  });

  res.status(200).json({ data: update });
};

/**
 * Update Update
 * @param req Update ID
 * @param res
 * @returns
 */
export const updateUpdate = async (req: RequestWithUser, res: Response) => {
  // Find the update
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });

  // If the update does not exist, return a 404
  if (!update) {
    res.status(404);
    res.json({ message: "Update not found" });
    return;
  }

  // Find the product that the update belongs to
  const product = await prisma.product.findUnique({
    where: {
      id: update.productId,
    },
  });

  // If the product does not belong to the current user, return a 403
  if (product?.belongsToId !== req.user.id) {
    res.status(403);
    res.json({ message: "You do not have permission to issue this update" });
    return;
  }

  // Update the update
  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.status(200).json({ data: updatedUpdate });
};

/**
 * Delete Update
 * @param req Update ID
 * @param res
 */
export const deleteUpdate = async (req: RequestWithUser, res: Response) => {
  // Find the update
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });

  // If the update does not exist, return a 404
  if (!update) {
    res.status(404);
    res.json({ message: "Update not found" });
    return;
  }

  // Find the product that the update belongs to
  const product = await prisma.product.findUnique({
    where: {
      id: update.productId,
    },
  });

  // If the product does not belong to the current user, return a 403
  if (product?.belongsToId !== req.user.id) {
    res.status(403);
    res.json({ message: "You do not have permission to delete this update" });
    return;
  }

  // Delete the update
  const deletedUpdate = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ data: deletedUpdate });
};
