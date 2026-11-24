package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"devtrack/auth"
	"devtrack/database"
	"devtrack/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID       int64  `json:"id"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Project struct {
	ID          int64  `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Status      string `json:"status"`
	UserID      int64  `json:"user_id"`
}

func main() {
	// Load .env
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env")
	}

	fmt.Println(os.Getenv("DATABASE_URL"))

	// Connect DB
	err = database.ConnectDB()
	if err != nil {
		log.Fatal(err)
	}

	// Create Gin router
	r := gin.Default()

	r.Use(cors.Default())

	// Health Check Route
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "DevTrack API Running 🚀",
		})
	})

	// REGISTER
	r.POST("/register", func(c *gin.Context) {
		var user User

		if err := c.BindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		hashedPassword, err := bcrypt.GenerateFromPassword(
			[]byte(user.Password),
			bcrypt.DefaultCost,
		)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		err = database.DB.QueryRow(
			context.Background(),
			`
			INSERT INTO users (email, password)
			VALUES ($1, $2)
			RETURNING id
			`,
			user.Email,
			string(hashedPassword),
		).Scan(&user.ID)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusCreated, gin.H{
			"message": "User registered",
		})
	})

	// LOGIN
	r.POST("/login", func(c *gin.Context) {
		var request User

		if err := c.BindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		var user User

		err := database.DB.QueryRow(
			context.Background(),
			`
			SELECT id, email, password
			FROM users
			WHERE email = $1
			`,
			request.Email,
		).Scan(
			&user.ID,
			&user.Email,
			&user.Password,
		)

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Invalid credentials",
			})
			return
		}

		err = bcrypt.CompareHashAndPassword(
			[]byte(user.Password),
			[]byte(request.Password),
		)

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Invalid credentials",
			})
			return
		}

		token, err := auth.GenerateToken(user.ID)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"token": token,
		})
	})

	// Protected Routes
	protected := r.Group("/")
	protected.Use(middleware.AuthMiddleware())

	// GET PROJECTS
	protected.GET("/projects", func(c *gin.Context) {

		userID, exists := c.Get("userID")

		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Unauthorized",
			})
			return
		}

		rows, err := database.DB.Query(
			context.Background(),
			`
		SELECT
			id,
			name,
			description,
			user_id
		FROM projects
		WHERE user_id = $1
		ORDER BY id
		`,
			userID,
		)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		defer rows.Close()

		projects := make([]Project, 0)

		for rows.Next() {
			var project Project

			err := rows.Scan(
				&project.ID,
				&project.Name,
				&project.Description,
				&project.UserID,
			)

			if err != nil {
				continue
			}

			projects = append(
				projects,
				project,
			)
		}

		c.JSON(
			http.StatusOK,
			projects,
		)
	})

	// CREATE PROJECT
	protected.POST("/projects", func(c *gin.Context) {

		userID, exists := c.Get("userID")

		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Unauthorized",
			})
			return
		}

		var project Project

		if err := c.BindJSON(&project); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		project.UserID = userID.(int64)

		err := database.DB.QueryRow(
			context.Background(),
			`
		INSERT INTO projects
		(
			name,
			description,
			user_id
		)
		VALUES
		(
			$1,
			$2,
			$3
		)
		RETURNING id
		`,
			project.Name,
			project.Description,
			project.UserID,
		).Scan(
			&project.ID,
		)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(
			http.StatusCreated,
			project,
		)
	})

	// UPDATE PROJECT
	protected.PUT("/projects/:id", func(c *gin.Context) {

		id := c.Param("id")

		userID, _ := c.Get("userID")

		var project Project

		if err := c.BindJSON(&project); err != nil {
			return
		}

		_, err := database.DB.Exec(
			context.Background(),
			`
		UPDATE projects
		SET
			name = $1,
			description = $2
		WHERE
			id = $3
		AND
			user_id = $4
		`,
			project.Name,
			project.Description,
			id,
			userID,
		)

		if err != nil {
			c.JSON(
				http.StatusInternalServerError,
				gin.H{
					"error": err.Error(),
				},
			)

			return
		}

		c.JSON(
			http.StatusOK,
			gin.H{
				"message": "Project updated",
			},
		)
	})
	// DELETE PROJECT
	protected.DELETE("/projects/:id", func(c *gin.Context) {

		id := c.Param("id")

		userID, _ := c.Get("userID")

		_, err := database.DB.Exec(
			context.Background(),
			`
		DELETE FROM projects
		WHERE
			id = $1
		AND
			user_id = $2
		`,
			id,
			userID,
		)

		if err != nil {

			c.JSON(
				http.StatusInternalServerError,
				gin.H{
					"error": err.Error(),
				},
			)

			return
		}

		c.JSON(
			http.StatusOK,
			gin.H{
				"message": "Project deleted",
			},
		)
	})
}
