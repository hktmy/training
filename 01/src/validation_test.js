var valid = validation('aaaaaa', 'aaaaaaaaaa' );
console.log(valid.length === 0);

var no_input = validation('', '' );
console.log(no_input.length === 2);
console.log(no_input[0] === 'UserNameは2文字以上8文字以下です');
console.log(no_input[1] === 'Passwordは6文字以上24文字以下です');

var username_tooShort = validation('a', 'aaaaaaaaa' );
console.log(username_tooShort.length === 1);
console.log(username_tooShort[0] === 'UserNameは2文字以上8文字以下です');

var username_tooLong = validation('aaaaaaaaaaaaaaaaaa', 'aaaaaaaaa' );
console.log(username_tooLong.length === 1);
console.log(username_tooLong[0] === 'UserNameは2文字以上8文字以下です');

var username_tooShort = validation('a', 'aaaaaaaaa' );
console.log(username_tooShort.length === 1);
console.log(username_tooShort[0] === 'UserNameは2文字以上8文字以下です');

var password_tooLong = validation('aaaaaaaa', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' );
console.log(password_tooLong.length === 1);
console.log(password_tooLong[0] === 'Passwordは6文字以上24文字以下です');

var password_tooShort = validation('aaaaaaaa', 'a' );
console.log(password_tooShort.length === 1);
console.log(password_tooShort[0] === 'Passwordは6文字以上24文字以下です');

var username_invalid = validation('!!!!!', 'aaaaaaaaaaa' );
console.log(username_invalid === 1);
console.log(username_invalid[0] === 'UserNameに使用できる文字は 英小文字、`-` です');

var password_invalid = validation('aaaaaaa', '^^^^^^^^' );
console.log(password_invalid === 1);
console.log(password_invalid[0] === 'Passwordに使用できる文字は 英大小文字、`-`、`+`、`!`、`@` です');

var all_error = validation('!', '^' );
console.log(all_error === 4);
console.log(all_error[0] === 'UserNameは2文字以上8文字以下です');
console.log(all_error[1] === 'UserNameに使用できる文字は 英小文字、`-` です');
console.log(all_error[2] === 'Passwordは6文字以上24文字以下です');
console.log(all_error[3] === 'Passwordに使用できる文字は 英大小文字、`-`、`+`、`!`、`@` です');
