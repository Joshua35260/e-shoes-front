function TypesOptions(props) {
  const { typeName, Tid } = props;

  return (
    <option className="adminOption" value={Tid}>
      {typeName}
    </option>
  );
}

export default TypesOptions;
