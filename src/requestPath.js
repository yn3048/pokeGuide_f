import { RootUrl } from "./api/RootUrl";


/* 회원 */
export const MAIN_PATH = RootUrl + '/main';
export const USER_PATH = RootUrl + '/user/register';
export const LOGIN_PATH = RootUrl + '/user/login';
export const TERMS_PATH = RootUrl + '/user/terms';

export const FINDID_PATH = RootUrl + '/user/uid';
export const CHANGEPASS_PATH = RootUrl + '/user/new-pass';
export const CHECKPASS_PATH = RootUrl + '/user/verify/pass';

export const UPDATE_USER_PATH = RootUrl + '/user/info';

export const CHECK_EMAIL_CODE_PATH = RootUrl + '/user/verify/email-code';
export const SEND_EMAIL_CODE_PATH = RootUrl + '/user/email-code';
export const SEND_FINDID_EMAIL_CODE_PATH = RootUrl + '/user/email-code-id';
