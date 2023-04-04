
# xBesh-Adapter

[xBesh](https://xbesh.com/) is a powerful framework built over PocketBase that provides developers with a scalable and reliable solution for building modern web applications. xBesh-Adapter is a flexible and customizable adapter that seamlessly integrates xBesh and [NextAuthJS](https://next-auth.js.org/) into your NextJS application, providing support for authentication and session management using JWT.

## Features

-   Seamless integration with xBesh and NextAuthJS.
-   Flexible and customizable configuration options.
-   Support for authentication and session management using JWT.
-   Easily manage user authentication in your application.

## Getting Started

### Installation

To install xBesh-Adapter, simply run:

Copy code

`npm install xbesh-adapter` 

### Configuration

To configure xBesh-Adapter, you'll need to provide it with a PocketBase connection and a JWT secret. Here's an example configuration:

javascriptCopy code

    import { XBeshAdapter } from 'xbesh-adapter';
    import { PocketBase } from '@pocketbase/pocketbase';
    import { NextApiRequest, NextApiResponse } from 'next';
    
    const pocketBase = new PocketBase({
      appId: 'YOUR_APP_ID',
      appKey: 'YOUR_APP_KEY',
    });
    
    const adapter = new XBeshAdapter({
      pocketBase: pocketBase,
      secret: 'YOUR_JWT_SECRET',
      pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error',
        verifyRequest: '/auth/verify-request',
        newUser: '/auth/new-user',
      },
    });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await adapter.handle(req, res);
}` 

### Usage

Once you've configured xBesh-Adapter, you can use it in your NextJS application by creating a new API route and calling the `handle` method:

javascriptCopy code

    import adapter from '../path/to/adapter';

export default async function handler(req, res) {
  await adapter.handle(req, res);
}` 

### Contributing

If you'd like to contribute to xBesh-Adapter, please read the [contributing guidelines](https://chat.openai.com/chat/CONTRIBUTING.md) before submitting a pull request.

## License

xBesh-Adapter is [MIT licensed](https://chat.openai.com/chat/LICENSE).
