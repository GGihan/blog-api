import styles from './Register.module.css';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router';
import { apiClient } from '@/config/api';
import Button from '../Button/Button';
import arrowLeft from '@/assets/images/arrow-left.svg';

export default function Register() {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({
    reValidateMode: 'onSubmit',
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const data = await apiClient('/auth/register', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      // Automatically login user on register
      login(data.user, data.token);
      navigate('/', { replace: true });
    } catch (error) {
      if (error.name === 'ApiError' && error.status === 400) {
        // Get key-value dictionary from error helper
        const fieldErrors = error.unwrapFieldErrors(); 
        // Pass them to React Hook Form
        Object.keys(fieldErrors).forEach((field) => {
          setError(field, { type: 'server', message: fieldErrors[field] });
        });
        return;
      }

      if (error.name === 'ApiError') {
        setError('root', {
          type: 'server',
          message: error.message,
        });
        return;
      };
    }
  };

  // Track individual errors so the errors get shown in the error container
  const activeErrorMessages = [
    errors.username?.message,
    errors.password?.message,
    errors.passwordConfirm?.message,
    errors.root?.message,
  ].filter(Boolean);

  return (
    <div className={styles.fullDisplay}>
      <div className={styles.desktopDisplay}>
        <h1 className={styles.sideTitle}>Create account</h1>
        <p className={styles.sideText}>Join the Engrave community!</p>
      </div>

      <div className={styles.mobileDisplay}>
        <div className={`${styles.registerContainer} flex-column`}>
          <h1 className={styles.registerTitle}>Register</h1>
          {activeErrorMessages.length > 0 && (
            <div className={styles.errorContainer}>
              <ul className={`${styles.errorList} flex-column`}>
                {activeErrorMessages.map((message, index) => (
                  <li key={index} className={`${styles.errorItem} error-message`}>
                    {message}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className={`${styles.registerForm} flex-column`}>
            <div className={styles.formGroup}>
              <label htmlFor="username">Username</label>
              <input
                id='username'
                type='text'
                {...register('username')}
                placeholder="Username"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                id='password'
                type='password'
                {...register('password')}
                placeholder="Choose password"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="passwordConfirm">Confirm password</label>
              <input
                id='passwordConfirm'
                type='password'
                {...register('passwordConfirm')}
                placeholder="Confirm password"
              /> 
            </div>

            <div className={`${styles.buttonContainer} flex-row`}>
              <Button
                className={styles.returnButton}
                onClick={() => navigate('/', { replace: true })}
              >
                <img
                  className={styles.returnImage}
                  src={arrowLeft}
                  alt=""
                  width='24'
                  height='24'
                />
                Return
              </Button>
              <Button className={styles.registerButton} type='submit' disabled={isSubmitting}>
                Register
              </Button>
            </div>
          </form>
          <hr></hr>
        </div>
      </div>
    </div>
  );
};