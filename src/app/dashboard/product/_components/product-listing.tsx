import { Product } from '@/constants/data';
import { fakeProducts } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './product-tables/columns';
import { SearchParams } from 'nuqs/server';

type ProductListingPage = { searchParams: Promise<SearchParams> }; // Next.js 15+: async searchParams prop};

export default async function ProductListingPage({
  searchParams
}: ProductListingPage) {
  const params = await searchParamsCache.parse(searchParams || {});
  const { page, search, limit, categories } = params;

  const filters = {
    page,
    limit: limit,
    ...(search && { search }),
    ...(categories && { categories: categories })
  };

  const data = await fakeProducts.getProducts(filters);
  const totalProducts = data.total_products;
  const products: Product[] = data.products;

  return (
    <ProductTable
      columns={columns}
      data={products}
      totalItems={totalProducts}
    />
  );
}
