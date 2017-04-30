const isProduction = process.env.NODE_ENV === 'production';

export const SLACK_CLIENT_ID = isProduction
  ? '2327798584.76826552325'
  : '2327798584.93954971440';

export const BACKEND_URL = isProduction
  ? 'https://backend.slapsnack.com'
  : 'http://localhost:8080';

export const FRONTEND_URL = isProduction
  ? 'https://slapsnack.com'
  : 'http://localhost:3000';
