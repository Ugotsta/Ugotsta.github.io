// returns an array of [word, word count] arrays
function word_count(message, caseSensitive) {
    // array to store word arrays [word, word count]
    var word_count_array = [];
    // get message length for use in for-loop
    var length = message.length;
    // word_start stores index where start of word is found, -1 if no word found yet
    var word_start = -1;
    // iterate over each character in message
    for (var i = 0; i < length; i += 1) {
        // check if word has been started
        if (word_start !== -1) {
            // check next character for blank or end of line
            if (isAlphanumeric(message[i])) {
                // next character
                var new_word = message.substring(word_start, i);
                // convert to lowercase if caseSensitive is false
                if (!caseSensitive) {
                    new_word = new_word.toLowerCase();
                }
                // add new_word to word_count_array if it doesn't already exist
                var index_check = indexOf(word_count_array, new_word);
                if (index_check != -1) {
                    // increment count for this word in word_count_array
                    word_count_array[index_check][1] += 1;
                }
                else {
                    // create array to push onto word_count_array
                    var obj = [new_word, 1];
                    // push object onto word_count_array
                    word_count_array.push(obj);
                }
                // reset word start
                word_start = -1;
            }
        } // no word found yet (word_start === -1)
        else {
            // check current character to see if it starts a new word
            if (isAlphanumeric(message[i])) {
                // continue with search for start of word
                word_start = -1;
            }
            else {
                // char is not blank, set word_start to char index
                word_start = i;
            }
        }
    }

    // sort the array before returning it
    word_count_array.sort(function(a, b) {
        return b[1] - a[1];
    });
    return word_count_array;

    // test for valid blanks
    function isAlphanumeric(char) {
        // return true of char is alphanumeric
        if (char.search(/[\'a-z0-9]/gi)) {
            return true;
        } // otherwise return false
        return false;
    }

    // check if new_word already exists in array_to_search
    function indexOf(array_to_search, word) {
        var index = -1;
        var length = array_to_search.length;
        for (var i = 0; i < length; i += 1) {
            if (word === array_to_search[i][0]) {
                // occurrence found, return index
                return i;
            }
        } // return with -1 if no occurrence found
        return index;
    }
}