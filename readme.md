# DinoBook

Dinosour's network



### Running locally



###### Installing Deno



Shell (Mac, Linux):

```
curl -fsSL https://deno.land/x/install/install.sh | sh
```

PowerShell (Windows):

```
iwr https://deno.land/x/install/install.ps1 -useb | iex
```

Homebrew (Mac):

```
brew install deno
```

Chocolatey (Windows):

```
choco install deno
```

Scoop (Windows):

```
scoop install deno
```

Build and install from source using Cargo

```
cargo install deno
```





##### Installing MongoBD



###### MongoDB Community Edition Installation



| Linux       | https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/      |
| ----------- | ------------------------------------------------------------------------ |
| **macOS**   | **https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/**    |
| **Windows** | **https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/** |



###### Make path /data/db in root directory

In windows :

Navigate to root directory ( C : in windows )
Make folder data
Navigate to C:/data
Make folder db



###### Clone or Download dinoBook's source code from github


[https://github.com/untrulynoxiusmj/dinoBook](https://github.com/untrulynoxiusmj/dinoBook)



Navigate to the directory where you have cloned or downloaded the project 

In terminal, 
deno run --allow-env --allow-read --allow-net --allow-write --allow-plugin --unstable  server.ts


Server will start

Go to 
http://127.0.0.1:4000/
in browser
