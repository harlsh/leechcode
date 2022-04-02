package db

import "gorm.io/gorm"

type Problem struct {
	gorm.Model
	Title            string `json:"title"`
	TitleSlug        string `json:"titleSlug"`
	Content          string `json:"content"`
	Difficulty       string `json:"difficulty"`
	Likes            int    `json:"likes"`
	Dislikes         int    `json:"dislikes"`
	ExampleTestCases string `json:"exampleTestCases"`
	Hints            string `json:"hints"`
}
