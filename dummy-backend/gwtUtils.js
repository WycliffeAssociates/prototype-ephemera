
// utility function to insert a string into another string
function stringInsert(str, index, value, replace) {
    let res = "";

    if(replace === false)
    {
        res =  str.substr(0, index) + value + str.substr(index);
    }
    else
    {
        res = str.substr(0, index) + value + str.substr(index + value.length);
    }

    return res;
}




// Adds padding zeros (to the second character's posision) until it's length is 5
function makeFourDigitStrongs(strongs) {
    if(strongs.length < 5 && strongs.length >= 2)
    {
        for(let i = strongs.length; i < 5; i++)
        {
            strongs = stringInsert(strongs, 1, "0", false);
        }
    }

    return strongs;
}




// Takes the target strongs number and calculates its parent folder in the en_gwt repo
// This is greatly dependent on the current structure of the en_gwt
function getStrongsRange(strongs) {

    let thousandsDigit = parseInt(strongs.charAt(1));
    let hundredsDigit = parseInt(strongs.charAt(2));
    let tensDigit = strongs.charAt(3);
    let onesDigit = strongs.charAt(4);


    if(thousandsDigit == 0 && hundredsDigit == 0)
    {
        if(parseInt(tensDigit + onesDigit) <= 10)
        {
            return "g0001-g0010"
        }
    }

    let startStrongsRange = stringInsert(strongs, 4, "1", true);

    tensDigit = (parseInt(tensDigit) + 1).toString();

    let endStrongsRange = stringInsert(strongs, 3, tensDigit, true);
    endStrongsRange = stringInsert(endStrongsRange, 4, "0", true)

    let strongsRange = (startStrongsRange +  "-").concat(endStrongsRange)

    return strongsRange.toLocaleLowerCase();
}




function getFolder(strongs) {

    strongs = makeFourDigitStrongs(strongs);
    let folder = getStrongsRange(strongs);

    // TODO: make request here to get raw md file.

    console.log(folder);
}


let strongs = "G217";
getFolder("G11");