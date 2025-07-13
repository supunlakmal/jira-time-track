import { useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';

// form validation
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import { VerticalForm, FormInput, AuthLayout, PageBreadcrumb } from "../../components";
import { useAuth } from "../../context/AuthContext";

interface UserData {
  username: string;
  password: string;
}

/* bottom links */
const BottomLink = () => {
  return (
    <p className="text-gray-500 dark:text-gray-400 text-center">Don't have an account ?
      <Link href="/auth/register" className="text-primary ms-1">
        <b>
          Register
        </b>
      </Link>
    </p>
  );
};

const Login = () => {
  const { user, userLoggedIn, loading, login, resetAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    resetAuth();
  }, []);

  useEffect(() => {
    const redirectUrl = (router.query.from as string) || "/";
    if (userLoggedIn || user) {
      router.push(redirectUrl);
    }
  }, [userLoggedIn, user, router]);

  /*
  form validation schema
  */
  const schemaResolver = yupResolver(
    yup.object().shape({
      username: yup.string().required("Please enter Username"),
      password: yup.string().required("Please enter Password"),
    })
  );

  /*
  handle form submission
  */
  const onSubmit = (formData: UserData) => {
    login(formData["username"], formData["password"]);
  };

  return (
    <>
      <PageBreadcrumb title="Login" />
      <AuthLayout
        authTitle="Sign In"
        helpText="Enter your email address and password to access admin panel."
        bottomLinks={<BottomLink />}
        hasThirdPartyLogin
      >
        <VerticalForm<UserData>
          onSubmit={onSubmit}
          resolver={schemaResolver}
          defaultValues={{ username: "konrix@coderthemes.com", password: "konrix" }}
        >
          <FormInput
            label="Email Address"
            type="text"
            name="username"
            placeholder="Enter your email"
            containerClass="mb-4"
            className="form-input"
            labelClassName="block text-sm font-medium text-gray-600 dark:text-gray-200 mb-2"
            required
          />

          <FormInput
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            containerClass="mb-4"
            className="form-input"
            labelClassName="block text-sm font-medium text-gray-600 dark:text-gray-200 mb-2"
            required
          />

          <div className="flex items-center justify-between mb-4">
            <FormInput
              label="Remember me"
              type="checkbox"
              name="checkbox"
              containerClass="flex items-center"
              labelClassName="ms-2"
              className="form-checkbox rounded"
            />
            <Link href="/auth/recover-password" className="text-sm text-primary border-b border-dashed border-primary">Forget Password ?</Link>
          </div>

          <div className="flex justify-center mb-6">
            <button
              className="btn w-full text-white bg-primary"
              type="submit"
              disabled={loading}
            >
              Log In
            </button>
          </div>
        </VerticalForm>
      </AuthLayout>
    </>
  )
}

export default Login
