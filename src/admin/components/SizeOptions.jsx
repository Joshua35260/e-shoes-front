function SizesOptions(props) {
  const { sizeName, Sid } = props;

  return (
    <option className="adminOption" value={Sid}>
      {sizeName}
    </option>
  );
}

export default SizesOptions;
