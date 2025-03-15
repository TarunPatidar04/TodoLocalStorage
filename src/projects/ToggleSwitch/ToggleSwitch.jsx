import { useState } from "react";

const ToggleSwitch = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleClick = () => {
    setIsToggled(!isToggled);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <h1>
        {isToggled ? (
          <span className="bg-green-400 px-2 py-2 text-white">{"ON"}</span>
        ) : (
          <span className="bg-red-400 px-2 py-2 text-white">{"OFF"}</span>
        )}
      </h1>
      <button onClick={handleClick}>Button</button>
    </div>
  );
};

export default ToggleSwitch;
