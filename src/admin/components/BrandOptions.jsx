function BrandsOptions(props) {
  const { brandName, Bid } = props;

  return (
    <option className="adminOption" value={Bid}>
      {brandName}
    </option>
  );
}

export default BrandsOptions;
