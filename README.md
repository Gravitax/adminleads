# BACKEND
## dependencies
npm init
npm install express mysql dotenv bcrypt cors jsonwebtoken
npm install --save-dev nodemon concurrently

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
npm install react-router-dom react-hook-form axios jwt-decode bcryptjs uuid react-datepicker react-spinners
npm install xlsx file-saver

# add this line in frontend/package.json to connect the front with the back
**Note: this addr must be the same as our backend addr**
"proxy": "http://localhost:4000",
