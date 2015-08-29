# Docs

## Todo:
- [ ] Create namespaces
- [ ] Fill the namespaces
- [ ] Create .md template(s)
- [ ] Generate .md files

## Types
* `function`
* `var`
* `description`

Function:
> When the `@param` tag is used, the type will become `function`.
```js
/**
 * [title]
 * @param {type} name - description
 * @return {type} description
 * 
 */
```

Variable:
> When the `@var` tag is used without the `@param` tag, the type will become `variable`.
```js
/**
 * @var {type} name - description
 */
```


Description:
> When the `@description` tag is used without the `@param` and/or the `@var` tag, the type will become `description`.
```js
/**
 * [title]
 * @description description
 */
```

## Sections.
You can split you code into sections.

* Start a section: `@section [title]`
* End the section: `@sectionEnd`

## Params
### `@var`  
`@var {type} name - description`


### `@namespace`  


### `@description`  


### `@name`  
`@name name`

### `@private`  


### `@public` 


### `@deprecated`  
> You can use v for version and/or c for commit.

`@deprecated v0.2 - description`   
`@deprecated c962c23b5b754ef0a92bfd88619f6bef25bc16ada - description`

### `@param`  


### `@return` 


### `@used` 


### `@note`  


### `@important` 

### `@warning`
