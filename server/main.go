package main

import (
	"net/http"
	"strconv"

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

	// GET ALL PROJECTS
	r.GET("/projects", func(c *gin.Context) {
		c.JSON(http.StatusOK, projects)
	})

	// CREATE PROJECT
	r.POST("/projects", func(c *gin.Context) {
		var newProject Project

		if err := c.BindJSON(&newProject); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		newProject.ID = len(projects) + 1
		projects = append(projects, newProject)

		c.JSON(http.StatusCreated, newProject)
	})

	// UPDATE PROJECT
	r.PUT("/projects/:id", func(c *gin.Context) {
		id := c.Param("id")

		var updatedProject Project

		if err := c.BindJSON(&updatedProject); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		for i, project := range projects {
			if strconv.Itoa(project.ID) == id {
				projects[i].Name = updatedProject.Name
				projects[i].Description = updatedProject.Description

				c.JSON(http.StatusOK, projects[i])
				return
			}
		}

		c.JSON(http.StatusNotFound, gin.H{
			"error": "Project not found",
		})
	})

	// DELETE PROJECT
	r.DELETE("/projects/:id", func(c *gin.Context) {
		id := c.Param("id")

		for i, project := range projects {
			if strconv.Itoa(project.ID) == id {
				projects = append(
					projects[:i],
					projects[i+1:]...,
				)

				c.JSON(http.StatusOK, gin.H{
					"message": "Project deleted",
				})

				return
			}
		}

		c.JSON(http.StatusNotFound, gin.H{
			"error": "Project not found",
		})
	})

	r.Run(":8080")
}
