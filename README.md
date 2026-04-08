# Таблица заказов с синхронизацией фильтров, сортировки и страницы через query params

## Goal

Make the table reload-safe by keeping filters, sorting, and pagination in the URL.

## What you are training

- route hydration
- URL-synchronized filters
- shareable table state

## Task

Finish the TODOs in the Angular screen and its feature layer.

1. hydrate the facade from query params
2. push search and status changes into the router
3. keep sorting and page in the same URL contract

## Done when

- `npm run test` passes
- the screen behaves honestly for every checked state
- the implementation keeps the feature logic out of the template
