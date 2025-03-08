'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { User } from '@/types/user';
import { fetchUserById } from '@/services/api';
import Navbar from '@/components/Navbar';
import Loading from '@/components/Loading';
import NotFound from '@/components/NotFound';
import { ApiError } from '@/types/api';

export default function UserDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUserById(Number(params.id));
        setUser(userData);
      } catch (err) {
        if (err instanceof ApiError && err.statusCode === 404) {
          setError('not_found');
        } else {
          setError(err instanceof Error ? err.message : 'Failed to load user');
        }
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [params.id]);

  if (loading) return <Loading />;

  if (error === 'not_found') {
    return <NotFound message="The requested user could not be found." />;
  }
  if (error || !user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar title="Error" showBack onBack={() => router.back()} />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500 text-center p-4">
            {error || 'Unable to load user data'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar title="User Details" showBack onBack={() => router.back()} />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-32 h-32 mb-4">
              <Image
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {user.first_name} {user.last_name}
            </h1>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <dl className="grid grid-cols-1 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  First Name
                </dt>
                <dd className="mt-1 text-lg text-gray-900">
                  {user.first_name}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Last Name</dt>
                <dd className="mt-1 text-lg text-gray-900">{user.last_name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-lg text-gray-900">{user.email}</dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </div>
  );
}
