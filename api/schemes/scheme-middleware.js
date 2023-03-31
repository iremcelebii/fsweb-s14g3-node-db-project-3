const schemeModel = require("./scheme-model");

const checkSchemeId = async (req, res, next) => {
  try {
    let obj = await schemeModel.findById(req.params.scheme_id);
    if (!obj) {
      res.status(404).json({
        message: `scheme_id ${req.params.scheme_id} id li şema bulunamadı`,
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const validateScheme = async (req, res, next) => {
  const name = req.body.scheme_name;
  if (!name || typeof name !== "string") {
    res.status(400).json({
      message: "Geçersiz scheme_name",
    });
  } else {
    next();
  }
};

const checkSchemeName = async (req, res, next) => {
  try {
    let name = req.body.scheme_name;
    if (name) {
      res.status(404).json({
        message: "bu şema ismi mevcut",
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const validateStep = (req, res, next) => {
  const instruction = req.body.instructions;
  const number = req.body.step_number;
  if (
    !instruction ||
    typeof instruction !== "string" ||
    !number ||
    number < 1 ||
    typeof number !== "number"
  ) {
    res.status(400).json({
      message: "Hatalı step",
    });
  } else {
    next();
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
  checkSchemeName,
};
