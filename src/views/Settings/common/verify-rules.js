export default {
  USERNAME: [
    { type: 'required', message: 'username is required' },
    {
      type: 'between',
      params: { min: 6, max: 20 },
      message: "username's length is 6-20 characters",
    },
    {
      type: 'regexp',
      params: '^[A-Za-z][A-Za-z0-9_\\-.]{5,19}$',
      message: "username's format is invalid",
    },
  ],
  EMAIL: [
    { type: 'required', message: 'email is required' },
    { type: 'regexp', params: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$', message: 'email format is invalid' },
  ],
  PHONE: [
    { type: 'required', message: 'phone is required' },
    { type: 'regexp', params: '^\\+?[0-9]{6,20}$', message: 'phone format is invalid' },
  ],
  VERIFY_CODE: [{ type: 'required', message: 'verifyCode is required' }],
  PASSWORD: [
    { type: 'required', message: 'password is required' },
    { type: 'between', params: { min: 8, max: 32 }, message: "password's length is 8-32 characters" },
  ],
  PASSWORD_CONFIRM: [
    { type: 'required', message: 'confirm password is required' },
  ],
}




