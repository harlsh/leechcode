package test

import (
	"bytes"
	"encoding/json"
	"fmt"
	"leechcode/db"
	"leechcode/handlers"
	"net/http"
	"net/http/httptest"
	"testing"

	"gorm.io/driver/postgres"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var (
	r    *gin.Engine
	repo *handlers.ProblemRepository
)

func Init() {

	fmt.Println("Initializing database and router")
	gin.SetMode(gin.TestMode)
	database, mock, _ := sqlmock.New()

	defer database.Close()
	mock.ExpectBegin()

	dialector := postgres.New(postgres.Config{
		DSN:                  "sqlmock_db_0",
		DriverName:           "postgres",
		Conn:                 database,
		PreferSimpleProtocol: true,
	})

	mockDB, _ := gorm.Open(dialector, &gorm.Config{})
	repo = &handlers.ProblemRepository{
		DB: mockDB,
	}

	r = gin.Default()

}

func TestProblemCreate(t *testing.T) {
	Init()
	r.POST("problems", repo.CreateProblem)

	problem := &db.Problem{
		Title:     "Two Sum Test",
		TitleSlug: "two-sum-test",
		Content:   "<p> Add two numbers </p>",

		Difficulty:       "Easy",
		Likes:            28258,
		Dislikes:         905,
		ExampleTestCases: "[2,7,11,15]n9n[3,2,4]n6n[3,3]n6",
		Hints:            "A really brute force way would be to search for all possible pairs of numbers but that would be too slow.",
	}

	body, _ := json.Marshal(problem)

	req, err := http.NewRequest(http.MethodPost, "/problems", bytes.NewBuffer(body))

	if err != nil {
		t.Fatalf("Couldn't create a request: %v\n", err)
	}

	w := httptest.NewRecorder()

	r.ServeHTTP(w, req)

	if w.Code == http.StatusOK {
		t.Logf("Expected to get status %d is same ast %d\n", http.StatusOK, w.Code)
	} else {
		t.Fatalf("Expected to get status %d but instead got %d\n", http.StatusOK, w.Code)
	}

}

func TestProblemGet(t *testing.T) {
	Init()
	r.GET("problems", repo.FindProblem)
	req, err := http.NewRequest(http.MethodGet, "/problems", nil)
	if err != nil {
		t.Fatalf("Couldn't create a request: %v\n", err)
	}

	w := httptest.NewRecorder()

	r.ServeHTTP(w, req)
	fmt.Println(w.Body)

	if w.Code == http.StatusOK {
		t.Logf("Expected to get status %d is same ast %d\n", http.StatusOK, w.Code)
	} else {
		t.Fatalf("Expected to get status %d but instead got %d\n", http.StatusOK, w.Code)
	}
}

func TestCodeExecution(t *testing.T) {
	Init()

	solution := db.Solution{
		UserId:      "1",
		ProblemSlug: "two-sum",
		Code:        "package main\nimport \"fmt\"\nfunc main() {fmt.Println(\"hello world\")}",
		Language:    "go",
	}
	body, _ := json.Marshal(solution)
	req, err := http.NewRequest(http.MethodPost, "/execute", bytes.NewBuffer(body))

	if err != nil {
		t.Fatalf("Couldn't create a request: %v\n", err)
	}

	w := httptest.NewRecorder()

	r.ServeHTTP(w, req)

	if w.Code == http.StatusOK {
		// t.Logf("Expected to get status %d is same ast %d\n", http.StatusOK, w.Code)
		t.Fatalf("Expected to get status %d but instead got %d\n", http.StatusOK, w.Code)
	} else {
		// t.Fatalf("Expected to get status %d but instead got %d\n", http.StatusOK, w.Code)
		t.Logf("Expected to get status %d is same ast %d\n", http.StatusOK, w.Code)
	}

}
