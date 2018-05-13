# Api

Start all the services
```
docker-compose up
```

Utils:
docker-compose up --force-recreate
docker-compose build --no-cache
docker-compose down

## Port: 2222

## POST '/authenticate' -> recieve token
```
body {
  username: "test",
  password: "test"
}
```

## POST '/register'
```
body {
  name: "test",
  password: "test",
  mail: "test@test.com",
  amazon_account
}
```

## GET '/api' (affter authentication)
```
//in request
headers {
  x-access-token: 'token'
}
```


## POST /api/update_user

required arguments: old_password, new_password (same as old_password if you don't wanna change it)
optional argument: name, amazon_account


## GET /api/user 
with token: you recieve user info


## GET /api/subjects

token
```
Response: {
	success: true,
	subjects: [
		{
			id: '1',
			name: 'Algoritmi genetici',
			short: 'AG',
			date: '13/12/2018',  // (optionala in cazul in care frequency este 0)
			frequency: 1 // (o data pe sapt)
		}
	]
}
```


## GET /api/rooms

token

```
Response: {
	success: true,
	rooms: [
		{
			id: '1221',
			name: 'C411',
			resources: [
				3, 2, 10
			],
			defaultAvailableHours: [
				{
					zi: 0,
					interval: "8:00-20:00"
				}
			]
			capacity: 40
		}
	]
}
```

## GET /api/resources

token

```
Response: {
	success: true,
	resources: [
		{
			id: 3,
			name: 'Videoproiector'
		},
		{
			id: 10,
			name: 'Aer conditionat'
		}
	]
}
```

## GET /api/groups

token

```
Response: {
	success: true,
	groups: [
		{
			id: 1,
			name: 'IB1',
			number: 30,
			year: 2,
			subjects: [1, 2]
		}
	]
}
```

## GET /api/admin/users

token & admin  
returns array of all users

```
Response: {
	success: true,
	users: [
		{
			id: 1,
			mail: "andrei@gmail.com"
		}
	]
}
```

## POST /api/admin/users

token & admin  
insert new user  

```
Response: {
	success: true
}
```

## GET /api/admin/users/:id

token & admin  
required argument: id  
returns user information  

```
Response: {
	success: true,
	user:
		{
			id: 1,
			mail: "andrei@gmail.com"
		}
}
```