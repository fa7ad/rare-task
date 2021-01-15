const { Router } = require('express');
const { pickAll, omit, over, lensProp, isNil, map, compose, reject } = require('ramda');

const db = require('../data');

const _tc = require('../helpers/trycatch');
const { allNonNil } = require('../helpers/utils');
const HTTPError = require('../helpers/httpError');

const { ensureUserRole } = require('../middleware/auth');

const LISTING_REQUIRED = [
  'title',
  'description',
  'city',
  'country',
  'rating',
  'type',
  'dates_available',
  'price',
  'images'
];

const listingCtl = Router();

listingCtl.get(
  '/',
  _tc(async (req, res) => {
    const take = Number(req.query?.limit || 10);
    const _page = Number(req.query?.page || 1);
    const min_rating = Number(req.query?.min_rating || 0);
    const type = req.query?.type ?? '';
    const min_date = req.query?.min_date || '';
    const max_date = req.query?.max_date || '';
    const search = (req.query?.search || '').trim();
    const page = Math.max(0, _page - 1);
    const fts_query = search.replace(/[!'()|&]/g, ' ').replace(/\s+/g, ' & ') + ':*';
    const ilike_query = `%${search}%`;

    /**
     * @type {Array<{id: number}>}
     */
    const searchResult = await db.$queryRaw`SELECT id
FROM (SELECT public."Listing".*, concat_ws(' ', title, description, city, country, type) AS fts_idx
      FROM public."Listing") ftslisting
WHERE
  CASE ${fts_query}
      WHEN ':*' THEN TRUE
      ELSE to_tsvector(fts_idx) @@ to_tsquery(${fts_query}) OR fts_idx ILIKE ${ilike_query} END
  AND CASE ${type} WHEN '' THEN TRUE ELSE type = ${type} END
  AND CASE ${min_date}
          WHEN '' THEN TRUE
          ELSE to_date(dates_available ->> 'min_date', 'YYYY-MM-DD') <= to_date(${min_date}, 'YYYY-MM-DD') AND
               to_date(dates_available ->> 'max_date', 'YYYY-MM-DD') >= to_date(${min_date}, 'YYYY-MM-DD')
          END
  AND CASE ${max_date}
          WHEN '' THEN TRUE
          ELSE to_date(dates_available ->> 'max_date', 'YYYY-MM-DD') >= to_date(${max_date}, 'YYYY-MM-DD') END
  AND rating >= ${min_rating}`;
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
    const listings = _listings.map(over(lensProp('user'), omit(['password', 'role'])));

    res.json({ success: true, listings });
  })
);

listingCtl.get(
  '/:id',
  _tc(async (req, res) => {
    const id = Number(req.params?.id || '-1');
    if (id === -1) throw new HTTPError(400, 'Invalid ID');
    const _listing = await db.listing.findUnique({
      where: { id },
      include: {
        user: true,
        comments: true
      }
    });
    if (!_listing?.id > 0) throw new HTTPError(404, 'Not Found');
    const listing = over(lensProp('user'), omit(['password', 'role']))(_listing);
    res.json({
      success: true,
      listing
    });
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
