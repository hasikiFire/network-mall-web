import { searchParamsCache } from '@/lib/searchparams';
import React from 'react';
import EmployeeListingPage from './_components/employee-listing-page';

type PageProps = {
  searchParams: Promise<any>;
};

export const metadata = {
  title: 'Dashboard : Employees'
};

export default async function Page({ searchParams }: PageProps) {
  // Await the searchParams promise
  const resolvedSearchParams = await searchParams;
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(resolvedSearchParams);

  return <EmployeeListingPage />;
}
