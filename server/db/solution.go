package db

import (
	"gorm.io/gorm"
)

type Solution struct {
	gorm.Model
	UserId    string `json:"userId"`
	ProblemId string `json:"problemId"`
	Code      string `json:"code"`
	Language  string `json:"language"`
}
