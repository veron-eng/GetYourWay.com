import React from 'react';
import 'tailwindcss/tailwind.css';
import { AiFillStar } from 'react-icons/ai';

interface Show {
  title: string;
  description: string;
}

interface ShowRecommendationProps {
  shows: Show[];
}

const ShowRecommendation: React.FC<ShowRecommendationProps> = ({ shows }) => {
  return (
    <div className="flex flex-col rounded-xl items-center justify-center py-10 px-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <h2 className="text-4xl text-white font-bold mb-6">🪄 EPG Magic Recommendations 🪄</h2>
      <div className="space-y-6">
        {shows.map((show, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg space-y-2">
            <h3 className="flex items-center space-x-2">
              <AiFillStar className="text-yellow-500"/>
              <span className="text-2xl font-bold">{show.title}</span>
            </h3>
            <p className="text-gray-700">{show.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowRecommendation;
