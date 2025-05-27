import { useNavigate } from '@tanstack/react-router';
import { type FC, useEffect } from 'react';

export const Redirect: FC<{ to: string, search?: string }> = ({ to, search }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to, search }).catch(console.error);
  }, [to, search]);

  return null;
};