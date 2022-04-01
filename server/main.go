package main

import (
	"leechcode/db"
)

func main() {
	// connect the db and run the router

	db.ConnectDatabase()
	db.ClearDatabase()
	RunRouter()
}
