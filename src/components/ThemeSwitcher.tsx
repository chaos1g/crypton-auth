import React from 'react';

import { useTheme } from '@/hooks/useTheme';
import { Switch } from "@/components/ui/switch"

/** НЕ ДОДЕЛАН */
const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Switch 
        checked={theme === 'dark'} 
        onCheckedChange={toggleTheme} 
        className="bg-gray-300 dark:bg-gray-800"
      />
      <span className="text-sm">
        {theme === 'light' ? 'Светлая тема' : 'Тёмная тема'}
      </span>
    </div>
  );
};

export default ThemeSwitcher;
