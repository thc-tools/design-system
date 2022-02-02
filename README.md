# DesignSystem

The best design system in the world (or the closest thing anyway) because it is ours :D

## Structure

The design is structure using the atomic design principles

> https://atomicdesign.bradfrost.com/table-of-contents/

The CSS uses the following nomenclature

> https://css-tricks.com/combining-the-powers-of-sem-and-bio-for-improving-css/

## Before hand

You will need to installs the deps at least once

> `npm ci`

## Develop with storybook

Execute the following command:

> `npm run storybook`

## Publish

Execute the following actions:

1. bump the semver in package.json
2. `npm run build`
3. `npm run pub`
