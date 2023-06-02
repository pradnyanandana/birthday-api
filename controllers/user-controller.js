const store = async (req, res, next) => {
  try {
    res.json({
      success: true,
      message: "Success add user",
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

const profile = async (req, res, next) => {
  try {
    const id = req.params.id;

    res.json({
      success: true,
      message: "Success retrieve user profile",
      data: { id },
    });
  } catch (error) {
    next(error);
  }
};

const list = async (req, res, next) => {
  try {
    res.json({
      success: true,
      message: "Success retrieve all users",
      data: [],
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;

    res.json({
      success: true,
      message: "Success update user profile",
      data: { id },
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.id;

    res.json({
      success: true,
      message: "Success remove user",
      data: { id },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  store,
  profile,
  list,
  update,
  remove,
};
