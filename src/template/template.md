# [name]
> [namespace]

[description]

## Variables
**Public**
[@for variables | public]
* `[name]` - [type] - [description]
[@endfor]

**Private**
[@for variables | private]
* `[name]` - [type] - [description]
[@endfor]

## Functions
### Public
[@for functions | public]
#### `[name]` [@if deprecated] Deprecated [@endif]
> Deprecated: [?deprecated]
> Important: [?important]
> Warning: [?warning]
> Note: [?note]

[description]
[@for param]
* `[name]` - [type] - [description]
[@endfor]
[@newline]
[@endfor]

### Private
[@for functions | private]
#### `[name]`
> Deprecated: [?deprecated]
> Important: [?important]
> Warning: [?warning]
> Note: [?note]

[description]
[@for param]
* `[name]` - [type] - [description]
[@endfor]
[@newline]
[@endfor]
