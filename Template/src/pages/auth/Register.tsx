import { useEffect } from 'react';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';

// components
import { FormInput, VerticalForm, AuthLayout, PageBreadcrumb } from '../../components'

// redux
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { resetAuth, signupUser } from '../../redux/actions';

interface UserData {
  fullname: string;
  email: string;
  password: string;
}

/* bottom links */
const BottomLink = () => {
  return (
    <p className="text-gray-500 dark:text-gray-400 text-center">Already have account ?
      <Link to="/auth/login" className="text-primary ms-1">
        <b>Log In</b>
      </Link>
    </p>
  );
};

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector((state: RootState) => ({
    loading: state.Auth.loading,
  }));

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  /*
   * form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape({
      fullname: yup.string().required(("Please enter Fullname")),
      email: yup
        .string()
        .required("Please enter Email")
        .email("Please enter valid Email"),
      password: yup.string().required(("Please enter Password")),
    })
  );

  /*
 * handle form submission
 */
  const onSubmit = (formData: UserData) => {
    dispatch(
      signupUser(formData["fullname"], formData["email"], formData["password"])
    );
  };

  return (
    <>
      <PageBreadcrumb title='Register' />
      <AuthLayout
        authTitle='Sign Up'
        helpText="Don't have an account? Create your account, it takes less than a minute"
        bottomLinks={<BottomLink />}
        hasThirdPartyLogin
      >
        <VerticalForm<UserData>
          onSubmit={onSubmit}
          resolver={schemaResolver}
        >

          <FormInput
            label='Full Name'
            type='text'
            name='fullname'
            placeholder='Enter Full Name'
            containerClass='mb-4'
            className='form-input'
            labelClassName='block text-sm font-medium text-gray-600 dark:text-gray-200 mb-2'
            required
          />

          <FormInput
            label='Email Address'
            type='email'
            name='email'
            placeholder='Enter your Email'
            containerClass='mb-4'
            className='form-input'
            labelClassName='block text-sm font-medium text-gray-600 dark:text-gray-200 mb-2'
            required
          />

          <FormInput
            label='password'
            type='password'
            name='password'
            placeholder='Enter your password'
            containerClass='mb-4'
            className='form-input'
            labelClassName='block text-sm font-medium text-gray-600 dark:text-gray-200 mb-2'
            required
          />

          <div className="mb-4">
            <FormInput
              label='I accept'
              type='checkbox'
              name='checkbox'
              containerClass='flex items-center'
              labelClassName='ms-2 text-slate-900 dark:text-slate-200'
              className='form-checkbox rounded'
              otherComp={<a href="" target='_blank' className="text-gray-400 underline">Terms and Conditions</a>}
            />
          </div>

          <div className="flex justify-center mb-6">
            <button type='submit' className="btn w-full text-white bg-primary" disabled={loading}> Register </button>
          </div>

        </VerticalForm>
      </AuthLayout>
    </>
  )
}

export default Register