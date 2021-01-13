const { Router } = require('express');

const db = require('../data');
const _tc = require('../helpers/trycatch');
const { ensureUserRole } = require('../middleware/auth');

const listingCtl = Router();

listingCtl.get(
  '/',
  ensureUserRole('user'),
  _tc(async (req, res) => {
    const take = req.query?.limit || 10;
    const _page = req.query?.page || 1;
    const search = req.query?.search || '';
    const page = Math.max(0, _page - 1);

    /**
     * @type {import('@prisma/client').User[]}
     */
    const searchResult = await db.$queryRaw`SELECT * FROM Listing WHERE to_tsvector(title) || to_tsvector(description) || to_tsvector(city) || to_tsvector(country) @@ to_tsquery(${search})`;
    const fts_ids = searchResult.map(({ id }) => id);

    const listings = await db.listing.findMany({
      take,
      skip: take * page,
      where: {
        id: {
          in: fts_ids
        }
      }
    });

    res.json(listings);
  })
);

listingCtl.post('/', ensureUserRole('user'), _tc(async (req, res) => {
  
}))

module.exports = listingCtl;
