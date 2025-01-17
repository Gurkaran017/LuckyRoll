import React from 'react'

const ChanceModal = ({reset, isOpen, onClose, score,sun }) => {
    if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${sun?"bg-pink-100":"bg-gray-400"} rounded-lg p-6 w-1/3 min-w-80 shadow-lg`}>
      <div className="flex justify-center mb-3">
            <h1 className={`text-3xl font-bold ${sun?"text-red-600":"text-black"}`}>No Chance Left</h1>
          </div>
        <div className="flex justify-center mb-3">
        <p className="text-gray-700 mb-6 font-semibold text-lg">
          Your Score is {score}
        </p>
        </div>
        <div className="flex justify-center">
        <button
          onClick={()=>{
            onClose()
            reset()
          }}
          
          className={`px-6 py-2 ${sun?"bg-red-500":"bg-black"} text-white rounded hover:bg-red-600 focus:outline-none`}
        >
          Reset
        </button>
        </div>
      </div>
    </div>
  )
}

export default ChanceModal
