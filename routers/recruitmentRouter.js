//For client side:

//1) Get all jobs - /api/job/all, for the response, please refer to the client-side coding tasks.
//2) Apply a job - /api/job/apply (method: Post), this action will add a candidate object to the candidates list of the appropriate career. for the response, please refer to the client-side coding tasks.


//For Back-end management side:

//3) List all jobs - /api/job/list (method: Get, authorization: isLoggedIn), this action will send the all jobs including the candidates information to the owner side.

//4) Update a job - /api/job/update (method: Post, authorization:  isLoggedIn), this action allows the owner update and save a job

//5) Delete a job - /api/job/:jobId (method: Delete, authorization:  isLoggedIn), this action allows the owner delete a job

//6) Post a job - /api/job (method: Post, authorization:  isLoggedIn), this action allows the owner post a job