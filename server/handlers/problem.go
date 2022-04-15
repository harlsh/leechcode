package handlers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"leechcode/db"
	gopiston "leechcode/piston"
)

type ProblemRepository struct {
	DB *gorm.DB
}

type SupportLanguage struct {
	Language string   `json:"language"`
	Version  string   `json:"version"`
	Aliases  []string `json:"aliases"`
}

func (p *ProblemRepository) FindProblem(c *gin.Context) {
	var problems []db.Problem
	p.DB.Find(&problems)
	c.JSON(http.StatusOK, problems)
}

func (p *ProblemRepository) FindProblemBySlug(c *gin.Context) {
	var problem db.Problem
	id := c.Param("id")

	err := p.DB.First(&problem, "title_slug = ?", id).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		c.JSON(404, nil)
		return
	}
	c.JSON(http.StatusOK, problem)
}

func (p *ProblemRepository) CreateProblem(context *gin.Context) {
	var input db.Problem

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	p.DB.Create(&input)
	context.JSON(http.StatusOK, gin.H{"data": input})
}

// TODO: Implement the function
func (p *ProblemRepository) UpdateProblem(c *gin.Context) {
	var input db.Problem
	id := c.Param("id")

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var deletedProb db.Problem

	p.DB.Where("title_slug = ?", id).Delete(&deletedProb)

	p.DB.Save(&input)
	c.JSON(http.StatusOK, gin.H{"data": input})
}

func (p *ProblemRepository) DeleteProblem(c *gin.Context) {
	id := c.Param("id")
	var deletedProb db.Problem
	p.DB.Where("title_slug = ?", id).Delete(&deletedProb)
	c.JSON(http.StatusOK, gin.H{"data": deletedProb})
}

func (p *ProblemRepository) GetAllCompilers(context *gin.Context) {
	client := gopiston.CreateDefaultClient()

	runtimes, err := client.GetRuntimes()

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": runtimes})
	}
	context.JSON(http.StatusOK, runtimes)
}

func (p *ProblemRepository) ExecuteCode(context *gin.Context) {
	var input db.Solution

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	client := gopiston.CreateDefaultClient()
	output, err := client.Execute(input.Language, "", // Passing language. Since no version is specified, it uses the latest supported version.
		[]gopiston.Code{
			{Content: input.Code},
		}, // Passing Code.
		gopiston.Stdin("hello world"), // Passing input as "hello world".
	)

	if err != nil {
		return
	}
	// creating an entry in the db
	p.DB.Create(&input)

	context.JSON(http.StatusOK, output)

}
