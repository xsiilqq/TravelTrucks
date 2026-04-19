'use client';

import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import styles from './page.module.css';
import CatalogFilters from '@/components/CatalogFilters/CatalogFilters';
import CamperCard from '@/components/CamperCard/CamperCard';
import Loader from '@/components/Loader/Loader';
import { getCampers } from '@/lib/api';
import { Camper } from '@/types/camper';
import { Filters } from '@/types/filters';

const initialFilters: Filters = {
  location: '',
  form: '',
  engine: '',
  transmission: '',
};

export default function CatalogPage() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState<Filters>(initialFilters);
  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['campers', appliedFilters],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getCampers({
        page: pageParam,
        limit: 4,
        location: appliedFilters.location,
        form: appliedFilters.form,
        engine: appliedFilters.engine,
        transmission: appliedFilters.transmission,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.totalPages) return undefined;

      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.totalPages ? nextPage : undefined;
    },
  });

  const campers: Camper[] =
    data?.pages.flatMap((page) =>
      Array.isArray(page?.campers) ? page.campers : []
    ) ?? [];

  const handleSearch = () => {
    setAppliedFilters(filters);
  };

  const handleClear = () => {
    setFilters(initialFilters);
    setAppliedFilters(initialFilters);
  };

  if (isLoading) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <aside className={styles.sidebar}>
            <CatalogFilters
              filters={filters}
              onChange={setFilters}
              onSearch={handleSearch}
              onClear={handleClear}
            />
          </aside>

          <section className={styles.content}>
            <Loader />
          </section>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <aside className={styles.sidebar}>
            <CatalogFilters
              filters={filters}
              onChange={setFilters}
              onSearch={handleSearch}
              onClear={handleClear}
            />
          </aside>

          <section className={styles.content}>
            <p>Something went wrong.</p>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <CatalogFilters
            filters={filters}
            onChange={setFilters}
            onSearch={handleSearch}
            onClear={handleClear}
          />
        </aside>

        <section className={styles.content}>
          {campers.length === 0 ? (
            <p>No campers found.</p>
          ) : (
            <>
              <ul className={styles.list}>
                {campers.map((camper) => (
                  <li key={camper.id} className={styles.item}>
                    <CamperCard camper={camper} />
                  </li>
                ))}
              </ul>

              {hasNextPage && (
                <button
                  className={styles.loadMore}
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? 'Loading...' : 'Load more'}
                </button>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}
