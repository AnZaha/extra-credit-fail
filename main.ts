// Custom function to generate a binary representation of a number
function toBinary (num: number, length: number) {
    while (num > 0) {
        binary = "" + num % 2 + binary
        num = Math.floor(num / 2)
    }
    return padStart(binary, length, "0")
}
// Function to generate binary masks for a list of a given length
function generateBinaryMasks (length: number) {
    numCombinations = 2 ** length
    for (let k = 1; k < numCombinations; k++) {
        let binaryRepresentation: string = toBinary(k, length);
        let mask: number[] = binaryRepresentation.split('').map(bit => parseInt(bit));
        masks.push(mask);
    }
return masks
}
// Function to find indices of the minimum differences
function getMinimumIndices (sums: any[], goal: number) {
    let differences: number[] = sums.map(sum => Math.abs(goal - sum));
minNumber = findMinValue(differences)
    return differences.map((value, index) => value === minNumber ? index : -1).filter(index => index !== -1)
}
// Function to format the raffle results
function formatRaffleResults (raffleResults: any[]) {
    let result: string = 'Raffle Results: \n'
raffleResults.forEach((group, i) => {
        let summation: number = group.reduce((acc: number, num: number) => acc + num, 0);
        let groupStr: string = group.join(', ');
        result += `${summation}\t${groupStr} \n`
    });
game.splash(result)
}
// Function to apply binary masks to a list of integers and return the sums
function applyMasksToList (raffles: any[], masks: any[]) {
    return masks.map(mask =>
        raffles.reduce((acc: number, raffle: number, index: number) => acc + raffle * mask[index], 0)
    )
}
// Function to convert indices to groups of raffles
function indexToGroupOfRaffles (indices: any[], raffles: any[]) {
    return indices.map(index => {
        let binaryRepresentation2: string = toBinary(index + 1, raffles.length);
        return binaryRepresentation2.split('').reduce((acc: number[], bit: string, i: number) => {
            if (bit === "1") acc.push(raffles[i]);
            return acc;
        }, []);
    })
}
// Custom function to find the minimum value in an array
function findMinValue (array: number[]) {
    minValue = array[0]
    for (let i = 1; i < array.length; i++) {
        if (array[i] < minValue) {
            minValue = array[i];
        }
    }
return minValue
}
// Custom function to pad a string with leading characters to a certain length
function padStart (str: string, targetLength: number, padString: string) {
    while (str.length < targetLength) {
        str = "" + padString + str
    }
    return str
}
let str = ""
let minValue = 0
let minNumber = 0
let numCombinations = 0
let num = 0
let binary = ""
let masks: number[][] = []
function generateRaffles(size: number, min_value: number = 1, max_value: number = 999): number[] {
    let randomNumbers: number[] = [];
    for (let j = 0; j < size; j++) {
        let number: number = Math.floor(Math.random() * (max_value - min_value + 1)) + min_value;
        randomNumbers.push(number);
    }
    return randomNumbers;
}
let num_of_raffles = 20
let raffles: number[] = generateRaffles(num_of_raffles);
game.splash("Original List:" + raffles.join(", "))
let goalNumber = game.askForNumber("Enter Goal Number", 5)
let masks2 = generateBinaryMasks(num_of_raffles)
let sums = applyMasksToList(raffles, masks2)
let minimums = getMinimumIndices(sums, goalNumber)
let winningGroups = indexToGroupOfRaffles(minimums, raffles)
formatRaffleResults(winningGroups)
