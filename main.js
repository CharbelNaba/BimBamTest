const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf8');
const splittedData = input.split('\n')
const limitX = splittedData[0][0]
const limitY = splittedData[0][1]

const remainingData = splittedData.splice(1)

/**
 * This function split initial array into arrays of 2, used to get initial position and sequence for each lawnmower
 * @param arr Array of data.
 */
const chunk = arr => {
    const size = 2;
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i++) {
        const last = chunkedArray[chunkedArray.length - 1];
        if (!last || last.length === size) {
            chunkedArray.push([arr[i]]);
        } else {
            last.push(arr[i]);
        }
    };
    return chunkedArray;
};

/**
 * Function that returns the direction after the current pivot
 * @param currentDirection Direction in which the lawnMower is currently at.
 * @param step Direction of the pivot.
 */
function changeDirection(currentDirection, step) {
    let directions = ["N", "E", "S", "W"]
    const i = step == "D" ? directions.indexOf(currentDirection) + 1 : directions.indexOf(currentDirection) - 1
    return directions[(i % 4 + 4) % 4]
}

/**
 * Function that returns the lawnmower object with the new coordinates
 * @param lawnMowerObject Lawnmower object that contains the coordinates and the direction
 */
function move(lawnMowerObject) {
    switch (lawnMowerObject["direction"]) {
        case "N":
            if (lawnMowerObject["y"] < limitY) {
                lawnMowerObject["y"] += 1
            }
            break
        case "E":
            if (lawnMowerObject["x"] < limitX) {
                lawnMowerObject["x"] += 1
            }
            break
        case "S":
            if (lawnMowerObject["y"] > 0) {
                lawnMowerObject["y"] -= 1
            }
            break
        case "W":
            if (lawnMowerObject["x"] > 0) {
                lawnMowerObject["x"] -= 1
            }
            break
    }
    return lawnMowerObject
}


const lawnMowers = chunk(remainingData)

for (let lawnMower of lawnMowers) {
    let lawnMowerObject = {}
    lawnMowerObject["x"] = parseInt(lawnMower[0][0])
    lawnMowerObject["y"] = parseInt(lawnMower[0][1])
    lawnMowerObject["direction"] = lawnMower[0].split(" ")[1][0]
    let sequence = lawnMower[1].split("").filter(s => s !== "\r")
    sequence.forEach(s => {
        if (s !== "A") {
            lawnMowerObject["direction"] = changeDirection(lawnMowerObject["direction"], s)
        }
        else {
            lawnMowerObject = move(lawnMowerObject)
        }

    })
    const res = `${lawnMowerObject["x"]}${lawnMowerObject["y"]}${lawnMowerObject["direction"]}`
    console.log(res)
}