declare namespace NodeJS {
  export interface ProcessEnv {
    PORT?: string;
    ACCESS_TOKEN?: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_DEFAULT_REGION: string;
    VERIFIED_EMAIL_ADDRESS: string;
  }
}