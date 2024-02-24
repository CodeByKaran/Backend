class ApiResponse{
  constructor(
    statusCode=200,
    data={},
    message="Successfully Done",
    success=true
  ){
    this.statusCode =statusCode
    this.data=data
    this.message=message
    this.success=success
  }
}


export {ApiResponse}