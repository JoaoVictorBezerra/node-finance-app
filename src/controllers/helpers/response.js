export const response = {
  success: (body) => {
    return {
      statusCode: 200,
      body: body,
    };
  },
  badRequest: (body) => {
    return {
      statusCode: 400,
      body: body,
    };
  },
  created: (body) => {
    return {
      statusCode: 201,
      body: body,
    };
  },
  error: (body) => {
    return {
      statusCode: 500,
      body: body,
    };
  },
  conflict: (body) => {
    return {
      statusCode: 409,
      body: body,
    };
  },
};
