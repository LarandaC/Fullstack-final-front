import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  productSchema,
  type ProductFormValues,
} from "../schemas/product.schema";
import { productService } from "../services/product.service";
import { PRODUCTS_QUERY_KEY } from "./useProducts";
import { useCategories } from "@/features/categories/hooks/useCategories";

export const PRODUCT_EMPTY_DEFAULTS: ProductFormValues = {
  name: "",
  description: "",
  sku: "",
  barcode: "",
  category: "",
  purchasePrice: 0,
  salePrice: 0,
  image: undefined,
  isWeighable: false,
  unit: "un",
  iva: 10,
  minStock: 0,
  maxStock: 0,
};

export function useProductForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: PRODUCT_EMPTY_DEFAULTS,
  });

  const isWeighable = form.watch("isWeighable");

  useEffect(() => {
    if (isWeighable) form.setValue("unit", "kg", { shouldValidate: true });
  }, [isWeighable, form]);

  const { data: categories, isLoading: loadingCategories } = useCategories();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ image, ...values }: ProductFormValues) =>
      productService.create({
        ...values,
        barcode: values.barcode || undefined,
        image: image instanceof File ? undefined : image || undefined,
        description: values.description || undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] });
      toast.success("Producto creado");
      navigate("/products");
    },
    onError: () => {
      toast.error("No se pudo crear el producto");
    },
  });

  return {
    form,
    isWeighable,
    categories,
    loadingCategories,
    isPending,
    onSubmit: mutate,
  };
}
