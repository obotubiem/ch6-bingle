module.exports = {
  success: (data) => {
    let res_data = {
      status: "ok",
      message: "success",
      success: true,
    };

    if (typeof data !== "undefined") {
      res_data.data = data;
    }

    return res_data;
  },

  failed: (message, data) => {
    let res_data = {
      status: "failed",
      message: message,
      success: false,
    };

    if (typeof data !== "undefined") {
      res_data.data = data;
    }

    return res_data;
  },

  server_error: () => {
    let res_data = {
      status: "failed",
      message: "internal server error",
      success: false,
    };

    return res_data;
  },
};
