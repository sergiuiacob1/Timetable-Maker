#Api

Start all the services
```
docker-compose up
```

Utils:
docker-compose up --force-recreate
docker-compose build --no-cache
docker-compose down

##Port: 2222

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
