"use strict";
function isSubsequence(str1, str2) {
    let i = 0, j = 0;
    const comparison = str1.length < str2.length, str = {
        larger: (comparison) ? (str2) : (str1),
        smaller: (comparison) ? (str1) : (str2)
    };
    while ((i < str.smaller.length) && (j < str.larger.length)) {
        if (str.smaller[i] === str.larger[j]) {
            i += 1;
        }
        j += 1;
    }
    return (i === str.smaller.length);
}
