{"functions":{"public":[{"description":"Abstract the tags and the data from a commentline.","name":"abstract","param":[{"required":true,"type":["String"],"name":"string","description":"A line of a comment."}],"return":[{"type":["Object"]}],"meta":{"id":"wupyas","type":"function","line":16,"path":"/Users/dannyvanderjagt/Github/Docs/src/tags/index.js"}},{"description":"Combine the tag and its result with an object the right way.","name":"combine","param":[{"required":true,"type":["String"],"name":"tag","description":"The tag."},{"required":true,"type":["Any"],"name":"result","description":"The data/result of the tag."},{"required":true,"type":["Object"],"name":"fields","description":"The object where the tag and its data will be added to."}],"return":[{"type":["Object"],"description":"fields"}],"meta":{"id":"wupyas","type":"function","line":38,"path":"/Users/dannyvanderjagt/Github/Docs/src/tags/index.js"}}],"private":[{"description":"Abstract a tag from a string.","private":"true","name":"_abstractTag","param":[{"required":true,"type":["String"],"name":"string","description":"The string / a line of a comment."}],"return":[{"type":["String"],"description":"The tag. "}],"meta":{"id":"wupyas","type":"function","line":82,"path":"/Users/dannyvanderjagt/Github/Docs/src/tags/index.js"}},{"description":"Abstract types from a part of tag. ","private":"true","name":"_abstractTypes","param":[{"required":true,"type":["String"],"name":"typeString","description":"The type of a tag string."}],"return":[{"type":["Array<String>"],"description":"All the founded types in Array format."}],"meta":{"id":"wupyas","type":"function","line":93,"path":"/Users/dannyvanderjagt/Github/Docs/src/tags/index.js"}}]},"variables":{"public":[],"private":[]},"used":[],"generic":[],"description":"Handles everything where tags are involved.","name":"docs","namespace":"docs/tags"}