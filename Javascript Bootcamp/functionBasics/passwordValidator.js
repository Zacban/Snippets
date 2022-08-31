function validatePassword(password, username) {
    // if (password.length < 8)
    //     return false;
    // if (password.includes(' '))
    //     return false;
    // if (password.includes(username))
    //     return false;

    // return true;
    let valid = password.length >= 8;
    valid = valid && !password.includes(' ');
    valid = valid && !password.includes(username);

    return valid;
}

const username = 'User';
const passwordsToTest = ['Test', 'validated', 'invalid ated', 'UserPassword'];

for (let password of passwordsToTest) {
    console.log(password, validatePassword(password, username));
}
