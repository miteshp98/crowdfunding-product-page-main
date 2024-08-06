"use strict";

// Output Variables ----
const totalFundsRaised = document.querySelector(".total-amount");
const totalBackers = document.querySelector(".total-count");
const remainingDays = document.querySelector(".days-left");
const progressBar = document.querySelector(".complete-bar");

// Section  and Container or Wrapper (DIV)
const heroSection = document.querySelector(".hero-section");
const fundingDetailsContainer = document.querySelector(
  ".contribution-container"
);
const contributionTier = document.querySelectorAll(".contribution-tier");
const modalWindow = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const successModal = document.querySelector(".thank-you-modal");
const modalContent = document.querySelector(".modal-content");
const productStock = document.querySelectorAll(".product-stock");
const dialogueStock = document.querySelectorAll(".dialogue-stock");

const toggleButton = document.querySelector(".nav-toggle");
const nav = document.querySelector("nav");
const closeModalBtn = document.querySelector(".modal-close-button");
const continueButton = document.querySelectorAll(".modal-continue-button");
const gotItButton = document.querySelector(".got-it-btn");
const selectButton = document.querySelectorAll(".select-button");

// Contribution Tier Option's
const tierOptions = document.querySelectorAll(".wrapper");
const bambooStandTier = document.querySelector("#modal-bamboo-stand");
const blackEditionTier = document.querySelector("#modal-black-edition");
const mahoganyEditionTier = document.querySelector("#modal-mahogany-special");
const pledgeWithNoReward = document.querySelector("#modal-no-reward");

// Input's And Labels
const pledgeRadioBtns = document.querySelectorAll("input[type='radio']");
const pledgeOptionLabels = document.querySelectorAll(".pledge-options");
const pledgeExpandDivs = document.querySelectorAll(".pledge-input-wrapper");
const inputPledge = document.querySelectorAll("input[type='number']");
const errors = document.querySelectorAll(".error");

// ON Page Load Progress Bar Width Default
function defaultBar() {
  const amount = +totalFundsRaised.textContent.slice(1).replaceAll(",", "");
  const value = 100000;

  let percentage = (amount / value) * 100;

  progressBar.style.width = `${percentage}%`;
}
defaultBar();

// Main App Logic
class CrowdFundApp {
  constructor() {
    heroSection.addEventListener(
      "click",
      this._handleUserInteraction.bind(this)
    );
    closeModalBtn.addEventListener("click", this._closeModal.bind(this));
    fundingDetailsContainer.addEventListener(
      "click",
      this._handleProjectAction.bind(this)
    );
    modalWindow.addEventListener("click", this._selectPledgeOption.bind(this));
  }

  // Handles user interactions within the hero section, such as bookmarking and opening the modal
  _handleUserInteraction(e) {
    const bookmarkBtn = e.target.closest(".bookmark-button");

    if (e.target.closest(".back-button")) {
      this._openModal();
    }

    if (!bookmarkBtn) return;

    this._toggleBookmark(bookmarkBtn);
  }

  // Toggles the bookmark status and updates the UI accordingly
  _toggleBookmark(elementName) {
    if (!elementName.classList.contains("clicked")) {
      elementName.classList.add("clicked");
      elementName.innerHTML = this._updateBookmark("Bookmarked");
    } else {
      elementName.classList.remove("clicked");
      elementName.innerHTML = this._updateBookmark("Bookmark");
    }
  }

  // Update the bookmark HTML with the given text
  _updateBookmark(text) {
    const html = `<img
    src="images/icon-${text.toLowerCase()}.svg"
    alt="bookmark icon"
    class="bookmark-icon"
  />
  <span class="bookmark-text">${text}</span>`;
    return html;
  }

  // Displays the "Back This Project" modal window
  _openModal() {
    if (!modalWindow.classList.contains("open")) {
      modalWindow.classList.add("open");
    }
  }

  // Hides the modal window and resets its content
  _closeModal() {
    if (modalWindow.classList.contains("open")) {
      modalWindow.classList.remove("open");
      this._resetPledgeModal();
    }
  }

  // Resets the modal content to its default state
  _resetPledgeModal() {
    pledgeRadioBtns.forEach((option) => {
      option.checked = false;
    });
    pledgeOptionLabels.forEach((label) => {
      label.classList.remove("active-color");
    });
    pledgeExpandDivs.forEach((elem) => {
      elem.classList.remove("expand");
    });
    tierOptions.forEach((wrap) => {
      wrap.classList.remove("active-border");
    });
    errors.forEach((text) => {
      text.classList.remove("show-error");
    });
  }

  // Handles project-related actions such as selecting a reward tier
  _handleProjectAction(e) {
    const selectedRewardBtn = e.target.closest(".select-button");

    if (!selectedRewardBtn) return;

    const rewardValue = selectedRewardBtn.dataset.value;
    this._handlePledgeSelection(rewardValue);
  }

  // Selects and highlights the appropriate pledge container based on user input
  _handlePledgeSelection(value) {
    switch (value) {
      case "bamboostand":
        this._highlightPledgeOption(1, bambooStandTier);
        break;
      case "blackeditionstand":
        this._highlightPledgeOption(2, blackEditionTier);
        break;
      case "mahoganyspecialedition":
        this._highlightPledgeOption(3, mahoganyEditionTier);
        break;
    }
  }

