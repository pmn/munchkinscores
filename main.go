package main

import (
	"log"
	"net/http"
	"os"
)

type Player struct {
	Name  string `json:"name"`
	Level int    `json:"level"`
}

type Game struct {
	Id      string   `json:"id"`
	Players []Player `json:"players"`
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "5000"
	}

	http.Handle("/", http.FileServer(http.Dir("./")))
	log.Println("Starting application on port " + port)
	http.ListenAndServe(":"+port, http.DefaultServeMux)
}
