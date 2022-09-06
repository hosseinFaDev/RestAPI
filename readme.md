# RestAPI
**wellcome**


**The following items and technology are used in this project :**

 - express
 - mongoose
 - JWT

**please set your database and other system configs in  .env file**
**for add user no need to authentication token but after create a user you need to generate a valid token**
**don't forget in header add "authentication" and set your token "bearar +your genrated token" for have access**
end point's ares:

 - for create a new User send a post request(need :first and last name ,email,mobile) to : http://HOST/api/v1/user
 - for get token send a get request and add email and mobile to body request : http://HOST/api/v1/session/new
 - for get User's list  send a get request(need authentication token) to : http://HOST/api/v1/user
 - for update User data send a patch or put request(need authentication token) to : http://HOST/api/v1/user
 - for delete User data send a delete request(need authentication token) to : http://HOST/api/v1/user


**this project is just for test and this is not for production**

