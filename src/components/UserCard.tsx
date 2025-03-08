import React from 'react';
import Image from 'next/image';
import { User } from '@/types/user';

export interface UserCardProps {
  user: User;
  isMobile: boolean;
  onClick: (user: User) => void;
}

const UserCard = ({ user, isMobile, onClick }: UserCardProps) => {
  if (isMobile) {
    return (
      <div
        className="py-6 px-4 bg-white border-b border-gray-200 flex items-center cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => onClick(user)}
      >
        <div className="relative w-24 h-24 mr-6 flex-shrink-0">
          <Image
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {user.first_name} {user.last_name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{user.email}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all 
        cursor-pointer flex flex-col items-center"
      onClick={() => onClick(user)}
    >
      <div className="relative w-24 h-24 mb-4">
        <Image
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          fill
          className="rounded-full object-cover"
        />
      </div>
      <h3 className="text-lg font-medium text-gray-900 text-center">
        {user.first_name} {user.last_name}
      </h3>
      <p className="text-sm text-gray-500 mt-1">{user.email}</p>
    </div>
  );
};

export default UserCard;
