const testEmails = [
    'john@miro.com',
    'mike@miro.com',
    'foo@miro.com',
    'bar@miro.com'
];

/**
 * EmailsInput
 * @param HTMLElement inputContainerNode
 * @param string title 
 * @returns void
 */
function EmailsInput(inputContainerNode, title) {
    if (!(inputContainerNode instanceof HTMLElement)) {
        console.error('Not a valid HTMLElement:', inputContainerNode);
        return;
    }

    if (inputContainerNode.hasAttribute('data-emails-input')) {
        console.warn('EmailsInput() is already executed on this node:', inputContainerNode);
        return;
    }

    let validEmailsCount = 0;
    let totalEmailsCount = 0;

    const mainContainer = addMainContainer(inputContainerNode);
    addTitle(mainContainer, title);
    const emailsInputContainer = addEmailsContainer(mainContainer);
    const emailInputField = addEmailInputField(emailsInputContainer);
    addActionsContainer(mainContainer);

    function addMainContainer(inputContainerNode) {
        const container = document.createElement('div');
        container.className = 'email-input-main-wrapper';
        inputContainerNode.appendChild(container);
        inputContainerNode.setAttribute('data-emails-input', 'initialized');
        return container;
    }

    function addTitle(container, titleText) {
        if (titleText && titleText.length) {
            const header = document.createElement('h2');
            header.innerHTML = titleText;
            container.appendChild(header);
        }
    }

    function addEmailsContainer(container) {
        const emailsContainer = document.createElement('div');
        emailsContainer.className = 'emails-container';
        container.appendChild(emailsContainer);
        return emailsContainer;
    }

    function addEmailInputField(container) {
        const emailInput = document.createElement('input');
        emailInput.className = 'email-input';
        emailInput.spellcheck = false;
        emailInput.autocapitalize = false;
        emailInput.autocomplete = false;
        emailInput.autocorrect = false;
        emailInput.placeholder = 'add people...';
        emailInput.onkeyup = emailOnKeyPress;
        emailInput.onblur = processEmail;
        container.appendChild(emailInput);
        return emailInput;
    }

    function isValidEmail(email) {
        const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return filter.test(email);
    }

    function processEmail(e) {
        const email = e.target.value.trim();
        if (isValidEmail(email)) {
            addEmail(email);
        } else if (email.length > 0) {
            addInvalidEmail(email);
        }
        e.target.value = '';
        e.target.focus();
    }

    function emailOnKeyPress(e) {
        if (e.keyCode === 13 || e.keyCode === 188) {
            e.target.value = e.target.value.replace(/,/g, '');
            processEmail(e);
        }
    }

    function addActionsContainer(container) {
        const actionsContainer = document.createElement('div');
        actionsContainer.className = 'actions-container';

        const addEmailBtn = document.createElement('button');
        addEmailBtn.innerText = 'Add email';
        addEmailBtn.onclick = addTestEmail;
        actionsContainer.appendChild(addEmailBtn);

        const emailCountBtn = document.createElement('button');
        emailCountBtn.innerText = 'Get emails count';
        actionsContainer.appendChild(emailCountBtn);

        container.appendChild(actionsContainer);
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function addTestEmail() {
        addEmail(testEmails[getRandomInt(testEmails.length)]);
    }

    function addEmail(email) {
        const emailEntry = document.createElement('div');
        emailEntry.className = 'email';

        const emailAddress = document.createElement('span');
        emailAddress.className = 'email-address';
        emailAddress.innerText = email;
        emailEntry.appendChild(emailAddress);

        const removeEmail = document.createElement('span');
        removeEmail.className = 'remove';
        removeEmail.onclick = deleteEmail;
        emailEntry.appendChild(removeEmail);
        emailsInputContainer.insertBefore(emailEntry, emailInputField);
        validEmailsCount++;
        totalEmailsCount++;
        emailInputField.placeholder = 'add more people...';
        return emailEntry;
    }

    function addInvalidEmail(email) {
        const invalidEmail = addEmail(email);
        invalidEmail.classList.add('invalid');
        validEmailsCount--;
    }

    function deleteEmail(e) {
        const email = e.target.parentNode;
        totalEmailsCount--;
        if (!email.classList.contains('invalid')) {
            validEmailsCount--;
        }
        email.parentNode.removeChild(email);

        if (totalEmailsCount === 0) {
            emailInputField.placeholder = 'add people...';
        }
    }

}

