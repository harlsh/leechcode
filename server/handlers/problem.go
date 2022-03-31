package handlers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"

	"leechcode/db"
)

type ProblemRepository struct {
	DB *gorm.DB
}

func (p *ProblemRepository) FindProblem(c *gin.Context) {
	var problems []db.Problem
	p.DB.Find(&problems)
	c.JSON(http.StatusOK, gin.H{
		"data": problems})
}

func (p *ProblemRepository) FindProblemBySlug(c *gin.Context) {
	var problem db.Problem
	codeSnippets := []db.CodeSnippet{

		{
			Lang:     "C++",
			LangSlug: "cpp",
			Code:     "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};",
		},
		{
			Lang:     "Java",
			LangSlug: "java",
			Code:     "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}",
		},
		{
			Lang:     "Python",
			LangSlug: "python",
			Code:     "class Solution(object):\n    def twoSum(self, nums, target):\n        \"\"\"\n        :type nums: List[int]\n        :type target: int\n        :rtype: List[int]\n        \"\"\"\n        ",
		},
		{
			Lang:     "Python3",
			LangSlug: "python3",
			Code:     "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        ",
		},
		{
			Lang:     "C",
			LangSlug: "c",
			Code:     "\n\n/**\n * Note: The returned array must be malloced, assume caller calls free().\n */\nint* twoSum(int* nums, int numsSize, int target, int* returnSize){\n\n}",
		},
		{
			Lang:     "C#",
			LangSlug: "csharp",
			Code:     "public class Solution {\n    public int[] TwoSum(int[] nums, int target) {\n        \n    }\n}",
		},
		{
			Lang:     "JavaScript",
			LangSlug: "javascript",
			Code:     "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    \n};",
		},
		{
			Lang:     "Ruby",
			LangSlug: "ruby",
			Code:     "# @param {Integer[]} nums\n# @param {Integer} target\n# @return {Integer[]}\ndef two_sum(nums, target)\n    \nend",
		},
	}
	id := c.Param("id")

	err := p.DB.Find(&problem, "title_slug = ?", id).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		c.JSON(404, gin.H{"data": "No data"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": problem, "codeSnippets": codeSnippets})
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
