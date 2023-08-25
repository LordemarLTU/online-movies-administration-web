## Prerequisites
Before you begin, make sure you have the following software installed on you computer:
* Node.js: [Download and Install Node.js](https://nodejs.org/en/download).
* .NET 7.0 Core SDK: [Download and Install .NET Core SDK](https://dotnet.microsoft.com/en-us/download).

## Getting Started
### Clone the repository:
Open your terminal or command prompt and run the following command to clone the repository:
```bash
git clone https://github.com/your-username/project-name.git
```

### Fron-end Setup (Vite React):
Navigate to the **`front-end`** directory of the cloned repository:
``` bash
cd project-name/front-end
```
Install the required Node.js package:
```bash
npm install
```
### Back-end Setup (ASP.NET 7.0 Core)
Navigate to the **`back-end`** directory of the cloned repository:
```bash
cd ../back-end
```
Restore the ASP.NET Core dependencies:
```bash
dotnet restore
```

## Run the Application
**Front-end:** in the **`front-end`** directory, start the development server:
```bash
npm run dev
```

**Back-end:** in the **`back-end`** directory, start ASP.NET Core application:
```bash
dotnet run --launch-profile https --environment Development
```

## Access the Application
Once both the front-end and back-end servers are running, you can access the application in your web browser at **`https://localhost:7176/app`**
