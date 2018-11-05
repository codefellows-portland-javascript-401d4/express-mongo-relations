# READ ME
## AUTHORS ROUTE 
  ** *NOTE:* ** *For best results use Postman.*

### List Authors:  
1. Type `api/authors` after hostname in nav bar and hit return
1. To filter list by name, add `?` operator plus `name=<Author Name>`
1. To filter list by century, e.g, '19th', etc., `?` plus `centuries=<century ordinal>`

### List Author by ID:  
1. After `api/authors`, include author's `_id` number without quotes as listed in author search
  * Author's works will be listed along with other data

### Add Author (Postman or other full-fledged REST client required):  
1. Select POST method in client
1. Enter `api/authors` as ROUTE
1. Enter Author data as JSON string in request body; following fields required:
  * Name
  * Centuries 
1. Hit send

### Update Author  
1. Select PUT method
1. Use `api/authors/` and append Author's `_id` number
1. Enter desired field names and values to change in request body as JSON string
1. Hit send

### Delete Author  
1. Same as listing by ID, but select DELETE method in REST client rather than GET
  * DB will return copy of document just deleted  


## BOOKS ROUTE 
### List Books:  
1. Type `api/books` after hostname in nav bar and hit return
1. To filter list by title, add `?` operator plus `title=<Full Book Title>`
1. To filter list by author, e.g, 'Samuel Clemens', etc., `?` plus `author=<Author Name>`
1. To filter list by genre, e.g., 'novel', 'science-fiction', etc., add `?` operator plus `genres=<genre-1 genre-2 ...>`

### List Book by ID:  
1. After `api/books`, include book's `_id` number without quotes as listed in author search
  * Books will be listed with both published author name and name on linked DB author document (e.g., 'Mark Twain' for books published under the name 'Samuel Clemens')

### Add Book (Postman or other full-fledged REST client required):  
1. Select POST method in client
1. Enter `api/books` as ROUTE
1. Enter book data as JSON string in request body; following fields required:
  * Title 
  * Author 
  * authId from related author document 
1. Hit send

### Update Book  
1. Select PUT method
1. Use `api/books/` and append Book's `_id` number
1. Enter desired field names and values to change in request body as JSON string
1. Hit send

### Delete Book  
1. Same as listing by ID, but select DELETE method in REST client rather than GET
  * DB will return copy of document just deleted