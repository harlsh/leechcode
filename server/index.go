package main

import (
	"leechcode/db"
	"leechcode/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func RunRouter() {
	gin.ForceConsoleColor()
	router := gin.Default()
	router.Use(cors.Default())
	db.ConnectDatabase()

	repo := &handlers.ProblemRepository{	
		DB: db.DB,
	}

	routerGroup := router.Group("/api/v1")

	routerGroup.GET("problems", repo.FindProblem)
	routerGroup.GET("problems/:id", repo.FindProblemBySlug)
	routerGroup.POST("problems", repo.CreateProblem)
	routerGroup.PUT("problems/:id", repo.UpdateProblem)
	routerGroup.DELETE("problems/:id", repo.DeleteProblem)

	routerGroup.POST("solution", handlers.SubmitSolution)

	routerGroup.GET("compilers", repo.GetAllCompilers)
	routerGroup.POST("execute", repo.ExecuteCode)

	routerGroup.GET("submissions/:id", repo.GetSubmissions)

	routerGroup.POST("test-case", handlers.CreateTestCase)
	routerGroup.GET("test-case/:id", handlers.GetTestCase)
	routerGroup.GET("test-cases", handlers.GetTestCases)

	router.Run()
}
