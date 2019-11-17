---
title: Using Firebase Cloud Functions to Unzip Files in Google Cloud Storage
date: 2019-11-17
---

In a recent project, our client needed to upload a lot of small files (hundreds of
thousands) to GCS for further processing. Using regular methods, this takes a long
time as each file has to be uploaded individually. Our solution was to implement a
simple Cloud Function that would automatically unzip every ZIP file that's uploaded.

To get right to the important part, here's the Cloud Function:

```typescript
import * as functions from 'firebase-functions';
import * as unzipper from 'unzipper';

export const manageZipArchives = functions
  .runWith({ timeoutSeconds: 300 })
  .storage.bucket()
  .object()
  .onFinalize(async (obj: functions.storage.ObjectMetadata) => {
    const file = firebase
      .storage()
      .bucket(obj.bucket)
      .file(obj.name!);

    // We only want to deal with ZIP archives
    if (!file.name.endsWith('.zip')) {
      return;
    }

    await file
      .createReadStream()
      .pipe(unzipper.Parse())
      .on('entry', entry => {
        const destination = firebase
          .storage()
          .bucket()
          .file(`${file.name.replace('.', '_')}/${entry.path}`);
        entry.pipe(destination.createWriteStream());
      })
      .promise();

    await file.delete();
  });
```

With this Cloud Function deployed on Firebase, as soon as a new ZIP file is detected
in the default Storage Bucket, it will be unzipped into a subdirectory and then
deleted. This works remarkably well for our use case and I hope that you find it
useful as well.

If you haven't setup Cloud Functions for your project yet, just run this command in
your console:

```sh
firebase init
```

It will ask you which components you need. Select `Functions` and `Storage`. You can
then select an existing Firebase project that you want to deploy your Cloud Functions
to, create a new one, or "Add Firebase to an existing Google Cloud Platform project".

Add the code above to the newly created `functions/src/index.ts` file and run the
following command to deploy it:

```sh
firebase deploy --only functions
```

Et voilà, the CF is up and running 🚀
