package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Project struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

var projects = []Project{
	{
		ID:          1,
		Name:        "DevTrack",
		Description: "Full Stack Tracker",
	},
}

func main() {
	r := gin.Default()

	r.Use(cors.Default())

	r.GET("/projects", func(c *gin.Context) {
		c.JSON(http.StatusOK, projects)
	})

	r.Run(":8080")
}
