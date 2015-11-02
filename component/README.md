# 1poll

A simple doodle-like poll component that makes it easy for contributors to add more options.

## Component API reference

### Properties

- `options`: an Array of Objects that accept the following fields:
  - `name`: (String) name of the option, seen as a checkbox.
  - `defaultChecked`: (Boolean) true if the checkbox should be checked initially.
- `onSubmit`: a Function that will be called when the user clicks the Submit button.

### Events

- `submit`: fired when the user clicks the Submit button.
