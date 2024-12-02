# Google Built-In AI Challenge 

## Mimo 
Meet Mimo, your easy to use chrome extension designed to help you navigate your gmail! Mimo is your personal assistant that can be used to generate emails, summarize text, automatically reply to mails and much more!

## Set-up
Using of the chrome extension requires downloading Chrome Canary which enables all of chrome's built in AI Features. Please go through official documentation and blog by author Romin Irani to download canary and enable essential features - 

- [Official Documentation](https://developer.chrome.com/docs/ai/built-in)
- [Medium Blog -  Romin Irani](https://medium.com/google-cloud/get-started-with-chrome-built-in-ai-access-gemini-nano-model-locally-11bacf235514)

An additional resource to understand Prompt API along with requirments, sample codes in the form of an in-depth documentation is given below:

- [Built-in AI Early Preview Program](https://docs.google.com/document/d/1VG8HIyz361zGduWgNG7R_R8Xkv0OOJ8b5C9QKeCjU0c/edit?tab=t.0#heading=h.pbz8ln7z9uw4)

## How to Run?
To run this extension on your pc as a chrome extension, follow the below steps:

- Step 1: Open Terminal and write the following command
```npm install```

- Step 2: After packages have been installed successfully, build your application using ```npm run build``` to create a build folder in repo.

- Step 3: Open Chrome Canary and go to **chrome://extensions/**

- Step 4: Switch on the **Developer Mode** given on top right corner.

- Step 5: Go to **Load unpacked** option and then select the build folder created in Step 1. 

- Step 6: Your extension is ready to use! Just click the extension icon on top right side of panel and click Mimo!

## Mimo Architecture
 
Mimo provides the following features to it's users. A flow of features can be seen in the below project architecture:

![alt text](public\images\Mimo_Architecture.jpg)