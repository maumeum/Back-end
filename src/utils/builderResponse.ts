type BuildResponse<E, T> = (
  error: E,
  data: T
) => {
  error: E | null;
  data: T;
};

const buildResponse: BuildResponse<any, any> = (error, data) => {
  return {
    error: error ?? null,
    data: data,
  };
};

export { buildResponse };
