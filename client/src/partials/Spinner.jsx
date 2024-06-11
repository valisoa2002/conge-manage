import { ThreeDots } from "react-loader-spinner";

// eslint-disable-next-line react/prop-types
function Spinner({ height, width, color }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ThreeDots height={height} width={width} color={color} />
    </div>
  );
}

export default Spinner;
