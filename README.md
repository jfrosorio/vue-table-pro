# vue-table-pro

A Vue component for rendering tables with your datasets.

[![npm](https://img.shields.io/npm/v/vue-table-pro.svg) ![npm](https://img.shields.io/npm/dt/vue-table-pro.svg)](https://www.npmjs.com/package/vue-table-pro)
[![npm](https://img.shields.io/npm/l/vue-table-pro.svg)](https://github.com/jfrosorio/vueTablePro/blob/master/LICENSE)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

---

## Installation
```bash
# NPM
npm install vue-table-pro

# Yarn
yarn add vue-table-pro
```

---

## Usage
Import VueTablePro in the main.js file
```javascript
import Vue from 'vue'
import VueTablePro from 'vue-table-pro'

Vue.use(VueTablePro)
```

Include VueTablePro in your Vue components
```html
<template>
  <VueTablePro :rows="tableData">
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "John Doe",
          age: 21
        },
        {
          name: "Jane Doe",
          age: 21
        }
      ]
    }
  }
}
</script>
```

---

## Attributes
| Attribute 		  | Type  	  | Default 	| Description 														                                      |
|-----------		  |-------	  |---------	|-------------														                                      |
| rows      		  | array     | null    	| [Array of objects](#rows) containing the table data **(required)** 		         |
| columns       	| object    | null      | [Columns](#columns) to show on the table, when `null` it shows all columns	    |
| tableCaption  	| string    | null      | Add table caption            										                               |
| tableHeader   	| boolean   | true      | Show/hide table headers       									                               |
| search        	| object    | null      | Enables table search and contains its [options](#search)						            |
| sortableColumns | boolean   | true      | Make the table columns values sortable (uses sort method)			                  |
| pagination   		| object    | null      | Enables table pagination and contains its [options](#pagination)			           |
| expandable   		| object    | null      | Enables table expandable rows and contains its [options](#expandable) 			     |

### Attribute examples:
<a name="rows"></a>
#### Rows:
```javascript
[
  {
    name: "John Doe",
    age: 21,
    description: "Lorem ipsum dolor sit amet"
  },
  {
    name: "Jane Doe",
    age: 21,
    description: "Lorem ipsum dolor sit amet"
  },
]
```

<a name="columns"></a>
#### Columns:
```javascript
{
  name: "Name",
  age: "Age",
}
```

<a name="search"></a>
#### Search:
```javascript
{
  placeholder: 'Type your search',
  className: 'search-classname',
}
```

<a name="pagination"></a>
#### Pagination:
```javascript
{
  perPage: 15,
  size: 6,
  arrows: true
}
```

<a name="expandable"></a>
#### Expandable:
```javascript
{
  withColumns: ['name', 'age'],
  attachFields: {
    description: 'Description',
  }
}
```


---

## Slots
### Table extra columns:
```html
<VueTablePro :columns="{ edit_column: 'Edit', delete_column: 'Delete' }">
  <a slot="edit_column">Edit</a>
  <a slot="delete_column">Delete</a>
</VueTablePro>
```

### Table search empty results:
```html
<VueTablePro>
  <div slot="search_empty_results">
    <p>No results found.</p>
  </div>
</VueTablePro>
```

---

## License

**vue-table-pro** is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).