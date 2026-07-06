const endpointTemplates = {
  "User Management API": [
    {
      name: "GET /users",
      method: "GET",
      url: "/api/users",
      description: "Retrieve all users.",
    },
    {
      name: "GET /users/:id",
      method: "GET",
      url: "/api/users/:id",
      description: "Retrieve a user by ID.",
    },
    {
      name: "POST /users",
      method: "POST",
      url: "/api/users",
      description: "Create a new user.",
    },
    {
      name: "PUT /users/:id",
      method: "PUT",
      url: "/api/users/:id",
      description: "Update an existing user.",
    },
    {
      name: "DELETE /users/:id",
      method: "DELETE",
      url: "/api/users/:id",
      description: "Delete a user.",
    },
  ],

  "Authentication API": [
    {
      name: "POST /login",
      method: "POST",
      url: "/api/login",
      description: "Authenticate user login.",
    },
    {
      name: "POST /register",
      method: "POST",
      url: "/api/register",
      description: "Register a new account.",
    },
    {
      name: "POST /logout",
      method: "POST",
      url: "/api/logout",
      description: "Logout the current user.",
    },
  ],

  "Product API": [
    {
      name: "GET /products",
      method: "GET",
      url: "/api/products",
      description: "Retrieve all products.",
    },
    {
      name: "POST /products",
      method: "POST",
      url: "/api/products",
      description: "Add a new product.",
    },
    {
      name: "DELETE /products/:id",
      method: "DELETE",
      url: "/api/products/:id",
      description: "Delete a product.",
    },
  ],
};

export default endpointTemplates;