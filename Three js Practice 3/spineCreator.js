import * as THREE from "three";

let minNum = -10;
let maxNum = 10;

function arrRandomNumbers(min, max){

    const resultingPoints = [];
    const numOfValues = 42;

    for (let i = 0; i < numOfValues; i++) {

        resultingPoints[i] = (Math.random() * (maxNum - minNum)) + minNum;
    }

    console.log(resultingPoints);
    return resultingPoints;
}

arrRandomNumbers(minNum, maxNum);

const curvePath = [
    -4.476767115272571,
    -5.856239119629891,
    -5.627800782161465,
    -6.175539027338597,
    3.8335531026277216,
    6.609333357592032,
    7.169811113799977,
    5.126475829205193,
    -0.6012597485958473,
    -0.03589922236129084,
    2.38463306109729,
    0.0015696980333999022,
    3.141099724020645,
    6.394174042274642,
    6.392606871662995,
    -9.679207763982362,
    3.387402282818819,
    -2.2932128804238694,
    -1.8066891922358153,
    -4.858619461699987,
    1.2919037938187081,
    -3.3349334812933185,
    0.3372627639370762,
    -1.7567092877734538,
    4.156003826089387,
    -8.684430602905287,
    6.636932949442556,
    -7.289214370833212,
    9.442632334419173,
    -7.312667443962773,
    4.1154752493361535,
    6.048978228547924,
    7.199427242447591,
    4.270578994310501,
    4.641613530960566,
    -8.923311233214672,
    -6.017950732729962,
    -9.260668249089159,
    0.6275646716948913,
    -0.05055429279929058, 
    2.6087039490593877, 
    3.601676090528416
]

const points = [];
const len = curvePath.length;

for( let p = 0; p < len; p += 3) {
    points.push(new THREE.Vector3(
        curvePath[p], 
        curvePath[p + 1], 
        curvePath[p + 2]));
}

const spline = new THREE.CatmullRomCurve3(points);

export default spline;