package db

import (
	"gorm.io/gorm"
)

type Solution struct {
	gorm.Model
	UserId      string `json:"userId"`
	ProblemSlug string `json:"problemSlug"`
	Language    string `json:"language"`
	Version     string `json:"version"`
	Code        string `json:"code"`
	Status      bool `json:"status"`
}
