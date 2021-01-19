# Project Name

> NearMiss

Carousel of related and featured product photos for any product a user would browse

## Related Projects

  - https://github.com/Team-Martell/InitialViewAndProductPicCarousel
  - https://github.com/Team-Martell/AboutThisItem
  - https://github.com/Team-Martell/SimilarFeaturedCarousel
  - https://github.com/Team-Martell/RatingsandReviews

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions
First of all, npm i to install all dependencies.

To create the database, you will need to create a copy of the exampleConfig.js (/database/config) file, rename it to config.js and complete it with your information.

To create the schema, you will can npm run reset.(this script will reset the database if it already exists, if not it will create it)

To seed, you just need to npm run seed(it will create 100 products. if there is any duplicate, it will ignore it)

### Endpoints

* GET: /api/carousel/:productid/moreToConsider
* GET: /api/carousel/:productid/similar
* GET: /api/carousel/:productid/featured
* POST: /api/carousel/
* PUT: /api/carousel/:productid
* DELETE: /api/carousel/:productid


## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- PostgreSQL

### Installing Dependencies

From within the root directory:

```sh
npm install
```

