# Frontend Mentor - Crowdfunding product page solution

This is a solution to the [Crowdfunding product page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/crowdfunding-product-page-7uvcZe7ZR). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout depending on their device's screen size
- See hover states for interactive elements
- Make a selection of which pledge to make
- See an updated progress bar and total money raised based on their pledge total after confirming a pledge
- See the number of total backers increment by one after confirming a pledge
- Toggle whether or not the product is bookmarked

### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it.

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Solution URL: [ solution URL ](https://github.com/miteshp98/crowdfunding-product-page-main)
- Live Site URL: [ live site URL ](https://miteshp98.github.io/crowdfunding-product-page-main/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- OOP Based

**Note: These are just examples. Delete this note and replace the list above with your own choices**

### What I learned

- Dynamic UI Updates:
  I learned how to dynamically update the user interface based on user interactions. For example, updating the progress bar and total money raised when a user confirms a pledge, and incrementing the number of total backers.

- Handling User Interactions:
  Implementing hover states for interactive elements and managing selections for different pledge options helped me understand how to create a more engaging user experience.

- Smooth Scrolling:
  Implementing smooth scrolling to selected pledge options improved the usability of the modal window, enhancing the overall user experience.

- Conditional Rendering:
  I learned how to conditionally render elements based on the product's stock levels, such as disabling containers and updating button text to "Out of Stock" when necessary.

- Semantic HTML and Accessibility:
  Using semantic HTML5 markup ensured that the structure of the document was meaningful, which is important for
  both accessibility and SEO.

- CSS Custom Properties and Flexbox:
  Leveraging CSS custom properties for consistent theming and Flexbox for layout helped me create a responsive and maintainable design.

To see how you can add code snippets, see below:

```html
<h1>Some HTML code I'm proud of</h1>
```

```css
.proud-of-this-css {
  color: papayawhip;
}
```

```js

  _initEventListeners() {
    inputPledge.forEach((input) => {
      input.addEventListener("input", this._validateInput.bind(this));
    });
    continueButton.forEach((button, index) => {
      button.addEventListener("click", (e) => {
        this._handleContinue(index, e);
      });
    });
    gotItButton.addEventListener("click", this._clearWindow.bind(this));
  }

  _updateStockUI() {
    this.#AllStock.forEach((e, i) => {
      if (
        +productStock[i].innerText === 0 &&
        +dialogueStock[i].innerText === 0
      ) {
        contributionTier[i].classList.add("disabled");
        selectButton[i].classList.add("out-of-stock");
        selectButton[i].textContent = "Out of Stock";
        tierOptions[i + 1].classList.add("disabled");
      } else {
        contributionTier[i].classList.remove("disabled");
        selectButton[i].classList.remove("out-of-stock");
        selectButton[i].textContent = "Select Reward";
        dialogueStock[i].classList.remove("disabled");
      }
    });
  }
```

If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more.

**Note: Delete this note and the content within this section and replace with your own learnings.**

### Continued development

#### While I am satisfied with the current state of this project, there are a few areas I would like to focus on in future development:

- Improving Accessibility:
  Ensuring that the application is fully accessible to all users by adding ARIA roles, labels, and improving keyboard navigation.

- Enhancing Performance:
  Optimizing the performance of the application by minimizing render-blocking resources, using lazy loading for images, and reducing JavaScript payloads.

- Advanced State Management:
  Implementing more advanced state management techniques, possibly using a library like Redux, to handle complex state interactions more efficiently.

- Refactoring Code:
  Continuously refactoring the code to improve readability and maintainability, and adopting best practices such as the DRY (Don't Repeat Yourself) principle.

- Responsive Design:
  Further refining the responsive design to ensure that the layout looks great on all screen sizes, including very small and very large screens.

- Backend Integration:
  Exploring backend integration to handle pledges and stock updates in real-time, possibly using a framework like Node.js and a database like MongoDB.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [Udemy Webdevlopment](https://www.udemy.com/share/101W9C3@2s1lShiGH32a3OJHMYullps9bvMmvxO_kykXK5ZGloqkGQDHawnryvbZtrMeQ8y81A==/)

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

- Website - [Mitesh Panchal](https://miteshp98.github.io/portfolio-website/)
- Frontend Mentor - [@miteshp98](https://www.frontendmentor.io/profile/miteshp98)
- Linkedin - [@Mitesh Panchal](https://www.linkedin.com/in/mitesh-panchal-356558126/)
  **Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.**

## Acknowledgments

Thanks to the challenge provider for creating this opportunity to apply and improve my frontend development skills.

**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**
