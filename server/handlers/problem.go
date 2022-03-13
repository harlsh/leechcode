package handlers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"leechcode/db"
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
