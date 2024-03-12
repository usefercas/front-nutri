import React from 'react';

const Avatar = ({ avatar }) => {
  return (
    <div className="w-40 h-40 rounded-circle overflow-hidden">
      <img src={avatar} className="w-100 h-100" alt="Avatar" />
    </div>
  );
};

export default Avatar;
