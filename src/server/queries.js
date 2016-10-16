import Promise from 'bluebird';
import pgPromise from 'pg-promise';

const options = {
  // Initialization Options
  promiseLib: Promise
};

const pgp = pgPromise(options);
const connectionString = 'postgres://localhost:5432/smusmy';
const db = pgp(connectionString);

// add query functions
const getAllProducts = (req, res, next) => {
  db.any('select * from products')
    .then(data => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL products2'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

export default {
  getAllProducts
};