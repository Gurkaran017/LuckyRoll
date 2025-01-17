import React from "react";

const HighScore = ({ highScore,sun }) => {
  return (
    <>
      <div>
        <div className="justify-center">
          <div>
            <h1 className={`md:text-7xl text-5xl font-semibold ${sun?"text-black":"text-gray-400"}`}>{highScore}</h1>
          </div>
          <div className={`text-lg font-bold ${sun?"text-black":"text-gray-400"}`}>High Score</div>
        </div>
      </div>
    </>
  );
};

export default HighScore;
