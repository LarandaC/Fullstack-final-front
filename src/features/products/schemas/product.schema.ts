import { z } from "zod";
import { UNIT_VALUES, IVA_VALUES } from "../types/product.types";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const productSchema = z
  .object({
    name: z.string().min(2, "Mínimo 2 caracteres"),
    description: z.string().optional(),
    sku: z.string().min(1, "El SKU es requerido"),
    barcode: z.string().optional(),
    category: z.string().min(1, "La categoría es requerida"),
    purchasePrice: z
      .number({ error: "Debe ser un número" })
      .min(0, "No puede ser negativo"),
    salePrice: z
      .number({ error: "Debe ser un número" })
      .min(0, "No puede ser negativo"),
    image: z
      .instanceof(File)
      .refine(
        (file) => file.size <= MAX_FILE_SIZE,
        "El archivo debe ser menor a 5MB",
      )
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Formato permitido: JPG, PNG, WebP",
      )
      .optional()
      .or(z.string().optional()),
    isWeighable: z.boolean(),
    unit: z.enum(UNIT_VALUES),
    iva: z.union([z.literal(0), z.literal(10), z.literal(5)]),
    minStock: z
      .number({ error: "Debe ser un número" })
      .min(0, "No puede ser negativo"),
    maxStock: z
      .number({ error: "Debe ser un número" })
      .min(0, "No puede ser negativo"),
  })
  .superRefine((data, ctx) => {
    if (data.isWeighable && data.unit !== "kg") {
      ctx.addIssue({
        code: "custom",
        path: ["unit"],
        message: 'Los productos pesables deben usar la unidad "kg"',
      });
    }
    if (data.maxStock < data.minStock) {
      ctx.addIssue({
        code: "custom",
        path: ["maxStock"],
        message: "El stock máximo no puede ser menor al mínimo",
      });
    }
    if (data.salePrice < data.purchasePrice) {
      ctx.addIssue({
        code: "custom",
        path: ["salePrice"],
        message: "El precio de venta no puede ser menor al precio de compra",
      });
    }
  });

export type ProductFormValues = z.infer<typeof productSchema>;

export { IVA_VALUES };
