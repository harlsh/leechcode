package db

import (
	"fmt"
	"net/url"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	DB  *gorm.DB
	err error
)

func ConnectDatabase() {
	dsn := url.URL{
		User:     url.UserPassword(os.Getenv("POSTGRES_USER"), os.Getenv("POSTGRES_PASSWORD")),
		Scheme:   "postgres",
		Host:     fmt.Sprintf("%s:%s", os.Getenv("POSTGRES_HOST"), os.Getenv("POSTGRES_PORT")),
		Path:     os.Getenv("POSTGRES_DB"),
		RawQuery: (&url.Values{"sslmode": []string{"disable"}}).Encode(),
	}
	fmt.Println(dsn.String())
	DB, err = gorm.Open(postgres.Open(dsn.String()), &gorm.Config{})
	if err != nil {
		panic(err.Error())
	}
	DB.AutoMigrate(&Problem{})
	DB.AutoMigrate(&TestCase{})
	DB.AutoMigrate(&Solution{})
	DB.AutoMigrate(&User{})
	fmt.Println("Connected to database.")
}

func ClearDatabase() {
	DB.Delete(&Problem{})
	DB.Delete(&TestCase{})
	DB.Delete(&Solution{})
	DB.Delete(&User{})
	fmt.Println("Cleared the database.")
}
