export type AppState = {
  register: boolean;
  verified: null | any;
  passwordResetEmail: null | any;
  newPassword: null | any;
  newConfirmPassword: null | any;
  indexSelected: boolean;
  currentUserUuid: string | null | undefined;
  enabledUser: boolean | null | undefined;
};

export type LocalStorageData = {
  sessionUuid?: string | undefined | null;
  enabled?: string | undefined | null ;
}