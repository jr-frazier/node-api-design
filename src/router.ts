import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {
  getProduct,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./handlers/product";
import {
  getAllUpdates,
  getUpdate,
  createUpdate,
  updateUpdate,
  deleteUpdate,
} from "./handlers/update";
import { appendFile } from "fs";

const router = Router();

/**
 * Product routes
 */
router.get("/product", getAllProducts as any);
router.get("/product/:id", getProduct as any);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct as any
);
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct as any
);

router.delete("/product/:id", deleteProduct as any);

/**
 * Update routes
 */
router.get("/update", getAllUpdates as any);
router.get("/update/:id", getUpdate);
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn([
    body("IN_PROGRESS"),
    body("SHIPPED"),
    body("DEPRECATED"),
  ]),
  body("version").optional(),
  updateUpdate as any
);
router.post(
  "/update/:id",
  body("title").exists().isString(),
  body("body").exists().isString(),
  createUpdate
);
router.delete("/update/:id", deleteUpdate as any);

/**
 * Update Point routes
 */
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  () => {}
);
router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updatId").exists().isString(),
  () => {}
);
router.delete("/updatepoint/:id", () => {});

export default router;
