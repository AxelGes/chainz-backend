# Chainz Backend
Chainz backend using NestJS TypeORM MySQL

# Insert
POST http://localhost:8080/player/

{
    "uuid": 1234,
    "username": "eugenio",
    "wallet": "0x123123"
}

# Update
PUT http://localhost:8080/player/12312345/skywars

{
    "games_played": 1,
    "games_won": 0,
    "kills": 0,
    "deaths": 1,
    "coins": 50
}
