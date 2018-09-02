function userCard(index) {
  let indexMaxLength = 3;

  if (index < 1 || index > indexMaxLength) {
    throw new Error('Index must be in range between 1 and 3');
  }

  const taxedAmount = 0.005;

  let userBalance = 100;
  let limitOfCredits = 100;
  let key = index;
  let historyLog = [];
  let sliceDate = -2;

  function getDate(date) {
    let day = ('0' + date.getDate()).slice(sliceDate);
    let month = ('0' + (date.getMonth() + 1)).slice(sliceDate);
    let year = date.getFullYear();
    let hours = ('0' + date.getHours()).slice(sliceDate);
    let minutes = ('0' + date.getMinutes()).slice(sliceDate);
    let seconds = ('0' + date.getSeconds()).slice(sliceDate);
    let getDateRes = day + '/' + month + '/' + year + ', ' + hours + ':' + minutes + ':' + seconds;

    return getDateRes;
  }

  function buidCards(operationType, credits) {
    let transformed = {
      operationType: operationType,
      credits: credits,
      operationTime: getDate(new Date())
    };
    historyLog.push(transformed);
  }

  function getCardOptions() {
    return {
      balance: userBalance,
      transactionLimit: limitOfCredits,
      historyLogs: historyLog,
      key: key
    };
  }

  function putCredits(receiveCredits) {
    userBalance += receiveCredits;

    buidCards('Received credits', receiveCredits);
  }

  function takeCredits(reduceAmount) {

    if (limitOfCredits >= reduceAmount && userBalance >= reduceAmount) {
      userBalance -= reduceAmount;
      buidCards('Widthdrawal of credits', reduceAmount);
    } else {
      console.log('Your remaining balance are less than credits you want to take.');
    }
  }

  function setTransactionLimit(amountCards) {
    limitOfCredits = amountCards;

    buidCards('Transaction limit change', amountCards);
  }

  function transferCredits(amountTransfer, recipientCard) {

    let taxed = amountTransfer + amountTransfer * taxedAmount;

    takeCredits(taxed);
    recipientCard.putCredits(amountTransfer);
  }

  return {
    getCardOptions,
    putCredits,
    takeCredits,
    setTransactionLimit,
    transferCredits
  };
}

class UserAccount {
  constructor(name) {
    this.name = name,
    this.cards = [],
    this.maxLength = 3
  }

  addCard() {
    if (this.cards.length >= this.maxLength) {
      return;
    }

    let cardIndex = this.cards.length + 1;
    this.cards.push(userCard(cardIndex));
  }

  getCardByKey(keyNum) {
    if (keyNum < 1 || keyNum > this.maxLength) {
      throw new Error('Key must be in range between 1 and 3');
    }

    return this.cards[keyNum - 1];
  }
}
