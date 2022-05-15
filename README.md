# Admin_web_panel
 Admin web panel for fivem Servers ESX


# INSTALLATION

## Requirements
> **FiveM**
> **ESX**
> **NodeJS** (**FIVEM PREINSTALLED**)
> **MySQL**

## Configure your server

first configure settings.json

```json
{
    "website": {
        "support": "https://discord.gg", // Discord server
        "domain" : "http://localhost" // Change this to your domain and add port if needed
    },
    "config": {
        "port": 80, // Port to run the server on
        "callback": "http://localhost/callback", // change localhost to your domain and add port if needed and set callback in discord developer portal
        "clientID": "CLIENT_ID_FOR_DISCORD_APP",
        "secret": "SECRET_FOR_DISCORD_APP"
    },
    "debug": true, // Set to true to see debug messages

    "esx_groups": ["superadmin", "admin", "user"] // List of groups for esx
    
}

```


## Put script in resources folder and run it 

add in your server.cfg file:
```
start Admin_web_panel
restart Admin_web_panel

```	

then enter your domain and configure the panel with the requested data and restart the server the script
you will get an error that a table is not found but don't worry as the script inserts it automatically
and if you like you can restart the script again

## to add a new user admin
    
    add discord ID to the user in the admins array 
    example

    before

    ```json

    {"admins": ["discordID"]}
    
    ```
    after

    ```json

    {"admins": ["discordID", "discordID2"]}
    
    ```

## What is the code is obfuscated?

the code is obfuscated to prevent people from getting the code and use it to hack your server