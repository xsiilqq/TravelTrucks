'use client';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BookingFormData } from '@/types/booking';
import styles from './BookingForm.module.css';

export default function BookingForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>();

  const onSubmit = () => {
    reset({
      name: '',
      email: '',
      bookingDate: '',
      comment: '',
    });
    toast.success('Booking was successful!');
  };

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Book your campervan now</h2>
      <p className={styles.text}>
        Stay connected! We are always ready to help you.
      </p>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder="Name*"
            className={styles.input}
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email*"
            className={styles.input}
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          className={styles.button}
        >
          Send
        </button>
      </form>
    </section>
  );
}
