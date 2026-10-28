export const loginData = {
  url: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',

  valid: {
    username: 'Admin',
    password: 'admin123',
  },

  invalid: {
    username: 'Adminn',
    password: '123',
    passwordKapital: 'ADMIN123',
    usernameKecil: 'admin',
    sqlInjection: "' OR '1'='1",
    passwordAcak: 'x',
  },

  message: {
    invalidCredentials: 'Invalid credentials',
    required: 'Required',
    resetPassword: 'Reset Password',
  },
}