import { createContext } from 'react';
import type { Theme } from '@app-types';
import { getActiveTheme } from '../../utils/theme.ts';

export interface IApplicationContext {
  theme: Theme;
  updateTheme: (theme: Theme) => void;
}

export const ApplicationContext = createContext<IApplicationContext>({
  theme: getActiveTheme(localStorage.getItem('theme') as Theme || 'system'),
  updateTheme: () => {throw new Error('not implemented')},
})