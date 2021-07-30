module.exports = {
  unknown: { status: 500, message: "!Unknown error", error: true },
  server: { status: 500, message: "!Server error", error: true },
  save: { status: 304, message: "!Error: while saving", error: true },
  duplicate: {
    status: 409,
    message: "!ConflictError: this record already exists",
    error: true,
  },
  unauthorized: {
    status: 401,
    message: "!Insufficient Permissions: access restricted.",
    error: true,
  },
  notfound: {
    status: 404,
    message: "!Error: cannot find requested record(s)",
    error: true,
  },
  notmodified: {
    status: 304,
    message: "!Error could not complete operation",
    error: true,
  },
  badrequest: {
    status: 400,
    message: "!Error could not process request",
    error: true,
  },
};
