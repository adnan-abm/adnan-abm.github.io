
/**
 * EmailsInput
 * @param HTMLElement inputContainerNode
 * @param string title 
 * @returns void
 */
function EmailsInput(inputContainerNode, title) {
    if (!(inputContainerNode instanceof HTMLElement)) {
        console.error('inputContainerNode is not a valid HTMLElement', inputContainerNode);
        return;
    }

    if (inputContainerNode.innerHTML.length > 0) {
        console.warn('EmailsInput is already executed on this node', inputContainerNode);
        return;
    }

    const mainContainer = document.createElement('div');
    mainContainer.className = 'email-input-main-wrapper';

    if (title && title.length) {
        const header = document.createElement('h2');
        header.innerHTML = title;
        mainContainer.appendChild(header)
    }
    
    const emailsContainer = document.createElement('div');
    emailsContainer.className = 'emails-container';
    

    const emailInput = document.createElement('input');
    emailInput.className = 'email-input';
    emailInput.placeholder = 'add people...'
    emailsContainer.appendChild(emailInput);

    mainContainer.appendChild(emailsContainer);

    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'actions-container';

    const addEmailBtn = document.createElement('button');
    addEmailBtn.innerText = 'Add email';
    actionsContainer.appendChild(addEmailBtn);

    const emailCountBtn = document.createElement('button');
    emailCountBtn.innerText = 'Get emails count';
    actionsContainer.appendChild(emailCountBtn);


    mainContainer.appendChild(actionsContainer);


    inputContainerNode.appendChild(mainContainer);

    addTestEmail();addTestEmail();addTestEmail();

    function addTestEmail() {
        addEmail('test@miro.com')
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
        emailEntry.appendChild(removeEmail);
        emailsContainer.insertBefore(emailEntry, emailInput);

    }

}

