import React from "react";

const RuleModal = ({ isOpen, onClose ,sun }) => {
    if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${sun?"bg-pink-100":"bg-gray-400"} rounded-lg p-6 w-4/5 shadow-lg`}>
        <h2 className="text-xl font-semibold mb-4">Game Rules</h2>
        <ul className="text-gray-700 mb-6 list-disc pl-6">
  <li>Select any number.</li>
  <li>Click on the dice image.</li>
  <li>
    After clicking on the dice, if the selected number matches the dice number, 
    you will earn points equal to the selected number.
  </li>
  <li>
    If the selected number does not match the dice number, your score will be 
    reduced by half of the selected number.
  </li>
  <li>You have 10 chances to play.</li>
</ul>

        <div className="flex justify-center">
        <button
          onClick={onClose}
          className={`px-6 py-2 ${sun?"bg-red-500":"bg-black"} text-white rounded hover:bg-red-600 focus:outline-none`}
        >
          Close
        </button>
        </div>
      </div>
    </div>
  );
};

export default RuleModal;
