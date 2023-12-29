export type ServiceMessage = { message: string };

export type ServiceResponseError = {
  status: 'INVALID_DATA' | 'NOT_FOUND' | 'UNAUTHORIZED' | 'INTERNAL_ERROR' | 'UNPROCESSABLE';
  data: ServiceMessage;
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL' | 'CREATED';
  data: T;
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
