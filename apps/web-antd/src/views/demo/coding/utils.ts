const columnName2FieldName = (columnName: string) => {
  let nameSplit = columnName.split('_');
  nameSplit = nameSplit.map((str) =>
    str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase()),
  );
  const lowerClassName = nameSplit;
  lowerClassName[0] = lowerClassName[0].toLowerCase();
  return lowerClassName.join('');
};

export { columnName2FieldName };
