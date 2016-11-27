const zero = '0'.repeat(10);
module.exports = function byteArrayToBinary(array) {
    var result=[];
    for (var element of array) {
        var binary = element.toString(2);
        result.push(zero.substring(0, 8 - binary.length) + binary)
    }
    return result.join('');
}

