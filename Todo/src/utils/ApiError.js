class ApiError{
  constructor(
    statusCode=400,
    message="something went wrong",
    success=false
    ){
      this.statusCode=statusCode
      this.message=message
      this.success=success
    }
}

export {ApiError}