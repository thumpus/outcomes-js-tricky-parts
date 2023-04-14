function createAccount(pin, amount = 0) {

    return {

        checkBalance(inputPin) {
            if (inputPin !== pin) return "Invalid PIN";
            return `$${amount}`;
        },
        
        deposit(inputPin, newAmount) {
            if (inputPin !== pin) return "Invalid PIN";
            amount += newAmount;
            return `Succesfully deposited $${newAmount}. Current Balance: $${amount}`;
        },

        withdraw(inputPin, withdrawalAmount) {
            if (inputPin !== pin) return "Invalid PIN";
            if (withdrawalAmount > amount) {
                return "The withdrawal amount is more than your account balance. "
            }
            amount -= withdrawalAmount;
            return `Succesfully withdrew $${withdrawalAmount}. Current Balance: $${amount}`
        },

        changePin(oldPin, newPin) {
            if (oldPin !== pin) return "Invalid PIN";
            pin = newPin;
            return "PIN changed."
        }
    }
}

module.exports = { createAccount };
