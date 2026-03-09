# fullstack app

Explain your service in here. This is fulltsack project related Payment using golang as backend and nuxt as frontend....

list of tools version of your machine:

```bash
go version go1.25.5 darwin/arm64
node v24.13.1
```

Install all related requirements:

```bash
go mod tidy
npm run install
```

How to run backend server on local:

```bash
go mod tidy
```

How to run backend server on production build:

```bash
make dep
make openapi-gen
make run
```

How to run frontend on local:

```bash
create .env file then add VITE_BASE_API=http://localhost:8080
npm run dev
then open http://localhost:5173
```

How to run frontend on production build:

```bash
docker build --build-arg VITE_BASE_API=http://localhost:8080 -t fe-durianpay . && docker run -d -p 5173:80 --name frontend-container fe-durianpay
then open http://localhost:5173

if there's conflict container already use, please run first:
docker rm -f frontend-container
```

To checking openapi documentations, you can visit this url after backend running.

```bash
Add here
```

Login to frontend by visiting:

```bash
http://localhost:5173/auth/login and input account

user:
operation@test.com
cs@test.com

pass: password
```

evidences: Add video evidences of your service
see backend [README.md](backend/README.md)
see frontend [README.md](frontend/README.md)
