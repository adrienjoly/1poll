# 1poll

A simple doodle-like poll component that makes it easy for contributors to add more options.

## Component API reference

### Properties

- `options`: an Array of Objects that accept the following fields:
  - `name`: (String) name of the option, seen as a checkbox.
  - `defaultChecked`: (Boolean) true if the checkbox should be checked initially.
- `onNewOption`: Function({ name: String, defaultChecked: Boolean }) that should update the `options` property.
- `onSelectionChange`: Function([ { name: String, checked: true } ]) passes an Array of option Objects (as in the `options` property), which are currently selected (i.e. have their `checked` field set to true).
- `labelStyle`: an optional Object to override the inline-style of the Checkbox labels.
