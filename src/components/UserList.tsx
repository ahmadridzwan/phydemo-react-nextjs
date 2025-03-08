'use client';

import React, { useEffect, useRef, useState } from 'react';
import { User } from '@/types/user';
import { fetchUsers } from '@/services/api';
import UserCard from './UserCard';
import Loading from './Loading';
import Navbar from './Navbar';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useRouter } from 'next/navigation';

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const observerTarget = useRef<HTMLDivElement>(null);
  const { isMobile } = useWindowSize();
  const initialLoadRef = useRef(true);
  const router = useRouter();

  const loadUsers = async (pageNum: number) => {
    if (pageNum > totalPages && totalPages !== 1) return;

    try {
      setLoading(true);
      setError(null);
      const response = await fetchUsers(pageNum);

      if (initialLoadRef.current) {
        setUsers(response.data);
      } else {
        setUsers((prev) => [...prev, ...response.data]);
      }

      setTotalPages(response.total_pages);
      setHasMore(pageNum < response.total_pages);

      if (initialLoadRef.current) {
        setInitialLoading(false);
        initialLoadRef.current = false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  // Initial load with delay
  useEffect(() => {
    const timer = setTimeout(() => {
      loadUsers(1);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Handle page changes
  useEffect(() => {
    if (!initialLoadRef.current && page > 1 && page <= totalPages) {
      loadUsers(page);
    }
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !loading &&
          page < totalPages
        ) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.5 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, page, totalPages]);

  const handleUserClick = (user: User) => {
    router.push(`/users/${user.id}`);
  };

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <>
      {initialLoading && <Loading />}
      <div className="min-h-screen flex flex-col">
        <Navbar title="Users" />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-4">
            <div
              className={
                isMobile
                  ? 'flex flex-col'
                  : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
              }
            >
              {users.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onClick={handleUserClick}
                  isMobile={isMobile}
                />
              ))}
            </div>

            <div ref={observerTarget} className="mt-8 text-center">
              {loading && !initialLoading && (
                <div className="w-8 h-8 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin mx-auto" />
              )}
              {!hasMore && users.length > 0 && (
                <p className="text-gray-500">No more users to load</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default UserList;
