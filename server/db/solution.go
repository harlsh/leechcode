package db

import (
	"gorm.io/gorm"
)

type Solution struct {
	gorm.Model
	UserId    string `json:"user_id" gorm:"foreignKey:ID;references:User;"`
	ProblemId string `json:"problem_id"`
	Language  string `json:"language"`
	Version   string `json:"version"`
	Code      string `json:"code"`
}
