global.test = "hi";
global.purchases = [["groceries", 100], ["food", 40]];
global.maxBudget = 1000;
global.totalSpent = 300;

export function testFunction() {
    global.test = "hello";
}