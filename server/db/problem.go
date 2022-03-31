package db

import "gorm.io/gorm"

type Problem struct {
	gorm.Model       `json:"-"`
	Title            string `json:"title"`
	TitleSlug        string `json:"titleSlug"`
	Content          string `json:"content"`
	Difficulty       string `json:"difficulty"`
	Likes            int    `json:"likes"`
	Dislikes         int    `json:"dislikes"`
	ExampleTestCases string `json:"exampleTestCases"`
	Hints            string `json:"hints"`
}

type CodeSnippet struct {
	gorm.Model `json:"-"`
	Lang       string `json:"lang"`
	LangSlug   string `json:"langSlug"`
	Code       string `json:"code"`
}
