import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { APICore, setAuthorization } from '../helpers/api/apiCore';
import { login as loginApi, logout as logoutApi, signup as signupApi, forgotPassword as forgotPasswordApi } from '../helpers/api/auth';

const api = new APICore();

const AUTH_INITIAL_STATE = {
  user: null,
  loading: false,
};

type AuthState = {
  user?: any;
  loading?: boolean;
  userLoggedIn?: boolean;
  userSignUp?: boolean;
  passwordReset?: boolean;
  passwordChange?: boolean;
  resetPasswordSuccess?: any;
  error?: any;
  registerError?: any;
  userLogout?: boolean;
};

type AuthAction = {
  type: 'API_RESPONSE_SUCCESS' | 'API_RESPONSE_ERROR' | 'LOGIN_USER' | 'LOGOUT_USER' | 'SIGNUP_USER' | 'FORGOT_PASSWORD' | 'RESET';
  payload: any;
};

const AuthContext = createContext<AuthState | any>(null);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'API_RESPONSE_SUCCESS':
      switch (action.payload.actionType) {
        case 'LOGIN_USER': {
          return {
            ...state,
            user: action.payload.data,
            userLoggedIn: true,
            loading: false,
          };
        }
        case 'SIGNUP_USER': {
          return {
            ...state,
            loading: false,
            userSignUp: true,
          };
        }
        case 'LOGOUT_USER': {
          return {
            ...state,
            user: null,
            loading: false,
            userLogout: true,
          };
        }
        case 'FORGOT_PASSWORD': {
          return {
            ...state,
            resetPasswordSuccess: action.payload.data,
            loading: false,
            passwordReset: true,
          };
        }
        default:
          return { ...state };
      }

    case 'API_RESPONSE_ERROR':
      switch (action.payload.actionType) {
        case 'LOGIN_USER': {
          return {
            ...state,
            error: action.payload.error,
            userLoggedIn: false,
            loading: false,
          };
        }
        case 'SIGNUP_USER': {
          return {
            ...state,
            registerError: action.payload.error,
            userSignUp: false,
            loading: false,
          };
        }
        case 'FORGOT_PASSWORD': {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            passwordReset: false,
          };
        }
        default:
          return { ...state };
      }

    case 'LOGIN_USER':
      return { ...state, loading: true, userLoggedIn: false };
    case 'LOGOUT_USER':
      return { ...state, loading: true, userLogout: false };
    case 'RESET':
      return {
        ...state,
        loading: false,
        error: false,
        userSignUp: false,
        userLoggedIn: false,
        passwordReset: false,
        passwordChange: false,
        resetPasswordSuccess: null,
      };
    default:
      return { ...state };
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  // Check for existing session on client-side mount
  useEffect(() => {
    const user = api.getLoggedInUser();
    if (user) {
      const { token } = user;
      if (token) {
        setAuthorization(token);
        dispatch({ type: 'API_RESPONSE_SUCCESS', payload: { actionType: 'LOGIN_USER', data: user } });
      }
    }
  }, []);

  const login = async (username: string, password: string) => {
    dispatch({ type: 'LOGIN_USER', payload: {} });
    try {
      const response = await loginApi({ username, password });
      const user = response.data;
      api.setLoggedInUser(user);
      setAuthorization(user.token);
      dispatch({ type: 'API_RESPONSE_SUCCESS', payload: { actionType: 'LOGIN_USER', data: user } });
    } catch (error: any) {
      dispatch({ type: 'API_RESPONSE_ERROR', payload: { actionType: 'LOGIN_USER', error } });
      api.setLoggedInUser(null);
      setAuthorization(null);
    }
  };

  const logout = async () => {
    dispatch({ type: 'LOGOUT_USER', payload: {} });
    try {
      await logoutApi();
      api.setLoggedInUser(null);
      setAuthorization(null);
      dispatch({ type: 'API_RESPONSE_SUCCESS', payload: { actionType: 'LOGOUT_USER', data: {} } });
    } catch (error: any) {
      dispatch({ type: 'API_RESPONSE_ERROR', payload: { actionType: 'LOGOUT_USER', error } });
    }
  };

  const signup = async (fullname: string, email: string, password: string) => {
    dispatch({ type: 'SIGNUP_USER', payload: {} });
    try {
      const response = await signupApi({ fullname, email, password });
      const user = response.data;
      dispatch({ type: 'API_RESPONSE_SUCCESS', payload: { actionType: 'SIGNUP_USER', data: user } });
    } catch (error: any)      {
      dispatch({ type: 'API_RESPONSE_ERROR', payload: { actionType: 'SIGNUP_USER', error } });
      api.setLoggedInUser(null);
      setAuthorization(null);
    }
  };

  const forgotPassword = async (username: string) => {
    dispatch({ type: 'FORGOT_PASSWORD', payload: {} });
    try {
      const response = await forgotPasswordApi({ username });
      dispatch({ type: 'API_RESPONSE_SUCCESS', payload: { actionType: 'FORGOT_PASSWORD', data: response.data } });
    } catch (error: any) {
      dispatch({ type: 'API_RESPONSE_ERROR', payload: { actionType: 'FORGOT_PASSWORD', error } });
    }
  };

  const resetAuth = () => {
    dispatch({ type: 'RESET', payload: {} });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, signup, forgotPassword, resetAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};