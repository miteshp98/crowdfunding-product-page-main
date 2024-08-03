"use strict";

//
const fundingAmount = document.querySelector(".total-amount");
const backersCount = document.querySelector(".total-count");
const daysLeft = document.querySelector(".days");
const fundingBar = document.querySelector(".complete-bar");
const bookmarkIcon = document.querySelector(".bookmark-icon");

// Top Back and Bookmark and Nav Button Variables
// const navToggle
const bookmarkButton = document.querySelector(".bookmark-button");
const backButton = document.querySelector(".back-button");
const heroSection = document.querySelector(".hero-section");
const continueButton = document.querySelectorAll(".modal-continue-button");
const gotItButton = document.querySelector(".got-it-btn");
const closeButton = document.querySelector(".modal-close-button");

// Contribution Button And Content Variables
const selectReward = document.querySelectorAll(".select-button");
const tierQuantityLeft = document.querySelectorAll(".tier-quantity-left");

// Amount Input
const pledgeOptions = document.querySelectorAll(".modal-option");
const pledgeInput = document.querySelectorAll(".pledge-input");

// const contributionWrapper = document.querySelectorAll(".modal-pledge-input");
const contributionContainer = document.querySelector(".contribution-container");
const container = document.querySelector(".modal");
const bgOverlay = document.querySelector(".overlay");

// Close Modal
closeButton.addEventListener("click", closeModal);
function closeModal() {
  if (!container.classList.contains("hidden")) {
    container.classList.add("hidden");
    bgOverlay.classList.add("hidden");
  }
}

// Bookmark Button And Backthisproject Button
heroSection.addEventListener("click", function (e) {
  const bookmark = e.target.closest(".bookmark-button");

  if (e.target.closest(".back-button")) {
    openModal();
  }

  if (!bookmark) {
    return;
  } else {
    if (bookmark.classList.contains("clicked")) {
      bookmark.classList.remove("clicked");
      bookmarkContent("Bookmark");
    } else {
      bookmark.classList.add("clicked");
      bookmarkContent("Bookmarked");
    }
  }
});
function bookmarkContent(text) {
  bookmarkButton.innerHTML = `<img
                  src="images/icon-${text}.svg"
                  alt="bookmark icon"
                  class="bookmark-icon"
                />
                <span class="bookmark-text">${text}</span>`;
}
function openModal() {
  container.classList.remove("hidden");
  bgOverlay.classList.remove("hidden");
}

contributionContainer.addEventListener("click", function (e) {
  const selectReward = e.target.closest(".select-button");
  if (!selectReward) {
    return;
  } else {
    openModal();
    console.log(selectReward.dataset);
  }
});
