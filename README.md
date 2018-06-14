# Amsta
Angular Web Application for the company Amsta Amsterdam.



![alt text](hero.png)



## Getting Started

To see the application there are some things that needs to be configured before running it.
So please follow to following document. If you want to further develop the application, see: development.


### Prerequisites

A way to host the database and web application itself.

```
A phpmyadmin environment was used to host the database during testing and release.
We connected this with an PHP api to the application running angular. 
```

Install and configure the SQL host.

```
See: for the settings for the host.
```




### Installing
When you have an SQL Host.

Step 1) Creating the database.

```
Run the CreateDB.sql file in your sql host.
```

Step 2) Configuring the connection.

```
See:  src/app/services/xxxx  and change line:18 of the services.ts files 
                                  (\/ the dots below)
      private xxxxUrl = 'https://..../api/xxxx.php';  // URL to web api
```


Step 3) Run the application.

```
For getting the user passwords see: /doc/manual.pdf 
```



### More information

See: /doc/manual.pdf 
For the entire installation and configuring process and a (almost)full manual of the application.




### Development
Before developing the application you'll need some things installed.

The easiest way of installing the needed libaries, compilers etc etc is by node.js package manager. Download link:
[Node.js](https://nodejs.org/en/) 

>(Link to [npm](https://www.npmjs.com)) for documentation


Than you will need to install [Angular Cli](https://github.com/angular/angular-cli).
 > See the readme for install process 
 
 > Note: it IS NOT needed to create a new Project !

After you have installed angular Cli you're almost done.

Get this repository to your local drive (preferred with git access)

And type the following command:

```text
  cd ROUTE_TO_YOUR/Amsta
  ng serve --open
```

Now the application is running and you can start developing.




### Usage
Currently the application isn't public available.





## Built with 
* [HTML 5](https://www.w3schools.com/html/) - To get some basic markup and text done
* [CSS 3](https://www.w3schools.com/css/) - So the html markup has some styling
* [Bootstrap 4](https://v4-alpha.getbootstrap.com) - So we don't have to reinvent the 'css' wheel 100*
* [JavaScript](https://www.javascript.com) - For getting some interaction on the web app
* [TypeScript](https://www.typescriptlang.org/index.html) - For bringing the OOP principals to javascript 
* [Angular](https://angular.io) - JavaScript Framework to let our web app really rock! 
* [PHP](http://www.php.net) - So we can get data trough a API from our database in Json format.
* [MySQL / PHPmyAdmin](https://www.mysql.com/) - For the database 
* [IntelliJ Idea](https://www.jetbrains.com/idea/) - In what we developed the (start) application.

# Dependencies/ Libraries 




## Built By

* **Thijs Zijdel** 


## Project Files
- app/Amsta			(folder for application)
	- /paths/ 				(for info, send me a message)				

- data 						(folder for db dummy data)
	- CreateDB.sql 			(sql create dummy database query)


- doc 						(folder for documentation)
	- Manual.pdf 			(full manual, inc. installation)
		


## License

This project is licensed under the MIT License - look at [LICENSE.md](LICENSE.md) file for details.
