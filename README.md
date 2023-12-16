# KeroTrampo - Front-end

The KeroTrampo facilitates connecting individuals in need of household services with local service providers.

## About

This Web Applicaiton allows service providers to create postings, specifying service types, average prices, images, descriptions, and covered regions. Providers can also personalize their profiles with pictures, descriptions, and contact phone numbers. On the other side, the KeroTrampo assists users seeking services by filtering service providers based on service type, price range, coverage area, or by matching user input with service names or descriptions.

Access the [KeroTrampo](https://kero-trampo-frontend.vercel.app/).

## Running for Development

1. Clone this repository.
2. Install all dependencies.

```bash
npm i
```

3. Create a PostgreSQL database following the dump.sql in this repository.
4. Configure the `.env` file using the `.env.example` file.
5. Start the back-end in a development environment:

```bash
npm run dev
```

## Building for Production

```bash
npm run build
```

## Updating ENV Variables

When adding new ENV VARIABLES, ensure to:
- Include them in the `.env.example` file.
- Add them to your local `.env` file.