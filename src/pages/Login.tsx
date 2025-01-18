/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useToast } from '@/hooks/use-toast';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from '@/components/ui/spinner';

import { loginUser } from '@/services/api';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast()
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      navigate('/profile');
    }
  }, [ navigate ]);
  
  // Обработчик изменения для email
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
  };
  
  // Обработчик изменения для пароля
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
  };
  
  // Отправка данных логина
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);

    try {
      await loginUser(email, password);
      navigate('/profile');
    } catch (err: any) {
        toast({
          className: 'bg-errorAlert text-white border-errorAlert',
          title: 'Ошибка',
          description: err.message
        })
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-beige">
      <motion.div
        className="bg-dark rounded-lg p-8 shadow-md w-96"
        key="register"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-xl font-semibold text-center text-white mb-6">Войти</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex-col gap-px mb-4">
            <label htmlFor="email" className="block text-white text-start text-sm mb-2">
              Электронная почта
            </label>
            <Input
              type="email"
              value={email}
              placeholder="Почта"
              className="bg-none border-white placeholder:text-beige placeholder:opacity-50"
              onChange={handleEmailChange}
            />
          </div>
          <div className="flex-col gap-px mb-4">
            <label htmlFor="password" className="block text-white text-start text-sm mb-2">
              Пароль
            </label>
            <Input
              type="password"
              value={password}
              id="password"
              placeholder="Пароль"
              className="bg-none border-white placeholder:text-beige placeholder:opacity-50"
              onChange={handlePasswordChange}
            />
          </div>
          <div className="flex justify-center gap-1 text-sm text-white mb-6 text-center">
            <p>Нет аккаунта?</p>
            <p
              onClick={() => navigate('/register')}
              className="text-blue-400 underline cursor-pointer"
            >
              Зарегестрироваться
            </p>
          </div>
          <Button type="submit" className="w-full text-white border" disabled={loading}>
            {loading ? <Spinner /> : 'Войти'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;