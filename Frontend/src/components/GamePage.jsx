import React, { useEffect, useState } from "react";
import TotalScore from "./TotalScore";
import NumberSelector from "./NumberSelector";
import RuleModal from "./RuleModal";
import HighScore from "./HighScore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import SearchModal from "./SearchModal";
import { useAuth } from "../Context/AuthProvider";
import gameplay_background from "../../public/images/gameplay_background.jpg";
import ChanceModal from "./ChanceModal";
import { FiSun } from "react-icons/fi";
<FiSun />
import { IoMoon } from "react-icons/io5";
<IoMoon />
import { MdWbSunny } from "react-icons/md";
<MdWbSunny />
import gameplay_backgroundBW from "../../public/images/gameplayBW_background.jpg";
import { FaSun } from "react-icons/fa";
<FaSun />
import { FaCloudMoon } from "react-icons/fa";
<FaCloudMoon />


const GamePage = () => {
  const { Search, setSearch, searchResults, setSearchResults } = useAuth();
  const [DiceNum, setDiceNum] = useState(1);
  const [selectedNum, setSelectedNum] = useState(0);
  const [Score, setScore] = useState(0);
  const [highScore, sethighScore] = useState(0);
  const [chances , setChances] = useState(10)


  const [isModalOpen, setModalOpen] = useState(false);
  const [SearchModalOpen, setSearchModal] = useState(false);
  const [ChancesModal , setChancesModal] = useState(false)
  const [Nonum, setNonum] = useState(false);
  const [sun, setSun] = useState(true)

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  
  // const chanceOpen = () => setChanceModal(true);
  const chanceClose = () => setChancesModal(false)

  const SearchOpen = async () => {
    try {
      const res = await axios.get(
        `https://luckyroll-7vn4.onrender.com/api/Players?search=${Search}`
      );
      if (res.data.players && res.data.players.length === 0) {
        console.log("No players found");
        setSearchResults([]);
        setSearchModal(true);
      } else {
        setSearchResults(res.data);
        setSearchModal(true);
      }
    } catch (error) {
      setSearchResults([]);
      setSearchModal(true);
      console.log("Error occurred:", error.message);
    }
  };

  const SearchClose = () => setSearchModal(false);

  const RollDice = () => {
    const randomNum = Math.floor(Math.random() * 6) + 1;
    const half = selectedNum/2;
    // console.log("half: ",half)
    setDiceNum(randomNum);
    if (selectedNum === 0) {
      setNonum(true);
      return;
    }
    if (randomNum === selectedNum) {
      setScore(Score + randomNum);
      setSelectedNum(0);
      setNonum(false);
      setChances(chances-1)
    } else {
      setScore((prevScore) => Math.max(0,prevScore-half));
      setSelectedNum(0);
      setNonum(false);
      setChances(chances-1)
    }
    if(chances===1){
      setChancesModal(true)
    }
  };

  if (Score > highScore) {
    sethighScore(Score);
  }

  const reset = () => {
    setNonum(false);
    setScore(0);
    setChances(10)
  };

  const navigate = useNavigate();
  const logout = async () => {
    localStorage.removeItem("User");
    navigate("/");
  };

  useEffect(() => {
    const str = async () => {
      const user = JSON.parse(localStorage.getItem("User"));
      sethighScore(user?.highestScore || 0);
    };
    str();
  }, []);

  useEffect(() => {
    const updateHighScore = async () => {
      const user = JSON.parse(localStorage.getItem("User"));
      const email = user?.email;

      if (email) {
        try {
          await axios.post("https://luckyroll-7vn4.onrender.com/api/changeScore", {
            email,
            highScore,
          });
        } catch (error) {
          console.error("Error updating high score:", error);
        }
      }
    };

    updateHighScore();
  }, [highScore]);

  const diceImage = `/images/dice/dice_${DiceNum}.png`;

  const SunFalse = () => setSun(false)
  const SunTrue = () => setSun(true)

  return (
    <>
      <div className="min-h-screen bg-cover bg-fixed bg-no-repeat overflow-hidden "
      style={{backgroundImage: `url(${sun?gameplay_background:gameplay_backgroundBW})`}}>
        <div className="relative flex justify-between items-center mt-2 m-5">
        <div
  className="absolute m-2 md:ml-6 ml-36 mt-3 text-4xl cursor-pointer text-blue-800 hover:text-yellow-500 transition-colors duration-300"
  aria-label={sun ? "Switch to Moon Mode" : "Switch to Sun Mode"}
  title={sun ? "Switch to Moon Mode" : "Switch to Sun Mode"}
>
  {sun ? (
    <FaSun onClick={SunFalse} className="animate-pulse" />
  ) : (
    <FaCloudMoon onClick={SunTrue} className="animate-bounce" />
  )}
</div>

          <div className="flex justify-end md:w-7/12">
            <button
              onClick={logout}
              className={`mr-3 ${sun? "bg-red-500" : "bg-black"} hover:font-black hover:bg-red-500  ${sun? "text-black" : "text-gray-500"} font-semibold py-1 md:px-16 px-8 rounded-md hover:text-black ${sun? "border-black" : "border-gray-600"} border-2 duration-300 hover:ease-in-out`}
            >
              Logout
            </button>
          </div>
          <div className="flex items-center justify-end md:mx-5">
            <input
              className={`px-4 py-1 ${sun? "bg-slate-100" : "bg-gray-500"} rounded-2xl border-black border-2 pr-8 w-36  md:w-auto`}
              placeholder="Search Players . . ."
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch
              onClick={SearchOpen}
              className={`cursor-pointer absolute ${sun?"text-gray-500":"text-black"} mr-[14px]`}
            />
          </div>
        </div>

        <div className="flex justify-between md:m-10 m-5">
          <div className="md:flex mr-5 md:mr-0">
            <div className="mx-3">
              <HighScore sun={sun} highScore={highScore} />
            </div>
            <div className="mx-3">
              <TotalScore sun={sun} score={Score} />
            </div>
          </div>
          <div>
          <NumberSelector
            sun = {sun}
            selectedNum={selectedNum}
            setSelectedNum={setSelectedNum}
            Nonum={Nonum}
            setNonum={setNonum}
          />
          </div>
        </div>

        <div className="flex justify-center">
          <div>
            <div className="p-0" >
              <img
                className="cursor-pointer bg-white md:mt-[-35px] ml-3 w-11/12 rounded-3xl shadow-[12px_12px_15px_#000000] hover:shadow-[17px_17px_22px_#000000] transition-all duration-300"
                onClick={RollDice}
                src={diceImage}
                alt={`Dice showing ${DiceNum}`}
              />
            </div>
            <div className="flex justify-center">
              <div>
                <div className="flex justify-center mt-4 md:mt-2 ">
                  <h1 className="text-2xl font-semibold">Click on Dice to roll</h1>
                </div>
                <div className="flex justify-center mb-2">
                  <h1 className={`text-2xl ${chances<=3 ? (sun?"text-red-700":"text-red-600"): (sun?"text-green-900":"text-green-500")} ${chances<=6 && chances>=4 ? "text-orange-800":"text-green-500"} font-bold`}>Chance left : {chances}</h1>
                </div>
                <div className="flex justify-center my-1">
                  <button
                    onClick={reset}
                    className={`${sun?"bg-[#6fc2cd]":"bg-gray-500"} py-1 px-16 rounded-md hover:bg-black hover:text-white duration-200 ease-in-out font-bold hover:font-normal border-black border-2 m-2`}
                  >
                    Reset Score
                  </button>
                </div>
                <div className="flex justify-center my-1">
                  <button
                    onClick={openModal}
                    className={`bg-black text-white py-1 px-16 mb-10 rounded-md ${sun?"hover:bg-[#6fc2cd]":"hover:bg-gray-500"} hover:font-bold hover:text-black border-black border-2 duration-300 hover:ease-in-out`}
                  >
                    Show Rules
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RuleModal sun={sun} isOpen={isModalOpen} onClose={closeModal} />
        <SearchModal sun={sun} isOpen={SearchModalOpen} onClose={SearchClose} />
        <ChanceModal sun={sun} reset={reset} score={Score} isOpen={ChancesModal} onClose={chanceClose} />
      </div>
    </>
  );
};

export default GamePage;
