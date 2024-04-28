<h1 align=center>Sandwich App</h1>


## 🚀 Getting Started


### 👉 First things first

```bash
Clone the repository
```
###

### 👉 Setting up Backend

```bash
Go to project directory in terminal
Run "docker compose up"
```
###

### 👉 Setting up Frontend

```bash
Open up another terminal 
Direct to frontend (cd frontend/frontend-app)
Then run "npm run start"
```
###

### 👉 Process explained

```bash
"docker compose up" will open up following servers
Server-A -> http://localhost:3001
Server-B -> http://localhost:3002
RabbitMQ dashboard -> http://localhost:15672

"npm run start" will open up following server
React FrontEnd -> http://localhost:3000
```
###

### 📦 First add some sandwich types to system

- Login as Admin with following credetials (username - admin, password - password)
- Add any amount sandwiches you want as the admin. (Only admin can add sandwiches)
- After add, you will see sandwich types and you can view more details
- Also you can modify and delete sandwiches
- Then logout from admin

### 📦 Lets order sandwich

- Now go to Register and register as a customer
- Now you can order any sandwich as a customer which admin added to the system
- You can see details of the sandwich by pressing more details
- Press order to make an order
- After you press order, order will come under my orders with status of ordered
- Within 10 seconds your order will be prepared and status will be updated.
- Feel free to order sandwiches as much as you want 😉
- Then logout. If you want you can log back in with registered credentials

### 📦 Now register as another customer

- Now go to Register and register as a new customer
- When you log in you will see only your orders (But as you are a new user, there will be no orders)
- Specific user may see only his/her orders
- Now you can order again 
- Then logout

### 📦 Log back as admin

- Use the admin credentials (username - admin, password - password)
- Now you will see all two customers total orders

###

####
