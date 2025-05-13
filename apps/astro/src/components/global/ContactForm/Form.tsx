import { useState, useEffect } from 'preact/hooks';
import { useForm, type FieldValues } from 'react-hook-form';
import Input from '@/components/ui/Input';
import Checkbox from '@/components/ui/Checkbox';
import { REGEX } from '@/global/constants';

export default function Form({
  children,
  ...props
}: { children: React.ReactNode } & React.FormHTMLAttributes<HTMLFormElement>) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  useEffect(() => {
    const tryAgain = () => setStatus('idle');
    document.addEventListener('Contact-TryAgain', tryAgain);
    return () => document.removeEventListener('Contact-TryAgain', tryAgain);
  }, []);

  const onSubmit = async (data: FieldValues) => {
    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (!response.ok || !responseData.success) throw new Error();
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <form
      {...props}
      onSubmit={handleSubmit(onSubmit)}
      data-status={status}
    >
      <Input
        label='E-mail'
        register={register('email', {
          required: { value: true, message: 'Email jest wymagany' },
          pattern: { value: REGEX.email, message: 'Niepoprawny adres e-mail' },
        })}
        errors={errors}
        type='email'
      />
      <Input
        label='Temat rozmowy'
        register={register('message', {
          required: { value: true, message: 'Temat jest wymagany' },
        })}
        isTextarea={true}
        errors={errors}
        placeholder='O czym porozmawiamy?'
      />
      <Checkbox
        register={register('legal', {
          required: { value: true, message: 'Zgoda jest wymagana' },
        })}
        errors={errors}
      >
        Akceptuję{' '}
        <a
          href='/polityka-prywatnosci'
          target='_blank'
          rel='noopener noreferrer'
          className='link'
        >
          politykę prywatności
        </a>
      </Checkbox>
      {children}
    </form>
  );
}
