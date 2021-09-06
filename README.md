# BACKEND
## dependencies
npm init
npm install express mysql dotenv
npm install --save-dev nodemon
npm install --save-dev concurrently
npm install bcrypt cors jsonwebtoken

## script list to add at backend/package.json
"start"			: "node app/server.js",
"back_start"	: "nodemon app/server.js",
"front_build"	: "cd ../frontend && npm run build",
"front_start"	: "cd ../frontend && npm run start",
"front_restart"	: "npm run front_build && npm run front_start"


# FRONTEND
## creation
npx create-react-app client
## dependencies
npm install react-router-dom react-hook-form axios jwt-decode bcryptjs uuid

# add this line in frontend/package.json to connect the front with the back
**Note: this addr must be the same as our backend addr**
"proxy": "http://localhost:4000",
