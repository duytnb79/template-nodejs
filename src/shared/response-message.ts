export enum SuccessMessages {
  CreateSuccess = 'Resource created successfully',
  GetSuccess = 'Resource retrieved successfully',
  UpdateSuccess = 'Resource updated successfully',
  DeleteSuccess = 'Resource deleted successfully',
  GenericSuccess = 'Operation completed successfully',
  UserRemoveSuccess = 'User removed!',
  ProductRemoveSuccess = 'Product removed!',
}

export enum ErrorMessages {
  AppStartupFail = 'Unable to start the app!',
  CreateFail = 'Unable to save entry to DB!',
  GetFail = 'Unable to retrieve data from DB!',
  UpdateFail = 'Unable to update data in DB!',
  DeleteFail = 'Unable to delete entry from DB!',
  DuplicateEntryFail = 'User already exists!',
  PasswordMismatchFail = 'Passwords must match!',
  Generic = 'Something went wrong!',
  NotFound = 'Unable to find the requested resource!',
  UncaughtException = 'Uncaught Exception thrown!',
  UnhandledRejection = 'Unhandled Exception thrown!',
}
