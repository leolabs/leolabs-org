---
title: Reset the WordPress language back to English
date: 2013-02-20 17:57:58 Z
---

I recently wanted to change the language of my WordPress blog from German to English and found a simple way of doing it. You needn't install any additional language packs for English, just open the wp-config.php on your server and change the line define('WPLANG', 'de_DE'); (may vary with your language) to define('WPLANG', '');  and you're done. I hope this little trick could help you. If you have any questions or suggestions concerning this article, just ask them in the comments below.