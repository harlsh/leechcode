package handlers

import (
	"fmt"
	"net/http"
	"os"

	"leechcode/db"

	"github.com/gin-gonic/gin"
)

// Struct is used to give a skeleton to the receiveing data from the piston api
type SupportLanguage struct {
	Language string   `json:"language"`
	Version  string   `json:"version"`
	Aliases  []string `json:"aliases"`
}

func sendErrorIfNotNill(err error, context *gin.Context) {
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
}

func GetAllCompilers(context *gin.Context) {
	var url string = "http://" + os.Getenv("PISTON_CONTAINER") + "/api/v2/runtimes"
	response, err := http.Get(url)

	sendErrorIfNotNill(err, context)
	if err != nil {
		return
	}

	b, err := io.ReadAll(response.Body)

	sendErrorIfNotNill(err, context)
	if err != nil {
		return
	}

	var supportLanguages []SupportLanguage
	json.Unmarshal(b, &supportLanguages)

	sendErrorIfNotNill(err, context)
	if err != nil {
		return
	}

	context.JSON(http.StatusOK, gin.H{"result": supportLanguages})
}

func PostSubmission(context *gin.Context) {

	fmt.Print("hello ni")
	var input db.Solution
	err := context.ShouldBindJSON(&input)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
	}
	client := piston.CreateDefaultClient()
	output, err := client.Execute(input.Language, input.Version, []piston.Code{{Content: input.Code}})

func PostSubmissionAndGetResults(context *gin.Context) {
	var input db.Solution

	err := context.ShouldBindJSON(&input)
	sendErrorIfNotNill(err, context)
	if err != nil {
		return
	}

	// // creating an entry in the db
	// db.DB.Create(input)

	context.JSON(http.StatusOK, gin.H{"output": output})
	// TODO: implement the following
	// get the test case

	// calling the piston service to obtain result

	// var url string = "http://" + os.Getenv("PISTON_CONTAINER") + "/api/v2/runtimes"

	// create an entry of the executed result and return to in the api

}
