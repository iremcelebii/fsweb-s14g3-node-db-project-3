const db = require("../../data/db-config");

function find() {
  /*
      SELECT
          schemes.*,
          count(steps.step_id) as number_of_steps
      FROM schemes
      LEFT JOIN steps
          ON schemes.scheme_id= steps.scheme_id
      GROUP BY schemes.scheme_id
      ORDER BY schemes.scheme_id ASC;
  */
  return db
    .select("schemes.*")
    .count("steps.step_id as number_of_steps")
    .from("schemes")
    .leftJoin("steps", "schemes.scheme_id", "steps.scheme_id")
    .groupBy("schemes.scheme_id")
    .orderBy("schemes.scheme_id", "asc");
}
//!----------------------------------------------------------------------------------------------------

// SELECT
// scheme_name
// FROM schemes
// WHERE scheme_name="Revenge"
async function findByName(name) {
  const isim = await db
    .select("scheme_name")
    .from("schemes")
    .where("scheme_name", name);
  return isim[0];
}

async function findById(scheme_id) {
  /*
      SELECT
       schemes.scheme_id,
        schemes.scheme_name,
        steps.step_id,
        steps.step_number,
        steps.instructions
      FROM schemes
      LEFT JOIN steps
        ON schemes.scheme_id = steps.scheme_id
      WHERE schemes.scheme_id = 1
      ORDER BY steps.step_number ASC;
  */
  const temeltablo = await db
    .leftJoin("steps", "schemes.scheme_id ", "steps.scheme_id")
    .select("schemes.scheme_id", "schemes.scheme_name")
    .select("steps.*")
    .from("schemes")
    .where("schemes.scheme_id", scheme_id)
    .orderBy("steps.step_number", "asc");

  if (temeltablo.length === 0) {
    return null;
  }

  const response = {
    scheme_id: parseInt(scheme_id),
    scheme_name: temeltablo[0].scheme_name,
    steps: [],
  };

  if (!temeltablo[0].step_id) {
    return response;
  } else {
    temeltablo.forEach((obj) => {
      response.steps.push({
        step_id: obj.step_id,
        step_number: obj.step_number,
        instructions: obj.instructions,
      });
    });
    return response;
  }
}

//!----------------------------------------------------------------------------------------------------

async function findSteps(scheme_id) {
  /*
     
    SELECT
        steps.step_id,
        steps.step_number,
        steps.instructions,
        schemes.scheme_name
      FROM schemes
      LEFT JOIN steps
        ON schemes.scheme_id = steps.scheme_id
      WHERE schemes.scheme_id = 2
      ORDER BY steps.step_number ASC;
  */
  const tablo = await db
    .select(
      "steps.step_id",
      "steps.step_number",
      "steps.instructions",
      "schemes.scheme_name"
    )
    .from("schemes")
    .leftJoin("steps", "schemes.scheme_id", "steps.scheme_id")
    .where("schemes.scheme_id", scheme_id)
    .orderBy("steps.step_number", "asc");

  if (!tablo[0].step_id) {
    return [];
  } else {
    return tablo;
  }
}
//!----------------------------------------------------------------------------------------------------

async function add(scheme) {
  /*
      SELECT
        scheme_id,
        scheme_name
      FROM schemes
      WHERE scheme_id = 1

[POST] /api/schemes { "scheme_name": "Take Ovah" }
  response:
  {
    "scheme_id": 8,
    "scheme_name": "Take Ovah"
  }
  */
  await db("schemes").insert(scheme);

  const response = await db
    .select("scheme_id", "scheme_name")
    .from("schemes")
    .where("scheme_name", scheme.scheme_name);

  return await response[0];
}
//!----------------------------------------------------------------------------------------------------

async function addStep(scheme_id, step) {
  /*
[POST] /api/schemes/5/steps { "instructions": "and yet more questing", "step_number": 2 }
  response:
  [
    {
      "step_id": 12,
      "step_number": 1,
      "instructions": "quest and quest some more",
      "scheme_name": "Find the Holy Grail"
    },
    {
      "step_id": 17,
      "step_number": 2,
      "instructions": "and yet more questing",
      "scheme_name": "Find the Holy Grail"
    }
  ]
  */
  await db("steps").insert({
    step_number: step.step_number,
    instructions: step.instructions,
    scheme_id: scheme_id,
  });
  // const response = await db
  //   .select(
  //     "steps.step_id",
  //     "steps.step_number",
  //     "steps.instructions",
  //     "schemes.scheme_name"
  //   )
  //   .from("schemes")
  //   .leftJoin("steps", "schemes.scheme_id", "steps.scheme_id")
  //   .where("schemes.scheme_id", scheme_id);
  // return response;
  return await findSteps(scheme_id);
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
  findByName,
};
