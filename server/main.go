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

	r.POST("/projects", func(c *gin.Context) {

		var newProject Project

		if err := c.BindJSON(&newProject); err != nil {
			return
		}

		newProject.ID = len(projects) + 1

		projects = append(projects, newProject)

		c.JSON(http.StatusCreated, newProject)
	})
}
