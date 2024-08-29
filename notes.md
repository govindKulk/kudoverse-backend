## 1. Setup Node + TS
1. Setup the node project
`` npm init -y ``

2. Install the development dependencies:
`` $ npm i -D typescript @types/node ts-node nodemon ``

3. Setup the tsconfig.json

```    
    {
        "compilerOptions": {
            "module": "NodeNext",
            "baseUrl": "src",
            "outDir": "dist",
            "noImplicitAny": true,
            "sourceMap": true
        },
        "include": [
            "src/**/*"
        ]
    }
```

4. Setup nodemon.json
```
{
    "watch": ["src"],
    "ext": ".ts,.js",
    "exec": "ts-node ./src/index.ts"
}
```