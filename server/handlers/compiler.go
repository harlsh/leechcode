package handlers

import (
	"fmt"
	"net/http"

	"leechcode/db"

	"github.com/gin-gonic/gin"

	piston "github.com/milindmadhukar/go-piston"
)

func GetAllCompilers(context *gin.Context) {

	client := piston.CreateDefaultClient()
	runtimes, err := client.GetRuntimes()
	if err != nil {
		context.JSON(http.StatusNoContent, gin.H{})
		return
	}
	context.JSON(http.StatusOK, runtimes)
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

	if err != nil {
		context.JSON(http.StatusNotFound, gin.H{"message": "Couldn't connect to piston"})
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
