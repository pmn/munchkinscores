package main

import (
	"log"
	"net/http"
	"os"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "5000"
	}

	http.Handle("/", http.FileServer(http.Dir("./")))
	log.Println("Starting application on port " + port)
	http.ListenAndServe(":"+port, http.DefaultServeMux)
}
