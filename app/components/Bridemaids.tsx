import React from "react";

type BridemaidsProps = {};

export function Bridemaids({}: BridemaidsProps): JSX.Element {
  return (
    <div>
      <div className="hover group relative grid w-48 place-items-center rounded-full duration-200">
        <img
          className="h-full h-48 w-full w-48 scale-75 rounded-[inherit] object-cover duration-[inherit] group-hover:scale-100"
          src="./images/LogLHjem.jpg"
          alt=""
        />
        <div className="top-full flex flex-col items-center text-center">
          <h4 className="font-heading text-xl">Kristoffer</h4>
          <p className="absolute -translate-y-full opacity-0 duration-500 group-hover:translate-y-10 group-hover:opacity-100">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            delectus
          </p>
        </div>
      </div>
    </div>
  );
}
