import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyIcon, MailIcon } from 'lucide-react';

import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';

import { IUser } from '@/types/userData';
import { getUserInfo } from '@/services/api';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ userInfo, setUserInfo ] = useState<IUser | null>(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState<string>();
  const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate('/login');
    }
  }, [ isLoggedIn, navigate ]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUserInfo(data);
      } catch (err: unknown) {
        setError(err as string);
        toast({
          className: 'bg-errorAlert text-white border-errorAlert',
          title: 'Ошибка',
          description: 'Ошибка загрузки. Попробуйте обновить страницу'
        })
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [ toast ]);

  const handleLogout = () => {
    localStorage.removeItem("token");

    setIsLoggedIn(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-beige">
      <div className="bg-dark rounded-lg p-8 shadow-md w-auto">
        <h1 className="text-xl font-semibold text-center text-white mb-6">Профиль</h1>
        <div className='flex flex-col gap-4'>
          {loading || error ? <Skeleton className="w-[330px] h-[30px] bg-skeleton" /> : (
            <div className='flex flex-col gap-2 border rounded p-4'>
              <div className='flex gap-2'>
                <MailIcon className='text-white' />
                <p className="text-white">Ваш Email</p>
              </div>
              <p className='text-white'>{userInfo && userInfo.email}</p>
            </div>
          )}
          {loading || error ? <Skeleton className="w-[330px] h-[30px] bg-skeleton" /> : (
            <div className='flex flex-col gap-2 border rounded p-4'>
              <div className='flex gap-2'>
                <KeyIcon className='text-white' />
                <p className="text-white">Ваш ID</p>
              </div>
              <p className='text-white'>{userInfo && userInfo.id}</p>
            </div>
          )}
          {!loading && !error &&
            <Button onClick={handleLogout} className="w-max self-center text-white border">
              {!isLoggedIn ? <Spinner /> : 'Выйти'}
            </Button>
          }
        </div>
      </div>
    </div>
  );
};

export default Profile;