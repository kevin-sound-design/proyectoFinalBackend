function getActualQuery(query, values) {
  if (!values || values.length === 0) {
    return query;
  }

  let actualQuery = query;
  values.forEach((value, index) => {
    const placeholder = `$${index + 1}`;
    const escapedValue =
      typeof value === "string" ? `'${value.replace(/'/g, "''")}'` : value;
    actualQuery = actualQuery.replace(placeholder, escapedValue);
  });

  return actualQuery;
}

export { getActualQuery };
