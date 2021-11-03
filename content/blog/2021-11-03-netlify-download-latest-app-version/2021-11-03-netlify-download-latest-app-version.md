---
title: 'Using Netlify Functions to Download the Latest Version of Your Electron App'
date: 2021-11-03
---

I wanted to offer users a simple link that they could use to download the latest version of my Electron app, [AbleSet](https://ableset.app). The app is published using [electron-builder](https://electron.build) and versions are stored in a public AWS bucket along with a generated YAML file that contains some metadata for the updater.

Getting right to it, here's the function's code. It's pretty straight-forward:

```js
const got = require("got");
const yaml = require("yaml");

// Replace this with your own bucket's URL
const bucketUrl = `https://download.ableset.app`;

// These are the paths of electron-build's
// YAML files inside of your bucket
const urlMap = {
  mac: "mac/latest-mac.yml",
  win: "win/latest.yml",
};

exports.handler = async function (event, _, callback) {
  const os = event.queryStringParameters.os;

  if (!(os in urlMap)) {
    return callback("OS is invalid.");
  }

  const url = `${bucketUrl}/${urlMap[os]}`;

  const response = await got(url);
  const data = yaml.parse(response.body);

  const file = data.files.find(
    (f) => f.url.endsWith(".dmg") || f.url.endsWith(".exe"),
  );

  const downloadPath = `${bucketUrl}/${os}/${file.url}`;

  callback(null, {
    statusCode: 302,
    headers: { Location: downloadPath },
    body: "Redirecting...",
  });
};
```

If you haven't set up Netlify Functions yet, add the following to your `netlify.toml` file:

```toml
[functions]
directory = "functions"
```

Then create a `functions` directory and add the function in a `download.js` file. After setting up NPM or Yarn and adding the `got` and `yaml` dependencies, you can deploy your site. The function is now available on `/.netlify/functions/download`.

But that doesn't look like a nice link yet. If you want this function to have a pretty URL, you can add a rewrite for it in Netlify's `_redirects` file:

```
/download/mac /.netlify/functions/download?os=mac
/download/win /.netlify/functions/download?os=win
```

And that's it – your users now have a simple link to download the latest version of your app 🎉

You could take this a step further and offer links for the latest beta or alpha, or maybe links to a specific version of your app.