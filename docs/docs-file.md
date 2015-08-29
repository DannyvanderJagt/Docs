# File
> docs/file

File

## Variables
**Public**

-

**Private**

-

## Functions
### Public
#### `constructor` 

Stores and prepares.
* `path` - String - The path to the file.

&nbsp;

#### `_processComment` 

Process each comment and abstract everything we want to know.
* `string` - String - The comment.

&nbsp;

#### `cleanCommentString` 

Remove any noise from comment string and split the comment into an array.
* `string` - String - The comment.

&nbsp;


### Private
#### `_getFile`

Get the contents of a file.
* `path` - String - The path to the file.

&nbsp;

#### `_getComments`

Abstract all the comments from the contents of the file.
* `contents` - String - The contents of the file.

&nbsp;

