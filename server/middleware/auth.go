package middleware

import (
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func AuthMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		authHeader := c.GetHeader(
			"Authorization",
		)

		if authHeader == "" {
			c.JSON(401, gin.H{
				"error": "Missing token",
			})
			c.Abort()
			return
		}

		tokenString := strings.TrimPrefix(
			authHeader,
			"Bearer ",
		)

		token, err := jwt.Parse(
			tokenString,
			func(token *jwt.Token) (interface{}, error) {
				return []byte(
					os.Getenv("JWT_SECRET"),
				), nil
			},
		)

		if err != nil || !token.Valid {
			c.JSON(401, gin.H{
				"error": "Invalid token",
			})
			c.Abort()
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)

		if !ok {
			c.JSON(401, gin.H{
				"error": "Invalid token claims",
			})
			c.Abort()
			return
		}

		userID := int64(
			claims["user_id"].(float64),
		)

		c.Set("userID", userID)

		c.Next()
	}
}
