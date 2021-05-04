// -------------------------------------------------------------------------------
// CONEXIÓN DB
// -------------------------------------------------------------------------------
const jwt = require("jsonwebtoken");
const { MongoClient } = require("mongodb");
const URL = process.env.MONGODB;
const optionsMongo = { useNewUrlParser: true, useUnifiedTopology: true };
const randomstring = require("randomstring")

// -------------------------------------------------------------------------------
// LOGICA
// -------------------------------------------------------------------------------

const registerNewUser = (USER) => {
  return new Promise((res, rej) => {
    MongoClient.connect(URL, optionsMongo, (err, db) => {
      try {
        db.db("niutu")
          .collection("usuarios")
          .insertOne(USER, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              const result = {
                status: 200,
                data: "Nuevo usuario creado",
                ok: true,
              };
              res(result);
              db.close()
            }
          });
      } catch {
        rej(err);
      }
    });
  });
};

const checkUser = (user) => {
  return new Promise((res, rej) => {
    MongoClient.connect(URL, optionsMongo, (err, db) => {
      try {
        db.db("niutu").collection("usuarios")
          .findOne(user, (err, result) => {
            if (err) throw err;
            if (result === null) {
              res({
                status: 401,
                data: "Email o contraseña incorrect@s",
                ok: false,
              });
            } else {
              let token = jwt.sign({ email: result.email, id: result.id }, result.secret, {
                expiresIn: 60 * 60});
              res({
                status: 200,
                token: token,
                data: "Usuario logado correctamente",
                ok: true,
              });
              db.close();
            }
          });
      } catch {
        rej({
          status: 500,
          data: "Error con la base de datos",
          ok: false,
        });
      }
    });
  });
};

const readFavorite = (token) => {
  const decode = jwt.decode(token);

  if (decode.email) {
    return new Promise((res, rej) => {
      connection.query(
        `SELECT * FROM favoritos WHERE idUsuario = ${decode.id}`,
        function (error, result, fields) {
          if (error) {
            res(false);
          } else {
            res(result);
          }
        }
      );
    });
  } else {
    const result = {
      status: 400,
      data: "Token not found",
      url: "/",
      ok: false,
    };
    return result;
  }
};

const deleteSecret = token => {
  const secret = randomstring.generate();
  const decode = jwt.decode(token);
    return new Promise((res, rej) => {
      MongoClient.connect(URL, optionsMongo, (err, db) =>{
        try {
          db.db("niutu").collection("usuarios").updateOne({id: decode.id}, {$set: {secret: secret}}, (err, result) => {
            if (err) throw err;
            if (result === null) {
              res({
                status: 400,
                data: "Token not found",
                ok: false,
              })
            } else {
              res({
                status: 200,
                data: result,
                ok: true
              })
              db.close();
            }
          })

        } 
        catch {
          rej({
            status: 500,
            data: "Error Interno de la Base de Datos",
            ok: false,
          })
        }
      })
 
  })
};

const deleteFav = async (url) => {
  return new Promise((res, rej) => {
    connection.query(
      `DELETE FROM favoritos WHERE url = "${url}"`,
      function (error, results) {
        if (error) {
          const result = {
            status: 406,
            data: "Algo va mal",
            ok: false,
            url: "/",
          };
          rej(result);
        } else if (results.affectedRows === 1) {
          const result = {
            status: 200,
            data: "Se ha eliminado tu favorito",
            ok: true,
            url: "/",
          };
          res(result);
        } else {
          const result = {
            status: 401,
            data: "Tu favorito no existe",
            ok: false,
            url: "/",
          };
          res(result);
        }
      }
    );
  });
};

const registerNewFav = (NEWFAV) => {
  if (NEWFAV.token.email) { 
    return new Promise((resolve, reject) => {
      connection.query(
        `INSERT IGNORE INTO favoritos (titulo,resumen, url, idUsuario) VALUES ("${NEWFAV.titulo}","${NEWFAV.resumen}","${NEWFAV.url}","${NEWFAV.idUsuario}")`,
        function (error, results, fields) {
          if (error) {
            const result = {
              status: 401,
              data: "Ha ocurrido un error",
              ok: false,
              url: "/",
            };
            resolve(result);
          } else if (results.affectedRows === 0) {
            const result = {
              status: 406,
              data: "Esta oferta favorita ya existe",
              ok: false,
            };
            resolve(result);
          } else {
            const result = {
              status: 200,
              data: "Oferta favorita guardada correctamente",
              ok: true,
            };
            resolve(result);
          }
        }
      );
    });
  } else {
    const result = {
      status: 400,
      data: "No tienes token, no autorizado",
      ok: false,
    };
    return result;
  }
};

const changeCodes = async (TERM) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT codigo FROM  codigos WHERE nombre = ('${TERM.localizacion}')`,
      function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results[0].codigo);
        }
      }
    );
  });
};

const doQuery = async (param) => {
  return new Promise((resolve, reject) => {
    connection.query(param, function (err, res) {
      if (err) {
        rej(false);
      } else {
        resolve(res);
      }
    });
  });
};

const registerNewUserGoogle = (USER) => {
  return new Promise((res, rej) => {
    const secret = randomstring.generate();
    connection.query(
      `INSERT INTO usuarios (email, pass, secret) VALUES ("${USER.email}","${USER.pass}", "${secret}")`,
      function (error, results, fields) {
        if (error) {
          const result = {
            status: 405,
            data: "Usuario ya existe",
            ok: false,
          };
          res(result);
        } else {
          connection.query(
            `SELECT secret, id FROM usuarios WHERE email = '${USER.email}'`,
            function (err, results, fields) {
              if (err) {
                console.log(err);
                res(false);
              } else if (results[0]?.secret) {
                let token = jwt.sign(
                  { email: USER.email, id: results[0].id },
                  results[0].secret,
                  { expiresIn: 60 * 60 }
                );
                const result = {
                  status: 200,
                  data: "Usuario creado correctamente",
                  token,
                  ok: true,
                };
                res(result);
              } else if (results[0] == undefined) {
                const result = {
                  status: 400,
                  data: "Email o contraseña incorrect@s",
                  ok: false,
                };
                res(result);
              }
            }
          );
        }
      }
    );
  });
};

// -------------------------------------------------------------------------------
// Export modules
// -------------------------------------------------------------------------------

module.exports = {
  registerNewUser,
  deleteSecret,
  deleteFav,
  checkUser,
  readFavorite,
  registerNewFav,
  changeCodes,
  doQuery,
  registerNewUserGoogle,
};
