import { message } from 'antd';

export const successMessage = (msg, duration = 2) =>
  message.success({ content: msg, duration });

export const warningMessage = (msg, duration = 2) =>
  message.warning({ content: msg, duration });

export const loadingMessage = (msg, duration = 2) =>
  message.loading({ content: msg, duration });

export const errorMessage = (msg, duration = 2) =>
  message.error({ content: msg, duration });
