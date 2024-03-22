const Playlist = require("./Playlist");
const Track = require("./Track");
const User = require("./User");


Playlist.belongsToMany(Track,{through:'playlistsTracks'})
Track.belongsToMany(Playlist,{through:'playlistsTracks'})

User.belongsToMany(Track,{through:'usersTracks'})
Track.belongsToMany(User,{through:'usersTracks'})


Playlist.belongsTo(User)
User.hasMany(Playlist)

