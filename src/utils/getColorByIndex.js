// Example usage
//   for (let i = 0; i <= 799; i++) {
//     console.log(getUniqueColorByIndex(i));
//   }

function hslToHex(h, s, l) {
    l /= 100
    const a = s * Math.min(l, 1 - l) / 100
    const f = n => {
        const k = (n + h / 30) % 12
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
        return Math.round(255 * color).toString(16).padStart(2, '0') // convert to Hex and prefix "0" if needed
    };

    return `#${f(0)}${f(8)}${f(4)}`;
}

export function getUniqueColorByIndex(index) {
    if (index < 0 || index > 799) {
        throw new Error('Index must be between 0 and 799')
    }

    const hue = Math.round((index * 137.508) % 360)
    const saturation = Math.floor(Math.random() * 51) + 40 // between 50 and 90
    const lightness = Math.floor(Math.random() * 41) + 20 // between 20 and 60
    
    return hslToHex(hue, saturation, lightness)
}
