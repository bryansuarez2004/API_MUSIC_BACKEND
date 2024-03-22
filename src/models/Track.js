const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Track = sequelize.define('track', {
    spotifyId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
},{
    timestamps: false
  });

module.exports = Track;