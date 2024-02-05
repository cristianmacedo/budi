export type Validator = (payload: any) => {
  success: boolean;
  error: string | null;
};
