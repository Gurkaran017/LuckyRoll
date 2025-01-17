import React from 'react'

const TotalScore = ({score , sun}) => {
  return (
    <>
    <div>
        <div className='justify-center'>
          <div><h1 className={`md:text-7xl text-5xl ${sun?"text-black":"text-gray-400"} font-semibold ${score<10 ? 'ml-[12px]' : ''}` }>{score}</h1></div>
        <div className={`text-lg font-bold ${sun?"text-black":"text-gray-400"} `}>Total Score</div>
        </div>
    </div>
    </>
  )
}

export default TotalScore
