# LibSys

LibSys is a complete library management system for adding, issuing, and returning books built on sveltekit and strapi. This repository is the frontend endpoint for the application. Checkout [this repo](https://github.com/yogesh174/lib-sys-api) for the backend. 

## Develop

```bash
# clone the repo
git clone https://github.com/yogesh174/lib-sys.git

# install packages
yarn install

# start the application
yarn run dev --host
```

> Note: To change the backend endpoint, navigate to [`/src/lib/api.js`](https://github.com/yogesh174/lib-sys/blob/36cb8d68ca6d054e80309786f19ff997a9c717ad/src/lib/api.js#L1) and modify the `base` variable. 

## Demo

[Live deployment](https://lib-sys.vercel.app/)

> Note: It is slow and sometimes doesn't load. Just refresh if it doesn't load or throws some error.

## Similar applications

Checkout other applications similar to this one
- [Online tutorials system](https://github.com/yogesh174/vid-onl)
- [Hostel management system](https://github.com/yogesh174/htl-mgmt)
