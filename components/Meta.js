const Meta = ({ id, name, type }) => (
  <div>
    <meta name="theme-color" content="#4fe2c2" />
    <meta name="description" content="a repl for playing music" />
    <meta itemProp="name" content={name} />
    <meta itemProp="description" content="a repl for playing music" />
    <meta itemProp="image" content={`https://skrrt.fun/api/meta-image/${id}`} />

    <meta
      property="og:url"
      content={
        type !== "radio"
          ? `https://skrrt.fun${type}`
          : `https://skrrt.fun/radio/${id}`
      }
    />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={name} />
    <meta property="og:description" content="a repl for playing music" />
    <meta
      property="og:image"
      content={`https://skrrt.fun/api/meta-image/${id}`}
    />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={name} />
    <meta name="twitter:description" content="a repl for playing music" />
    <meta
      name="twitter:image"
      content={`https://skrrt.fun/api/meta-image/${id}`}
    />
  </div>
);

export default Meta;
