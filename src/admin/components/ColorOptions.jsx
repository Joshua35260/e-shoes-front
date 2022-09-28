function ColorsOptions(props) {
  const { colorName, Cid } = props;

  return (
    <option className="adminOption" value={Cid}>
      {colorName}
    </option>
  );
}

export default ColorsOptions;
