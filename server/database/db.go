package database

import (
	"context"
	"os"

	"github.com/jackc/pgx/v5"
)

var DB *pgx.Conn

func ConnectDB() error {
	var err error

	DB, err = pgx.Connect(
		context.Background(),
		os.Getenv("DATABASE_URL"),
	)

	return err
}
