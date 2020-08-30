const _ = require('lodash');

const formatBitfinex = (res, totalRecord = 10) => {
    let result = {
        bids: [],
        asks: [],
        sumOfBid: 0,
        sumOfAskSize: 0
    };
    const originalData = {
        bidSize: res[1] / 100,
        bid: res[2],
        askSize: res[3] / 100,
        ask: res[4],
    };
    // Add first bid, first ask
    result.bids.push({
        bid: originalData.bid,
        size: originalData.bidSize
    })

    result.asks.push({
        ask: originalData.ask,
        size: originalData.askSize
    })
    result = randValue(result, originalData, totalRecord);

    return result;
}

const formatBinance = (res, totalRecord) => {
    let result = {
        bids: [],
        asks: [],
        sumOfBid: 0,
        sumOfAskSize: 0
    };
    const originalData = {
        bidSize: parseFloat(res.bidQty),
        bid: parseFloat(res.bidPrice),
        askSize: parseFloat(res.askQty),
        ask: parseFloat(res.askPrice),
    };
    // Add first bid, first ask
    result.bids.push({
        bid: originalData.bid,
        size: originalData.bidSize
    })

    result.asks.push({
        ask: originalData.ask,
        size: originalData.askSize
    })

    result = randValue(result, originalData, totalRecord);
    return result;
}
exports.formatBitfinex = formatBitfinex;
exports.formatBinance = formatBinance;

function randValue(result, originalData, totalRecord) {
    result.sumOfBid = originalData.bid * originalData.bidSize;
    result.sumOfAskSize = originalData.askSize;
    for (let i = 0; i < totalRecord - 2; i++) {
        let rand = _.random(originalData.ask, originalData.bid);
        const avgBidSize = (5 - originalData.bid * originalData.bidSize) / rand / (totalRecord - 1);
        let size = _.random(0, avgBidSize);
        result.sumOfBid += rand * size;
        result.bids.push({
            bid: rand,
            size
        });

        rand = _.random(originalData.ask, originalData.bid);
        const avgSize = (150 - originalData.askSize) / (totalRecord - 1);
        size = _.random(originalData.askSize < avgSize ? originalData.askSize : 0, avgSize);
        result.sumOfAskSize += size;

        result.asks.push({
            ask: rand,
            size
        });
    }
    return result;
}
