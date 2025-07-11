import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";

// components
import { FormInput, VerticalForm, AuthLayout, PageBreadcrumb } from '../../components'

// redux
import { useSelector,useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { forgotPassword, resetAuth } from '../../redux/actions'

interface UserData {
  username: string;
}

const BottomLink = () => {
  return (
    <p className="text-gray-500 dark:text-gray-400 text-center">
      Back to
      <Link to="auth/login" className="text-primary ms-1">
        <b>Log In</b>
      </Link>
    </p>
  )
}

const RecoverPassword = () => {

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  const { loading, passwordReset, resetPasswordSuccess, error } = useSelector(
    (state: RootState) => ({
      loading: state.Auth.loading,
      user: state.Auth.user,
      error: state.Auth.error,
      passwordReset: state.Auth.passwordReset,
      resetPasswordSuccess: state.Auth.resetPasswordSuccess,
    })
  );
  /*
* form validation schema
*/
  const schemaResolver = yupResolver<any>(
    yup.object().shape({
      username: yup.string().required("Please enter email"),
    })
  );
  /*
 * handle form submission
 */
  const onSubmit = (formData: UserData) => {
    dispatch(forgotPassword(formData.username));
  };
  return (
    <>
      <PageBreadcrumb title='Recover Password' />

      <AuthLayout
        authTitle='Recover Password'
        helpText="Enter your email address and we'll send you an email with instructions to reset your password."
        bottomLinks={<BottomLink />}
      >
        {!passwordReset && <VerticalForm<UserData>
          onSubmit={onSubmit}
          resolver={schemaResolver}
        >

          <FormInput
            label='Email Address'
            type='email'
            name='username'
            placeholder='Enter your email'
            containerClass='mb-4'
            className='form-input'
            labelClassName='block text-sm font-medium text-gray-600 dark:text-gray-200 mb-2'
          />

          <div className="flex justify-center mb-6">
            <button type='submit' className="btn w-full text-white bg-primary" disabled={loading}> Reset Password </button>
          </div>
        </VerticalForm>
        }
      </AuthLayout>
    </>
  )
}

export default RecoverPassword