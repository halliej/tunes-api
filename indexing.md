# Indexing

## Commands to index db

+ db.songs.createIndex({Name:1})
+ db.songs.createIndex({Artist:1})
+ db.songs.createIndex({Album:1})


## Before indexing

+ Processing GET for /api/songs
+ get all songs: **3.334ms**
+ Processing GET for /api/songs/name/Waste
+ get songs by name: **0.645ms**
+ Processing GET for /api/songs/artist/Metallica
+ get songs by artist: **16.652ms**
+ Processing GET for /api/artists
+ get all artists: **1.984ms**
+ Processing GET for /api/albums
+ get all albums: **0.546ms**

## After indexing

+ Processing GET for /api/songs
+ get all songs: **0.468ms**
+ Processing GET for /api/songs/name/Waste
+ get songs by name: **0.400ms**
+ Processing GET for /api/songs/artist/Metallica
+ get songs by artist: **0.205ms**
+ Processing GET for /api/artists
+ get all artists: **1.839ms**
+ Processing GET for /api/albums
+ get all albums: **0.465ms**
