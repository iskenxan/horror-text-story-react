export const getErrorResponse = (error) => {
  return error.response && error.response.data.error
    ? error.response.data.error.message : 'Connection error'
};