  // Highlights the specified pledge container and optionally scrolls into view
  _highlightPledgeOption(index, container, enableScroll = true) {
    setTimeout(() => {
      pledgeRadioBtns[index].checked = true;
      tierOptions[index].classList.add("active-border");
      pledgeOptionLabels[index].classList.add("active-color");
      pledgeExpandDivs[index].classList.add("expand");
      if (enableScroll) {
        container.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 120);
    this._openModal();
    this._resetPledgeModal();
  }

  // Verifies the user's pledge selection within the modal
  _selectPledgeOption(e) {
    const options = e.target.closest(".pledge-options");

    if (!options) return;

    this._validatePledgeSelection(options);
  }

  // Processes user selection of a pledge option and updates the UI
  _validatePledgeSelection(name) {
    if (name.classList.contains("no-reward-label")) {
      this._highlightPledgeOption(0, name, false);
    } else if (name.classList.contains("bamboo-stand-label")) {
      this._highlightPledgeOption(1, name, false);
    } else if (name.classList.contains("black-edition-label")) {
      this._highlightPledgeOption(2, name, false);
    } else {
      this._highlightPledgeOption(3, name, false);
    }
  }
}

// Handles Pleddge Input
class PledgeInput extends CrowdFundApp {
  // Private variables to store stock levels and button-to-container index mapping
  #AllStock = [101, 64, 5];
  #Index = [0, 0, 1, 2];
  #maxValue = 100000;
  // Constructor initializes the class and sets up event listeners and stock UI
  constructor() {
    super();
    this._initEventListeners();
    this._setStock();
    this._updateStockUI();
  }

  // Sets up the event listeners for pledge input and button clicks
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

  // Validates the input value and shows error if invalid
  _validateInput(e) {
    e.preventDefault();
    const input = e.target;
    const selectOption = this._getSelectedOption(input);
    const error = selectOption.querySelector(".error");
    const minValue = +input.dataset.value;
    if (+input.value > minValue) {
      this._clearError(error);
    } else {
      this._showError(error);
    }
  }

  // Handles the continue button click, validates input, updates totals and decrements stock
  _handleContinue(index, e) {
    e.preventDefault();
    const selectOption = this._getSelectedOption(e.target);
    const input = selectOption.querySelector("input[type='number']");
    const error = selectOption.querySelector(".error");
    const minValue = input.dataset.value;

    console.log(index);

    if (+input.value > minValue) {
      this._showSuccessModal();
      this._clearError(error);
      this._updateTotals(+input.value);
      this._decrementStock(index);
    } else {
      this._showError(error);
    }
    input.value = "";
    this._resetPledgeModal();
  }

  _showError(elem) {
    elem.classList.add("show-error");
    elem.innerText = "Enter Valid Amount";
  }

  _clearError(elem) {
    elem.classList.remove("show-error");
    elem.innerText = "";
  }

  _updateTotals(amount, product) {
    const pastAmount = +totalFundsRaised.textContent
      .slice(1)
      .replaceAll(",", "");
    let backerCount = +totalBackers.textContent;
    let totalAmount = pastAmount + amount;
    backerCount++;

    let progressPercentage = (totalAmount / this.#maxValue) * 100;

    setTimeout(() => {
      totalBackers.textContent = backerCount;
      totalFundsRaised.textContent = `$${totalAmount.toLocaleString()}`;
      progressBar.style.width = `${progressPercentage}%`;
    }, 1800);
  }

  // Sets the initial stock values in the UI
  _setStock() {
    const stock = this.#AllStock.forEach((e, i) => {
      productStock[i].textContent = e;
      dialogueStock[i].textContent = e;
    });
  }

  // Updates the UI based on current stock values
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

  _decrementStock(index) {
    const alignIndex = this.#Index[index];

    if (this.#AllStock[alignIndex] > 0) {
      this.#AllStock[alignIndex]--;

      productStock[alignIndex].textContent = this.#AllStock[alignIndex];
      dialogueStock[alignIndex].textContent = this.#AllStock[alignIndex];

      this._updateStockUI();
    }
  }

  _showSuccessModal() {
    setTimeout(() => {
      successModal.classList.add("open");
    }, 50);
    modalWindow.classList.remove("open");
  }

  _clearWindow() {
    successModal.classList.remove("open");
    document.querySelector("header").scrollIntoView({ behavior: "smooth" });
  }

  _getSelectedOption(target) {
    return target.closest(".wrapper");
  }
}
const pledgeInput = new PledgeInput();
const app = new CrowdFundApp();

toggleButton.addEventListener("click", function (e) {
  const icon = this.children[0];
  toggleNavbar(icon);
});

function toggleNavbar(icon) {
  if (!nav.classList.contains("toggle")) {
    nav.classList.add("toggle");
    icon.src = "images/icon-close-menu.svg";
    document.querySelector("body").style.overflow = "hidden";
  } else {
    nav.classList.remove("toggle");
    icon.src = "images/icon-hamburger.svg";
    document.querySelector("body").style.overflow = "auto";
  }
}
