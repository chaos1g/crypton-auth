/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { useToast } from '@/hooks/use-toast';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from '@/components/ui/spinner';

import { registerUser } from '@/services/api';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ passwordsSuccess, setPasswordSuccess ] = useState(true);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    if (confirmPassword == password && (password || confirmPassword)) {
      setPasswordSuccess(false);
    } else {
      setPasswordSuccess(true)
    }
  }, [ password, confirmPassword ]);

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

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);

    try {
      // Используем функцию для регистрации из api.ts
      const data = await registerUser(email, password);
      console.log('Регистрация успешна:', data);
      navigate('/profile'); // Перенаправление на страницу профиля
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
        <h1 className="text-xl font-semibold text-center text-white mb-6">Регистрация</h1>
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
              placeholder="Пароль"
              className="bg-none border-white placeholder:text-beige placeholder:opacity-50"
              onChange={handlePasswordChange}
            />
          </div>
          <div className="flex-col gap-px mb-4">
            <label htmlFor="confirmPassword" className="block text-white text-start text-sm mb-2">
              Подтверждение пароля
            </label>
            <Input
              type="password"
              value={confirmPassword}
              placeholder="Подтвердите пароль"
              className="bg-none border-white placeholder:text-beige placeholder:opacity-50"
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <div className="flex justify-center gap-1 text-sm text-white text-center mb-6">
            <p>Уже есть аккаунт?</p>
            <p 
              onClick={() => navigate('/login')} 
              className="text-blue-400 underline cursor-pointer"
            >
              Войти
            </p>
          </div>
          <Button type="submit" className="w-full text-white border" disabled={loading || passwordsSuccess}>
            {loading ? <Spinner /> : 'Создать аккаунт'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
