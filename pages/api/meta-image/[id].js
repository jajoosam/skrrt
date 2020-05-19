export default async (req, res) => {
  if (req.query.id === "skrrt" || req.query.id === "sandbox") {
    res.writeHead(302, {
      Location: "https://skrrt.fun/meta.png",
    });
    return res.end();
  }
  res.writeHead(302, {
    Location: `https://skrrt-filter-og.now.sh/${req.query.id}/100?w=1200&h=635`,
  });
  res.end();
};
