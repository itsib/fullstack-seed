import { type FC, type PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { ApplicationContext } from '@app-context/application';
import type { Theme } from '@app-types';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { getActiveTheme } from '../../utils/theme.ts';

export const ApplicationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(localStorage.getItem('theme') as Theme || 'system');
  const [, setNeedsRefresh] = useState<boolean>(false);

  const updateTheme = useCallback((theme: Theme) => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
  }, []);

  const applyTheme = useCallback((theme: Exclude<Theme, 'system'>) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || theme !== 'system') return;

    const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    function onThemeChange({ matches }: MediaQueryListEvent) {
      applyTheme(matches ? 'dark' : 'light' as Exclude<Theme, 'system'>);
    }

    try {
      // Chrome & Firefox
      darkMediaQuery.addEventListener('change', onThemeChange);

      return () => {
        darkMediaQuery.removeEventListener('change', onThemeChange);
      };
    } catch {
      // Safari < 14
      darkMediaQuery.addListener(onThemeChange);

      return () => {
        darkMediaQuery.removeListener(onThemeChange);
      };
    }
  }, [theme]);

  useEffect(() => applyTheme(getActiveTheme(theme)), [theme]);

  useRegisterSW({
    onNeedRefresh() {
      setNeedsRefresh(true);
    },
    onRegisteredSW(_url: string, _registration?: ServiceWorkerRegistration) {
      if (!_registration) return;

      const serviceWorker = _registration.active;
      if (!serviceWorker) return;

      serviceWorker.addEventListener('message', event => {
        console.log('message', event);
      });

      serviceWorker.addEventListener('upgradeneeded', event => {
        console.log('upgradeneeded', event);
      });

      serviceWorker.addEventListener('error', event => {
        console.error('SW error', event);
      });

      serviceWorker.addEventListener('statechange', event => {
        console.log('statechange', serviceWorker.state, event);
      });
    },
    onRegisterError(error: any) {
      console.error('SW registration error', error);
    },
  });

  return (
    <ApplicationContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ApplicationContext.Provider>
  )
}