// creating asteroid with random coordinates
const asteroid = {
    x: Math.floor(Math.random() * 101),
    y: Math.floor(Math.random() * 101),
    z: Math.floor(Math.random() * 101),
};
// creating probes that can determine the distance between itself and the asteroid
const probes = [
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: 100 },
    { x: 0, y: 100, z: 0 },
];
// function that find distance
function distance(x1, y1, z1, x2, y2, z2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
}
// object with distances
const distances = probes.map((probe) => distance(probe.x, probe.y, probe.z, asteroid.x, asteroid.y, asteroid.z));

// we find coordinates by distance using the formula
const z = Math.floor((distances[0] ** 2 - distances[1] ** 2 + 10000) / 200);
const y = Math.floor((distances[0] ** 2 - distances[2] ** 2 + 10000) / 200);
const x = Math.floor(Math.sqrt(distances[0] ** 2 - z ** 2 - y ** 2));

// create variables with result
const location = { x, y, z };
const count = probes.length;
const coordinates = probes;

console.log(JSON.stringify({ result: { location, probes: { count, coordinates } } }, null, 4));
console.log(asteroid); //To compare the result with real asteroid coordinates
