package handlers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"leechcode/db"

	piston "github.com/milindmadhukar/go-piston"
)

type ProblemRepository struct {
	DB *gorm.DB
}

func (p *ProblemRepository) FindProblem(c *gin.Context) {
	var problems []db.Problem
	p.DB.Find(&problems)
	c.JSON(http.StatusOK, problems)
}

func (p *ProblemRepository) FindProblemBySlug(c *gin.Context) {
	var problem db.Problem

	id := c.Param("id")

	err := p.DB.Find(&problem, "title_slug = ?", id).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		c.JSON(404, gin.H{"data": nil})
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
	context.JSON(http.StatusOK, input)
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
	c.JSON(http.StatusOK, input)
}

func (p *ProblemRepository) DeleteProblem(c *gin.Context) {
	id := c.Param("id")
	var deletedProb db.Problem
	p.DB.Where("title_slug = ?", id).Delete(&deletedProb)
	c.JSON(http.StatusOK, deletedProb)
}

func (p *ProblemRepository) GetSubmissions(c *gin.Context) {
	var solutions []db.Solution
	err := p.DB.Find(&solutions, "user_id = ?", c.Param("id")).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		c.JSON(404, gin.H{})
		return
	}
	c.JSON(http.StatusOK, solutions)
}

func (p *ProblemRepository) GetAllCompilers(context *gin.Context) {

	client := piston.CreateDefaultClient()
	runtimes, err := client.GetRuntimes()
	if err != nil {
		context.JSON(http.StatusNoContent, gin.H{})
		return
	}
	context.JSON(http.StatusOK, runtimes)
}

func (p *ProblemRepository) ExecuteCode(context *gin.Context) {
	var input db.Solution

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	problemSlug := input.ProblemSlug
	var problem db.Problem
	err := p.DB.Find(&problem, "title_slug = ?", problemSlug).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		context.JSON(404, gin.H{"data": nil})
		return
	}

	client := piston.CreateDefaultClient()
	output, err := client.Execute(input.Language, "", // Passing language. Since no version is specified, it uses the latest supported version.
		[]piston.Code{
			{Content: input.Code},
		}, // Passing Code.
		piston.Stdin(problem.ExampleTestCases), // Passing input as "hello world".
	)
	if err != nil {
		return
	}
	// creating an entry in the db
	p.DB.Create(&input)

	context.JSON(http.StatusOK, gin.H{"data": output, "testcases": problem.ExampleTestCases})

}
