# Reddit IAmA Highlights

### A Chrome Extension

This is a simple Google Chrome extension that allows you to hide ancillary comments in the [Reddit IAmA](http://www.reddit.com/r/IAmA/) comment threads. While all the karma-trolling commenters can be funny or insightful, sometimes you just want to read what the IAmA-starter has to say, and to whom he/she responded to.

It's kind of like [topiama.com](http://www.topiama.com/), except you don't have to go to a separate page and you don't have to see ads.

This is my first Chrome extension and I made it just to see how easy it was (pretty easy!). It is obviously unpolished and fugly and it will stay that way. But you're free to clone the repo and modify it yourself for fun.

## Usage

This information pretty much comes from the [Chrome Extension Developers Guide](http://developer.chrome.com/extensions/getstarted.html). Unfortunately since this is just for fun, I'm not going to take the time to properly package it for the Chrome store.

### Loading the extension into Chrome

1. Download [iama-highlights.zip](https://github.com/dannguyen/iama-highlights-chrome-extension/blob/master/iama-highlights.zip) and unzip it.
2. In the Google Chrome search bar, navigate to: [chrome://extensions/](chrome://extensions/).
3. Enable __Developer mode__ by checking its checkbox in the __top right__
4. Click __Load unpacked extension...__ to pop up a file-selection dialog.
5. Navigate to the directory in which you unzipped package and select it.

The extension should be active right away once you've loaded it(unless you get an error message). However, it will only activate for the given path:

    http://www.reddit.com/r/IAmA/comments/*

### Using the plugin

When you go to an IAmA comments page, a floating footer should show up with two green links.

1. __Load More/Pause__ will auto-click the __load more comments__ links, which will, well, load more comments, at a rate of one-click per second. Clicking __Load More/Pause__ again will stop the loading.
2. __Show/Hide Comments__ will, on __first__ click, __hide__ all comments that are not from the discussion originator (i.e. the person who is answering the questions) __or__ comments that the originator responds to. On __second__ click, the comments will be made visible.

Try it on the [Barack Obama IAMA](http://www.reddit.com/r/IAmA/comments/z1c9z/i_am_barack_obama_president_of_the_united_states). Clicking __Show/Hide__ will nearly clear out the entire page, as our Commander-in-Chief is apparently a giant reddit-tease.



### How it was made

I used the [Yeoman Chrome Extension generator](https://github.com/yeoman/generator-chrome-extension) and [followed the Chrome Extension guide](http://developer.chrome.com/extensions/getstarted.html) to make a [content script-type plugin](http://developer.chrome.com/extensions/content_scripts.html).

It was pretty easy to follow until I got to the part where I wanted to activate Reddit's own inline-onclick code to do AJAX loading of the comments. Chrome's security settings doesn't allow this, but this [StackOverflow discussion shows how to inject a custom script properly](http://stackoverflow.com/questions/10527625/google-chrome-extension-script-injections/10529675#10529675).
