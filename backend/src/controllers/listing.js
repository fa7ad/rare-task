const { Router } = require('express');
const { pickAll, omit, over, lensProp, isNil, map, compose, reject } = require('ramda');

const db = require('../data');

const _tc = require('../helpers/trycatch');
const { allNonNil } = require('../helpers/utils');
const HTTPError = require('../helpers/httpError');

const { ensureUserRole } = require('../middleware/auth');

const LISTING_REQUIRED = ['title', 'description', 'city', 'country', 'rating'];

const listingCtl = Router();

listingCtl.get(
  '/',
  ensureUserRole('user'),
  _tc(async (req, res) => {
    const take = Number(req.query?.limit || 10);
    const _page = Number(req.query?.page || 1);
    const search = req.query?.search || '';
    const page = Math.max(0, _page - 1);

    /**
     * @type {import('@prisma/client').User[]}
     */
    const searchResult = await db.$queryRaw`SELECT * FROM Listing WHERE to_tsvector(title) || to_tsvector(description) || to_tsvector(city) || to_tsvector(country) @@ to_tsquery(${search})`;
    const fts_ids = searchResult.map(({ id }) => id);

    const _listings = await db.listing.findMany({
      take,
      skip: take * page,
      where: { id: { in: fts_ids } },
      include: {
        user: true,
        comments: true
      }
    });
    const listings = _listings.map(over(lensProp('user'), omit(['password'])));

    res.json({ success: true, listings });
  })
);

listingCtl.post(
  '/',
  ensureUserRole('user'),
  _tc(async (req, res) => {
    const requiredData = pickAll(LISTING_REQUIRED, { ...req.body });
    const values_exist = allNonNil(requiredData);
    if (!values_exist) throw new HTTPError(400, `${LISTING_REQUIRED} are required.`);
    const listing = await db.listing.create({
      data: { ...requiredData, user: { connect: { id: req.user.id } } }
    });
    res.json({ success: true, listing });
  })
);

listingCtl.put(
  '/:id',
  ensureUserRole('user'),
  _tc(async (req, res) => {
    const id = +req.params.id;
    const _listing = await db.listing.findUnique({ where: { id } });
    if (!_listing) throw new HTTPError(404, 'Listing Not Found');
    if (req.user.role !== 'admin' && _listing.userId !== req.user.id) throw new HTTPError(403, 'Forbidden');
    const updateDelta = compose(map(omit(['user', 'userId', 'comments'])), reject(isNil))({ ...req.body });
    const result = await db.listing.update({
      where: { id },
      data: updateDelta
    });
    res.json({
      success: true,
      result
    });
  })
);

listingCtl.delete(
  '/:id',
  ensureUserRole('user'),
  _tc(async (req, res) => {
    const id = +req.params.id;
    const _listing = await db.listing.findUnique({ where: { id } });
    if (!_listing) throw new HTTPError(404, 'Listing Not Found');
    if (req.user.role !== 'admin' && _listing.userId !== req.user.id) throw new HTTPError(403, 'Forbidden');
    const result = await db.listing.delete({
      where: { id }
    });
    res.json({
      success: true,
      result
    });
  })
);

module.exports = listingCtl;
