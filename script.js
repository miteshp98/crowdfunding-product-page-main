"use strict";

// Output Variables ----
const totalFundsRaised = document.querySelector(".total-amount");
const totalBackers = document.querySelector(".total-count");
const remainingDays = document.querySelector(".days-left");
const productStock = document.querySelectorAll(".product-stock");
const dialogueStock = document.querySelectorAll(".dialogue-stock");
const progressBar = document.querySelector(".complete-bar");

// Section  and Container or Wrapper (DIV)
const heroSection = document.querySelector(".hero-section");
const fundingDetailsContainer = document.querySelector(
  ".contribution-container"
);
const modalWindow = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const successModal = document.querySelector(".thank-you-modal");

const closeModalBtn = document.querySelector(".modal-close-button");
const continueButton = document.querySelectorAll(".modal-continue-button");
const gotItButton = document.querySelector(".got-it-btn");

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
const pledgeAmount = document.querySelectorAll("input[type='number']");
const errors = document.querySelectorAll(".error");

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const pledgeValue = [0, 25, 75, 200];
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

let amount = 100000;

// Amount and ProgressBar
updatePledgeDetails();
function updatePledgeDetails() {
  let totalFundingAmount = +totalFundsRaised.innerText
    .slice(1)
    .replaceAll(",", "");

  const backerCount = +totalBackers.innerText.replaceAll(",", "");
  const days = parseInt(remainingDays.innerText);

  let progressPercentage = (totalFundingAmount / amount) * 100;

  progressBar.style.width = `${progressPercentage}%`;
}

// Bookmark and Open Modal Logic
heroSection.addEventListener("click", function (e) {
  const bookmarkBtn = e.target.closest(".bookmark-button");

  if (e.target.closest(".back-button")) {
    showModal();
  }

  if (!bookmarkBtn) {
    return;
  } else {
    toggleBookmark(bookmarkBtn);
  }
});

function toggleBookmark(elementName) {
  if (!elementName.classList.contains("clicked")) {
    elementName.classList.add("clicked");
    elementName.innerHTML = renderBookmark("Bookmarked");
  } else {
    elementName.classList.remove("clicked");
    elementName.innerHTML = renderBookmark("Bookmark");
  }
}

function renderBookmark(text) {
  const html = `<img
                  src="images/icon-${text}.svg"
                  alt="bookmark icon"
                  class="bookmark-icon"
                />
                <span class="bookmark-text">${text}</span>`;
  return html;
}

function showModal() {
  if (modalWindow.classList.contains("hidden")) {
    modalWindow.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }
}

closeModalBtn.addEventListener("click", function () {
  hideModal();
  resetModal();
});

function hideModal() {
  if (!modalWindow.classList.contains("hidden")) {
    modalWindow.classList.add("hidden");
    overlay.classList.add("hidden");
  }
}

function resetModal() {
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
  pledgeAmount.forEach((input) => {
    input.value = "";
  });
}

fundingDetailsContainer.addEventListener("click", function (e) {
  const selectedRewardBtn = e.target.closest(".select-button");

  if (!selectedRewardBtn) {
    return;
  } else {
    const value = selectedRewardBtn.dataset.value;
    handlePledgeSelection(value);
  }
});

function handlePledgeSelection(elementName) {
  if (elementName === "bamboostand") {
    highlightPledgeContainer(1, bambooStandTier);
  } else if (elementName === "blackeditionstand") {
    highlightPledgeContainer(2, blackEditionTier);
  } else if (elementName === "mahoganyspecialedition") {
    highlightPledgeContainer(3, mahoganyEditionTier);
  } else {
    resetModal();
  }
}

function highlightPledgeContainer(index, pledgeContainer, enableScroll = true) {
  setTimeout(() => {
    pledgeRadioBtns[index].checked = true;
    pledgeContainer.classList.add("active-border");
    pledgeOptionLabels[index].classList.add("active-color");
    pledgeExpandDivs[index].classList.add("expand");
    if (enableScroll) {
      pledgeContainer.scrollIntoView({
        behavior: "smooth",
      });
    }
    showModal();
  }, 0);
}

modalWindow.addEventListener("click", function (e) {
  const pledgeOption = e.target.closest(".pledge-options");

  if (!pledgeOption) return;

  verifyPledgeSelection(pledgeOption);
});

function verifyPledgeSelection(elementName) {
  const isNoRewardPledge = elementName.classList.contains("no-reward-label");
  const isBambooStandTier =
    elementName.classList.contains("bamboo-stand-label");
  const isBlackEditionTier = elementName.classList.contains(
    "black-edition-label"
  );
  const isMahoganySpecialTier = elementName.classList.contains(
    "mahogany-special-edition"
  );
  if (isNoRewardPledge) {
    highlightPledgeContainer(0, pledgeWithNoReward, false);
    resetModal();
  } else if (isBambooStandTier) {
    highlightPledgeContainer(1, bambooStandTier, false);
    resetModal();
  } else if (isBlackEditionTier) {
    highlightPledgeContainer(2, blackEditionTier, false);
    resetModal();
  } else if (isMahoganySpecialTier) {
    highlightPledgeContainer(3, mahoganyEditionTier, false);
    resetModal();
  } else {
    return;
  }
}

function updateStock(elementName, classname = null) {
  elementName.forEach((elem) => {
    let stock = +elem.innerText;
    if (stock === 0) {
      elem.closest(`.${classname}`).classList.add("disabled");
      const outOfStockBtn = elem.parentElement.nextElementSibling;
      outOfStockBtn.innerText = "Out of stock";
    } else {
    }
  });
}

console.log(updateStock(productStock, "contribution-tier"));
console.log(updateStock(dialogueStock));

// Input Data Valu
function setDataValue() {
  for (let i = 0; i < pledgeValue.length; i++) {
    pledgeAmount[i].dataset.value = pledgeValue[i];
  }
}
setDataValue();

continueButton.forEach((button, index) => {
  // console.log(button);
});

function showError(index, errorMsg) {
  errors[index].classList.add("show-error");
  errors[index].textContent = errorMsg;
  pledgeAmount[index].classList.add("invalid");

  setTimeout(() => {
    errors[index].classList.remove("show-error");
    errors[index].textContent = "";
    pledgeAmount[index].classList.remove("invalid");
  }, 600);
}

function showSuccesModal() {
  if (successModal.classList.contains("hidden")) {
    modalWindow.classList.add("hidden");
    setTimeout(() => {
      successModal.classList.remove("hidden");
      overlay.classList.remove("hidden");
    }, 500);
  } else {
    successModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }
}

gotItButton.addEventListener("click", hideSuccesModal);

function hideSuccesModal(index) {
  setTimeout(() => {
    overlay.classList.add("hidden");
    document.querySelector("header").scrollIntoView({ behavior: "smooth" });
  }, 100);
  successModal.classList.add("hidden");
}
