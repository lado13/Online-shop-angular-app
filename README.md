# Angular Online Shop

Welcome to the Angular Online Shop! This project is a web application built with Angular, serving as an online shopping platform where users can browse products, add them to their cart, and complete purchases.



## Installation

1. **Clone the Repository**:
   - Open the command prompt or terminal.
   - Run the following command to clone the repository:
     ```
     git clone https://github.com/your-username/your-angular-online-shop.git
     ```

2. **Set Up Angular App**:
   - Navigate to the cloned repository directory:
     ```
     cd your-angular-online-shop
     ```
   - Install Angular CLI globally if not already installed:
     ```
     npm install -g @angular/cli
     ```
   - Install project dependencies:
     ```
     npm install
     ```

3. **Open Visual Studio Code**:
   - Launch Visual Studio Code.
   - Open the cloned repository in Visual Studio Code:
     ```
     code .
     ```

4. **Replace Angular App Sources**:
   - In the newly opened Angular app in Visual Studio Code, remove the existing Angular project sources (if any).
   - Copy and paste the sources from the cloned repository into the Angular app directory.
  
5. **
When enabling the Online Web API, it's important to ensure that its localhost endpoint matches the endpoints of services in the Angular application. If they do not match, you'll need to specify the localhost address where the Web API will be running.

 **Update Angular Environment Configuration**:
- Open the `environment.ts` file in the Angular project (`src/environments/environment.ts`).
- Update the `apiUrl` property to match the localhost address where the Web API will be running. For example:
  ```typescript
  export const environment = {
    production: false,
    apiUrl: 'http://localhost:5000/api' // Update this URL
  };
  ```

 **Update Web API Host Address**:
- When running the Online Web API locally, ensure that it is hosted on the correct localhost address.
- If the default localhost address (e.g., `http://localhost:5000`) is not suitable, specify the desired localhost address in the Web API project settings or launch configuration.

By ensuring that the localhost addresses of the Web API and the Angular application match, you can seamlessly integrate the frontend with the backend services.
   - 

6. **Run the Application**:
   - In the terminal within Visual Studio Code, start the Angular development server:
     ```
     ng serve -o
     ```
   - This command compiles the application and opens it in the default web browser.

