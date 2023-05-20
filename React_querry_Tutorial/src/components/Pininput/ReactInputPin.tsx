import InputPin from "./InputComponent";
import { useState } from "react";

const ReactInputPin = () => {
  const [otp, setOtp] = useState<string>("");

  const onChange = (value: string) => setOtp(value);
  console.log(otp);

  return (
    <div>
      <h1>Typescript Otp Practice</h1>
      <InputPin value={otp} valueLength={4} onChange={onChange} />
    </div>
  );
};

export default ReactInputPin;
