# Emails input field

## Getting started

Add an empty div:

```
<div id="emails-input"></div>
```

Add the JS lib before closing `</body>` tag and initialize the `EmailsInput`:

```
<script src="libs/emails-input/js/emails-input.js"></script>

<script>
    var inputContainerNode = document.querySelector("#emails-input");
    var emailsInput = EmailsInput(inputContainerNode, 'Title');
</script>
```

The `title` is optional.

See it in action here: https://adnan-abm.github.io/

