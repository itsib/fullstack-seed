import type { FC } from 'react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Header: FC = () => {
  const { t } = useTranslation();

  return (
    <header className="w-full border-b border-b-(--divider) fixed">
      <div className="container h-(--header-height) mx-auto px-3 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/logo.svg" alt="Logo" className="h-[calc(var(--header-height)-20px)] w-auto" />

          <div className="ml-4 font-brand text-xl whitespace-nowrap">Full-Stack Seed App</div>
        </div>

        <menu className="flex gap-4">
          <Link
            to="/"
            activeProps={{ className: `border-b-2 border-b-(--text-primary)` }}
            className="text-(--text-primary) font-bold text-lg px-1.5"
          >
            {t('home')}
          </Link>

          <Link
            to="/about"
            activeProps={{ className: `border-b-2 border-b-(--text-primary)` }}
            className="text-(--text-primary) font-bold text-lg px-1.5"
          >
            {t('about')}
          </Link>
        </menu>
      </div>
    </header>
  )
};