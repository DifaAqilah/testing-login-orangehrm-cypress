export const loginData = {
  url: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',

  valid: {
    username: 'Admin',
    password: 'admin123',
  },

  invalid: {
    username: 'Adminn',
    password: '123',
  },

  message: {
    invalidCredentials: 'Invalid credentials',
    required: 'Required',
    resetPassword: 'Reset Password',
  },

  urlPart: {
    dashboard: '/dashboard/index',
    login: '/auth/login',
    resetPassword: '/requestPasswordResetCode',
  },
}