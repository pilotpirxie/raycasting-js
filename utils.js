function calculateRadians(degrees) {
  return (Math.PI / 180) * degrees;
}

function calculateVectorCoordinates(magnitude = 100, direction = 0, initialX = 0, initialY = 0) {
  const x = magnitude * Math.cos(calculateRadians(direction));
  const y = magnitude * Math.sin(calculateRadians(direction));
  return {
    x: initialX + x,
    y: initialY + y
  }
}
