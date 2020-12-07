## **REMD** 

------

`Microservices written in typescript, Async event based communication using NATS Streaming Server`

### **Technologies** 

- ***Docker ,Kubernetes, Skafold, Nginx-Ingress* ,[Docker Images](https://registry.hub.docker.com/search?q=gyan0621&amp;type=image)**
- ***Typescript***
- ***Node* , *NEXT js (SSR UI)* [My NPM common module](https://www.npmjs.com/package/@gyan0621/common2)**
- ***redis (using tedis), mongodb, update-if-current (tackles version issue of data replication)***
- ***NATS Streaming Server***
- ***JWT*, *BULL js(Messaging Queue)***

------

### **Problem Trying to Solve**

**All we want in our free time is to get some interesting read like good articles but we don't want to go through pain of finding one. The tool solves that issue by**

- There are two sections on front page Top liked (25 of the month) and Recents (recently created 25 posts) ,users can come and share links to article other users can upvote them after reading eventually most interesting articles will be on top, saving effort of searching
- Other CRUD operation are also available post created

**We all forget how we solved a particular problem (which made us search web / see others solution), if not revised on particular interval. To solve this**

- Recommended interval to revise is through gap of 1,3,5,7... days. This tool help do the same by building streak and reminding you to revise particular problem  in these interval.
- All users can add multiple problems in there personal space. CRUD operations is available for problem item  

*can be hosted anywhere don't need external apis*

------

### **Microservices**

- Auth
  - user creation, signup,signin,signout
  - MongoDB to store data
- Client
  - Server side rendering with NEXT js 
- expiration
  - Messaging Queue with redis storage
  - Emits events after 25 days to remove posts from lists
- recents
  - manages Top liked queue and recents queue based on events received
  - Redis storage
- personal
  - logic CRUD of problem and reminders in 1,3,5,7.. days interval
  - MongoDB to store data
- posts
  - manages CRUD for Article links and publishes events correspondingly
  - MongoDB to store data

------

### **Folders**

- INFRA/k8s
  - contains all deployments files
- common2
  - Common Event,Errors,validations,functions definitions  and implementations  

------

### Steps to boot 

1. create secret :
   1.  kubectl create secret generic jwt-secret --from-literal=JWT_KEY=MYKEY
2. set ingress timeout
   1. kubectl wait --namespace ingress-nginx --for=condition=ready pod --selector=app.kubernetes.io/component=controller --timeout=120s
3. Apply from here based on provider
   1. https://kubernetes.github.io/ingress-nginx/deploy/

------

### Structure

<img src="https://res.cloudinary.com/gyan0621/image/upload/v1607223407/structure_jpbc88.png" alt="structure" style="zoom: 50%;" />

```
vardhnag
```

