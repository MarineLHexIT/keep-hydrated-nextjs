'use server';

import { RegisterFormValues, registerSchema } from '@/lib/validations/auth';
import { LoginFormValues, loginSchema } from '@/lib/validations/auth';
import { signIn } from '@/lib/auth/auth';

export type RegisterState = {
  error?: string | null
  success?: boolean
}

export async function registerUser(
  prevState: RegisterState,
  formData: RegisterFormValues
): Promise<RegisterState> {
  // Validate the form data
  const validatedFields = registerSchema.safeParse(formData);
  
  if (!validatedFields.success) {
    return {
      error: 'Invalid form data',
      success: false
    };
  }

  try {
    const response = await fetch(`${process.env.API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedFields.data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {
        error: responseData.message || 'Registration failed',
        success: false
      };
    }

    return {
      error: null,
      success: true
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Something went wrong',
      success: false
    };
  }
}

export type LoginState = | {
  errors?: {
    email?:string[],
    password?:string[],
    root?:string[]
  },
  message?:string,
  success?: boolean
}

export async function loginUser(
  prevState: LoginState,
  formData: LoginFormValues
): Promise<LoginState> {
  // Validate the form data
  const validatedFields = loginSchema.safeParse(formData);
  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/dashboard'
    });

    if (result?.error) {
      return { 
        errors: { root: ['Invalid email or password'] }, 
        success: false 
      };
    }

    return {
      success: true
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      errors: { root: ['Something went wrong'] },
      success: false
    };
  }
} 