import * as OTPAuth from 'otpauth';

export const getTotp = (secret: string) => {
  const totp = new OTPAuth.TOTP({
    secret,
    digits: 6,
    period: 30,
  })
  return totp.generate();
}

export const getExpireTime = () => {
  const now = Math.floor(Date.now() / 1000);
  return 30 - now % 30;
}