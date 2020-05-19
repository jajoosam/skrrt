export default async (req, res) => {
  res.writeHead(302, {
    Location: `https://res.cloudinary.com/skrrt/image/fetch/${encodeURIComponent(
      `https://skrrt-filter-og.now.sh/${req.query.id}/100?w=1200&h=635`
    )}`,
  });
  res.end();
};
