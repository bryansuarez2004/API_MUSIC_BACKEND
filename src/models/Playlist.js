const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Playlist = sequelize.define('playlist', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    timestamps: false
  });

module.exports = Playlist;