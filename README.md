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
* `@var`
* `@function`
* `@namespace`
* `@description`
* `@name`
* `@title`
* `@private`
* `@public`
* `@deprecated`
* `@param`
* `@return`
* `@used`
