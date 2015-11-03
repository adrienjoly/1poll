# 1poll

A simple doodle-like poll that makes it easy for contributors to add more options.

## Contents

The `gh-pages` branch of this repository contains:

- The project's landing page, as seen on [adrienjoly.com/1poll](http://adrienjoly.com/1poll);
- The `1poll` react component, as defined in [the component subdirectory](https://github.com/adrienjoly/1poll/tree/gh-pages/component);
- A [demo page](http://adrienjoly.com/1poll/demo) to demonstrate the use of the `1poll` component.

## Component API reference

### Properties

- `options`: an Array of Objects that accept the following fields:
  - `name`: (String) name of the option, seen as a checkbox.
  - `defaultChecked`: (Boolean) true if the checkbox should be checked initially.
- `labelStyle`: an optional Object to override the inline-style of the Checkbox labels.
