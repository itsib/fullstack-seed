import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Input } from 'react-just-ui';
import { useForm } from 'react-hook-form';

export const Route = createFileRoute('/auth/login/')({
  component: RouteComponent,
});

interface FormFields {
  login: string,
  password: string,
}

function RouteComponent() {
  const { t } = useTranslation();
  const { register, formState } = useForm<FormFields>({
    defaultValues: {
      login: '',
      password: '',
    },
  });
  const { errors } = formState;

  return (
    <div className="container mx-auto flex justify-center items-center h-[80vh]">
      <div className="p-4 mx-auto border border-gray-200/15 rounded-lg bg-(--bg-card)">
        <h2>{t('authorization')}</h2>

        <Input
          id="login-field"
          autoFocus
          label={t('login')}
          error={errors.login}
          {...register('login', {
            required: t('error_required'),
          })}
        ></Input>

        <Input
          id="password-field"
          label={t('password')}
          error={errors.password}
          {...register('password', {
            required: t('error_required'),
          })}
        ></Input>
      </div>
    </div>
  );
}
