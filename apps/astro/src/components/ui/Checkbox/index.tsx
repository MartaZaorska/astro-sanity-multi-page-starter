import type { FieldErrors } from 'react-hook-form';
import Error from '@/components/ui/Error';
import styles from './Checkbox.module.scss';

type Props = {
  register: {
    name: string;
  };
  children: React.ReactNode;
  errors: FieldErrors;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

export default function Checkbox({ children, register, errors, ...props }: Props) {
  return (
    <label
      className={styles.Checkbox}
      {...props}
    >
      <div className={styles.control}>
        <div className={styles.box}>
          <input
            type='checkbox'
            {...register}
            aria-invalid={!!errors[register.name]}
          />
          <CheckIcon />
        </div>
        <p className={styles.label}>{children}</p>
      </div>
      <Error error={errors[register.name]?.message?.toString()} />
    </label>
  );
}

const CheckIcon = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={11}
    height={9}
    viewBox='0 0 11 9'
    fill='none'
    {...props}
  >
    <path
      stroke='#121212'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='m1 5.418 2.571 2.946L10 1'
    />
  </svg>
);
