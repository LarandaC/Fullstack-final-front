export const UNIT_VALUES = ["kg", "un", "lt"] as const;
export type UnitType = (typeof UNIT_VALUES)[number];

export const UNIT_LABELS: Record<UnitType, string> = {
  kg: "Kilogramos",
  un: "Unidad",
  lt: "Litros",
};

export const IVA_VALUES = [0, 10, 5] as const;
export type IvaType = (typeof IVA_VALUES)[number];

export interface Product {
  _id: string;
  name: string;
  description?: string;
  sku: string;
  barcode?: string;
  category: { _id: string; name: string } | string;
  purchasePrice: number;
  salePrice: number;
  image?: string;
  isWeighable: boolean;
  unit: UnitType;
  iva: IvaType;
  stock: number;
  minStock: number;
  maxStock: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductPayload {
  name: string;
  description?: string;
  sku: string;
  barcode?: string;
  category: string;
  purchasePrice: number;
  salePrice: number;
  image?: string;
  isWeighable: boolean;
  unit: UnitType;
  iva?: IvaType;
  minStock: number;
  maxStock: number;
}

export type UpdateProductPayload = Partial<CreateProductPayload>;

export interface ProductsQueryParams {
  page: number;
  limit: number;
}
