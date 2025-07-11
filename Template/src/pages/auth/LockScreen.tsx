import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

// components
import { FormInput, VerticalForm, AuthLayout, PageBreadcrumb } from '../../components';

// images
import avatar1 from '../../assets/images/users/avatar-1.jpg'

interface UserData {
  password: string;
}

/* bottom links */
const BottomLink = () => {
  return (
    <p className="text-gray-500 dark:text-gray-400 text-center">
      Not you ? return
      <Link to="auth/login" className="text-primary ms-1">
        <b>Log In</b>
      </Link>
    </p>
  );
};

const LockScreen = () => {

  /*
   * form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape({
      password: yup.string().required("Please enter Password"),
    })
  );

  /*
   * handle form submission
   */
  const onSubmit = (formData: UserData) => {
    console.log(formData.password);
  };


  return (
    <>
      <PageBreadcrumb title='Lock Screen' />
      <AuthLayout
        authTitle='Lock Screen'
        helpText='Enter your password to access the admin.'
        bottomLinks={<BottomLink />}
        userImage={avatar1}
      >
        <VerticalForm<UserData>
          onSubmit={onSubmit}
          resolver={schemaResolver}>

          <FormInput
            label='Password'
            type='password'
            name='password'
            placeholder='Enter your password'
            containerClass='mb-4'
            className='form-input'
            labelClassName='block text-sm font-medium text-gray-600 dark:text-gray-200 mb-2'
          />

          <div className="flex justify-center mb-6">
            <button type='submit' className="btn w-full text-white bg-primary"> Log In </button>
          </div>
        </VerticalForm>
      </AuthLayout>
    </>
  )
}

export default LockScreen