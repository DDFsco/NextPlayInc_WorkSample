## Authentication Middleware Usage

1. In your routes file, import `isAuthenticated` from `src/user/middlewares/auth

    example: ```import isAuthenticated from '../user/middlewares/auth' ```


2. Add the middleware function before the handler function for every access controlled route.

    example: ```router.get('/api/foo', isAuthenticated, fooHandler);  ```

3. Ensure each request to this route contains a valid JWT token in the Authorization header.

    header format: `key = Authorization`, `value = Bearer {your_token}`

4. Your handler `fooHandler` will be called if the authentication is successfull, otherwise it will return a 400 for Invalid token or 401 for no token.

5. To access the user id inside `fooHandler`. Change type of request to `RequestWithUserID`.

    example: 
    ```
    import RequestWithUserId from '../user/middlewares/auth'
    
    function fooHandler(req: RequestWithUserId, res: Response) { 
        console.log(req.user);
    } 
    
    ```